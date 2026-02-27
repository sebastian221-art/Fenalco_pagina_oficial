// ═══════════════════════════════════════════════════════════════════
// CONTROLADOR DE PAGOS
// ═══════════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client';
import { uploadFile } from '../services/storageService.js';
import { createPaymentLink, getTransactionStatus, verifyWebhookSignature, processWebhookEvent, calculateMembershipAmount } from '../services/wompiService.js';
import { sendPaymentConfirmation } from '../services/emailService.js';

const prisma = new PrismaClient();

/**
 * Registrar pago por transferencia bancaria
 * POST /api/payments/transfer
 */
export const createTransferPayment = async (req, res, next) => {
  try {
    const {
      affiliationId,
      amount,
      concept, // "membresia" | "mensualidad"
      period,
      transferBank,
      transferReference,
      transferDate,
      payerName,
      payerEmail,
      payerPhone,
      payerNit,
    } = req.body;

    const file = req.file; // Comprobante de pago

    console.log('💵 Registro de pago por transferencia');
    console.log('📊 Datos:', { bank: transferBank, reference: transferReference });

    // ── 1. SUBIR COMPROBANTE A CLOUDINARY (si existe) ──
    let transferProofUrl = null;
    if (file) {
      console.log('📎 Subiendo comprobante de pago...');
      transferProofUrl = await uploadFile(
        file.buffer,
        file.originalname,
        `fenalco/comprobantes/${payerNit || 'sin-nit'}`
      );
      console.log('✅ Comprobante subido:', transferProofUrl);
    }

    // ── 2. CREAR REGISTRO DE PAGO ──
    const payment = await prisma.payment.create({
      data: {
        affiliationId: affiliationId || null,
        amount: parseFloat(amount),
        currency: 'COP',
        concept,
        period: period || null,
        status: 'PROCESSING', // Requiere verificación manual
        paymentMethod: 'transfer',
        transferBank,
        transferReference: transferReference || null,
        transferProof: transferProofUrl,
        transferDate: transferDate ? new Date(transferDate) : new Date(),
        payerName,
        payerEmail,
        payerPhone: payerPhone || null,
        payerNit: payerNit || null,
      },
    });

    console.log('✅ Pago registrado:', payment.id);

    // ── 3. ENVIAR NOTIFICACIÓN AL ADMIN ──
    // TODO: Implementar email al admin con comprobante adjunto

    res.status(201).json({
      success: true,
      message: 'Pago registrado correctamente. Será verificado en las próximas horas.',
      data: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt,
      },
    });

  } catch (error) {
    console.error('❌ Error al registrar pago por transferencia:', error);
    next(error);
  }
};

/**
 * Crear link de pago con Wompi (tarjeta)
 * POST /api/payments/wompi
 */
export const createWompiPayment = async (req, res, next) => {
  try {
    const {
      affiliationId,
      concept, // "membresia" | "mensualidad"
      period,
      payerName,
      payerEmail,
      payerPhone,
      payerNit,
      customAmount, // Opcional: para mensualidades personalizadas
    } = req.body;

    console.log('💳 Creando link de pago Wompi');
    console.log('📊 Datos:', { concept, payerEmail });

    // ── 1. CALCULAR MONTO ──
    let amount;
    
    if (customAmount) {
      amount = parseFloat(customAmount);
    } else if (concept === 'membresia' && affiliationId) {
      // Obtener la afiliación para calcular membresía según empleados
      const affiliation = await prisma.affiliation.findUnique({
        where: { id: affiliationId },
        select: { numEmpleadosPago: true },
      });

      if (!affiliation) {
        return res.status(404).json({
          error: 'Afiliación no encontrada',
          code: 'NOT_FOUND',
        });
      }

      amount = calculateMembershipAmount(affiliation.numEmpleadosPago);
    } else {
      return res.status(400).json({
        error: 'Debes proporcionar customAmount o una affiliationId válida',
        code: 'INVALID_AMOUNT',
      });
    }

    // ── 2. CREAR LINK DE PAGO EN WOMPI ──
    const reference = `FENALCO_${concept.toUpperCase()}_${Date.now()}`;
    
    const wompiResponse = await createPaymentLink({
      amount,
      currency: 'COP',
      customerEmail: payerEmail,
      customerName: payerName,
      customerPhone: payerPhone,
      reference,
      description: `${concept === 'membresia' ? 'Membresía' : 'Mensualidad'} FENALCO - ${payerName}`,
      redirectUrl: `${process.env.FRONTEND_URL}/afiliate?payment=success&ref=${reference}`,
    });

    console.log('✅ Link de pago creado:', wompiResponse.paymentLink);

    // ── 3. REGISTRAR PAGO EN BD ──
    const payment = await prisma.payment.create({
      data: {
        affiliationId: affiliationId || null,
        amount,
        currency: 'COP',
        concept,
        period: period || null,
        status: 'PENDING',
        paymentMethod: 'wompi',
        wompiTransactionId: wompiResponse.paymentId,
        wompiReference: wompiResponse.reference,
        wompiPaymentLink: wompiResponse.paymentLink,
        wompiStatus: 'PENDING',
        payerName,
        payerEmail,
        payerPhone: payerPhone || null,
        payerNit: payerNit || null,
      },
    });

    console.log('✅ Pago registrado en BD:', payment.id);

    res.status(201).json({
      success: true,
      message: 'Link de pago generado correctamente',
      data: {
        paymentId: payment.id,
        paymentLink: wompiResponse.paymentLink,
        amount,
        reference: wompiResponse.reference,
        expiresAt: wompiResponse.expiresAt,
      },
    });

  } catch (error) {
    console.error('❌ Error al crear pago Wompi:', error);
    next(error);
  }
};

