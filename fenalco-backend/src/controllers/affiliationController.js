// ═══════════════════════════════════════════════════════════════════
// CONTROLADOR DE AFILIACIONES
// ═══════════════════════════════════════════════════════════════════

import { PrismaClient } from '@prisma/client';
import { uploadFile } from '../services/storageService.js';
import { sendAdminNotification, sendApplicantConfirmation } from '../services/emailService.js';

const prisma = new PrismaClient();

/**
 * Crear nueva solicitud de afiliación
 * POST /api/affiliations
 */
export const createAffiliation = async (req, res, next) => {
  try {
    const body = req.body;
    const files = req.files || {};

    console.log('📝 Nueva solicitud de afiliación recibida');
    console.log('📊 Datos:', { nit: body.nit, empresa: body.nombreComercial });

    // ── 1. SUBIR DOCUMENTOS A CLOUDINARY ──
    const uploadPromises = {};
    const docFields = ['docRUT', 'docCamara', 'docRepresentante', 'docRenta'];

    for (const field of docFields) {
      if (files[field]?.[0]) {
        const file = files[field][0];
        console.log(`📎 Subiendo ${field}: ${file.originalname}`);
        uploadPromises[field] = uploadFile(
          file.buffer,
          file.originalname,
          `fenalco/afiliaciones/${body.nit}`
        );
      }
    }

    // Esperar a que todos los documentos se suban
    const uploadedUrls = {};
    for (const [field, promise] of Object.entries(uploadPromises)) {
      try {
        uploadedUrls[field] = await promise;
      } catch (error) {
        console.error(`❌ Error al subir ${field}:`, error);
        // Continuar aunque falle la subida de un documento
        uploadedUrls[field] = null;
      }
    }

    console.log('✅ Documentos subidos a Cloudinary');

    // ── 2. GUARDAR EN BASE DE DATOS ──
    const affiliation = await prisma.affiliation.create({
      data: {
        // ── Paso 1: Empresa ──
        razonSocial: body.razonSocial,
        nombreComercial: body.nombreComercial,
        nit: body.nit,
        matriculaMercantil: body.matriculaMercantil,
        codigoCIIU: body.codigoCIIU,
        naturalezaCliente: body.naturalezaCliente || null,
        sector: body.sector,
        subSector: body.subSector || null,
        numEmpleados: parseInt(body.numEmpleados),
        telefonoFijo: body.telefonoFijo || null,
        celular: body.celular,
        email: body.email,
        direccion: body.direccion,
        ciudad: body.ciudad,
        productosServicios: body.productosServicios,

        // ── Paso 2: Representante Legal ──
        repPrimerNombre: body.repPrimerNombre,
        repSegundoNombre: body.repSegundoNombre || null,
        repPrimerApellido: body.repPrimerApellido,
        repSegundoApellido: body.repSegundoApellido || null,
        repCedula: body.repCedula,
        repTelefono: body.repTelefono,
        repEmail: body.repEmail,

        // ── Paso 2: Contactos Adicionales ──
        gerenteNombre: body.gerenteNombre || null,
        gerenteTelefono: body.gerenteTelefono || null,
        gerenteEmail: body.gerenteEmail || null,
        asistenteNombre: body.asistenteNombre || null,
        asistenteTelefono: body.asistenteTelefono || null,
        asistenteEmail: body.asistenteEmail || null,
        rrhhNombre: body.rrhhNombre || null,
        rrhhTelefono: body.rrhhTelefono || null,
        rrhhEmail: body.rrhhEmail || null,
        carteraNombre: body.carteraNombre || null,
        carteraTelefono: body.carteraTelefono || null,
        carteraEmail: body.carteraEmail || null,

        // ── Paso 3: Referencias ──
        ref1Nombre: body.ref1Nombre || null,
        ref1Direccion: body.ref1Direccion || null,
        ref1Telefono: body.ref1Telefono || null,
        ref2Nombre: body.ref2Nombre || null,
        ref2Direccion: body.ref2Direccion || null,
        ref2Telefono: body.ref2Telefono || null,

        // ── Paso 3: Referidos ──
        refiere1Nombre: body.refiere1Nombre || null,
        refiere1Direccion: body.refiere1Direccion || null,
        refiere1Email: body.refiere1Email || null,
        refiere1Telefono: body.refiere1Telefono || null,

        // ── Paso 3: Documentos ──
        docRUT: uploadedUrls.docRUT || null,
        docCamara: uploadedUrls.docCamara || null,
        docRepresentante: uploadedUrls.docRepresentante || null,
        docRenta: uploadedUrls.docRenta || null,

        // ── Paso 3: Servicios Socializados ──
        serviciosSocializados: body.serviciosSocializados === 'true',

        // ── Paso 4: Forma de Pago ──
        periodicidad: body.periodicidad,
        numEmpleadosPago: parseInt(body.numEmpleadosPago),
        ventas: parseFloat(body.ventas),
        emailFacturacion: body.emailFacturacion,

        // ── Paso 4: Autorizaciones ──
        autorizacionDatos: body.autorizacionDatos === 'true',
        declaracionBienes: body.declaracionBienes === 'true',
        clausulaPermanencia: body.clausulaPermanencia === 'true',

        // ── Paso 4: Firma ──
        firmaNombre: body.firmaNombre,
        firmaCedula: body.firmaCedula,
        firmaConsentimiento: body.firmaConsentimiento === 'true',
      },
    });

    console.log('✅ Afiliación guardada en BD:', affiliation.id);

    // ── 3. ENVIAR EMAILS ──
    const emailData = {
      ...body,
      id: affiliation.id,
      numEmpleados: parseInt(body.numEmpleados),
      ventas: parseFloat(body.ventas),
    };

    // Enviar emails en paralelo (no bloquear la respuesta)
    Promise.allSettled([
      sendAdminNotification(emailData),
      sendApplicantConfirmation(emailData),
    ]).then(() => {
      console.log('✅ Emails enviados');
    }).catch((error) => {
      console.error('⚠️  Error al enviar emails:', error);
    });

    // ── 4. RESPONDER AL FRONTEND ──
    res.status(201).json({
      success: true,
      message: 'Solicitud de afiliación recibida correctamente',
      data: {
        id: affiliation.id,
        nit: affiliation.nit,
        nombreComercial: affiliation.nombreComercial,
        status: affiliation.status,
        createdAt: affiliation.createdAt,
      },
    });

  } catch (error) {
    console.error('❌ Error al crear afiliación:', error);
    next(error);
  }
};