/**
 * Webhook de Wompi (recibe notificaciones de pago)
 * POST /api/payments/wompi/webhook
 */
export const wompiWebhook = async (req, res, next) => {
  try {
    const event = req.body;

    console.log('📨 Webhook Wompi recibido');

    // ── 1. VERIFICAR FIRMA ──
    const isValid = verifyWebhookSignature(event);
    
    if (!isValid) {
      console.warn('⚠️  Firma de webhook inválida');
      return res.status(401).json({
        error: 'Firma inválida',
        code: 'INVALID_SIGNATURE',
      });
    }

    // ── 2. PROCESAR EVENTO ──
    const eventData = processWebhookEvent(event);
    const { transactionId, status, reference } = eventData;

    console.log(`📨 Transacción ${transactionId}: ${status}`);

    // ── 3. BUSCAR PAGO EN BD ──
    const payment = await prisma.payment.findFirst({
      where: {
        OR: [
          { wompiTransactionId: transactionId },
          { wompiReference: reference },
        ],
      },
      include: {
        affiliation: true,
      },
    });

    if (!payment) {
      console.warn('⚠️  Pago no encontrado en BD');
      return res.status(404).json({
        error: 'Pago no encontrado',
        code: 'NOT_FOUND',
      });
    }

    // ── 4. ACTUALIZAR ESTADO DEL PAGO ──
    let newStatus;
    
    switch (status) {
      case 'APPROVED':
        newStatus = 'APPROVED';
        break;
      case 'DECLINED':
      case 'VOIDED':
        newStatus = 'REJECTED';
        break;
      case 'ERROR':
        newStatus = 'REJECTED';
        break;
      default:
        newStatus = 'PROCESSING';
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: newStatus,
        wompiStatus: status,
        wompiResponse: eventData,
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Pago actualizado: ${payment.id} → ${newStatus}`);

    // ── 5. ENVIAR EMAIL SI ESTÁ APROBADO ──
    if (newStatus === 'APPROVED') {
      sendPaymentConfirmation(updatedPayment, payment.affiliation).catch((error) => {
        console.error('⚠️  Error al enviar email de confirmación:', error);
      });
    }

    res.json({
      success: true,
      message: 'Webhook procesado correctamente',
    });

  } catch (error) {
    console.error('❌ Error al procesar webhook:', error);
    next(error);
  }
};

/**
 * Verificar estado de pago Wompi
 * GET /api/payments/wompi/:transactionId/status
 */
export const checkWompiPaymentStatus = async (req, res, next) => {
  try {
    const { transactionId } = req.params;

    console.log('🔍 Verificando estado de transacción:', transactionId);

    // ── 1. CONSULTAR EN WOMPI ──
    const transactionData = await getTransactionStatus(transactionId);

    console.log(`✅ Estado: ${transactionData.status}`);

    // ── 2. ACTUALIZAR EN BD ──
    const payment = await prisma.payment.findFirst({
      where: { wompiTransactionId: transactionId },
    });

    if (payment) {
      let newStatus;
      switch (transactionData.status) {
        case 'APPROVED':
          newStatus = 'APPROVED';
          break;
        case 'DECLINED':
        case 'VOIDED':
        case 'ERROR':
          newStatus = 'REJECTED';
          break;
        default:
          newStatus = 'PROCESSING';
      }

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: newStatus,
          wompiStatus: transactionData.status,
          updatedAt: new Date(),
        },
      });
    }

    res.json({
      success: true,
      data: transactionData,
    });

  } catch (error) {
    console.error('❌ Error al verificar estado:', error);
    next(error);
  }
};

/**
 * Obtener todos los pagos (Panel Admin)
 * GET /api/payments
 */
export const getAllPayments = async (req, res, next) => {
  try {
    const {
      status,
      paymentMethod,
      page = 1,
      limit = 20,
    } = req.query;

    // Construir filtros
    const where = {};
    
    if (status) {
      where.status = status;
    }

    if (paymentMethod) {
      where.paymentMethod = paymentMethod;
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Consultar
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          affiliation: {
            select: {
              nombreComercial: true,
              nit: true,
            },
          },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    res.json({
      success: true,
      data: payments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });

  } catch (error) {
    console.error('❌ Error al obtener pagos:', error);
    next(error);
  }
};

/**
 * Aprobar/Rechazar pago (Panel Admin)
 * PATCH /api/payments/:id/verify
 */
export const verifyPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes, verifiedBy } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return res.status(400).json({
        error: 'Estado inválido. Debe ser APPROVED o REJECTED',
      });
    }

    const payment = await prisma.payment.update({
      where: { id },
      data: {
        status,
        notes: notes || null,
        verifiedBy: verifiedBy || null,
        verifiedAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        affiliation: true,
      },
    });

    console.log(`✅ Pago verificado: ${id} → ${status}`);

    // Enviar email si está aprobado
    if (status === 'APPROVED') {
      sendPaymentConfirmation(payment, payment.affiliation).catch((error) => {
        console.error('⚠️  Error al enviar email:', error);
      });
    }

    res.json({
      success: true,
      message: `Pago ${status === 'APPROVED' ? 'aprobado' : 'rechazado'} correctamente`,
      data: payment,
    });

  } catch (error) {
    console.error('❌ Error al verificar pago:', error);
    next(error);
  }
};

export default {
  createTransferPayment,
  createWompiPayment,
  wompiWebhook,
  checkWompiPaymentStatus,
  getAllPayments,
  verifyPayment,
};