/**
 * Obtener todas las afiliaciones (Panel Admin)
 * GET /api/affiliations
 */
export const getAllAffiliations = async (req, res, next) => {
  try {
    const { 
      status, 
      page = 1, 
      limit = 20,
      search,
    } = req.query;

    // Construir filtros
    const where = {};
    
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { nombreComercial: { contains: search, mode: 'insensitive' } },
        { nit: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Consultar
    const [affiliations, total] = await Promise.all([
      prisma.affiliation.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          createdAt: true,
          status: true,
          nombreComercial: true,
          nit: true,
          sector: true,
          ciudad: true,
          email: true,
          celular: true,
          repPrimerNombre: true,
          repPrimerApellido: true,
          numEmpleados: true,
          periodicidad: true,
        },
      }),
      prisma.affiliation.count({ where }),
    ]);

    res.json({
      success: true,
      data: affiliations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });

  } catch (error) {
    console.error('❌ Error al obtener afiliaciones:', error);
    next(error);
  }
};

/**
 * Obtener una afiliación por ID
 * GET /api/affiliations/:id
 */
export const getAffiliationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const affiliation = await prisma.affiliation.findUnique({
      where: { id },
      include: {
        payments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!affiliation) {
      return res.status(404).json({
        error: 'Afiliación no encontrada',
        code: 'NOT_FOUND',
      });
    }

    res.json({
      success: true,
      data: affiliation,
    });

  } catch (error) {
    console.error('❌ Error al obtener afiliación:', error);
    next(error);
  }
};

/**
 * Actualizar estado de afiliación
 * PATCH /api/affiliations/:id/status
 */
export const updateAffiliationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'INACTIVE'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Estado inválido',
        validStatuses,
      });
    }

    const affiliation = await prisma.affiliation.update({
      where: { id },
      data: { 
        status,
        updatedAt: new Date(),
      },
    });

    console.log(`✅ Estado actualizado: ${affiliation.nombreComercial} → ${status}`);

    res.json({
      success: true,
      message: `Estado actualizado a ${status}`,
      data: affiliation,
    });

  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    next(error);
  }
};

export default {
  createAffiliation,
  getAllAffiliations,
  getAffiliationById,
  updateAffiliationStatus,
};