// ═══════════════════════════════════════════════════════════════════
// SERVICIO DE WOMPI - PASARELA DE PAGOS
// ═══════════════════════════════════════════════════════════════════

import crypto from 'crypto';

/**
 * Crea un link de pago en Wompi
 * @param {Object} paymentData - Datos del pago
 * @returns {Promise<Object>} Respuesta de Wompi con el link de pago
 */
export const createPaymentLink = async (paymentData) => {
  const {
    amount,
    currency = 'COP',
    customerEmail,
    reference,
    description,
    redirectUrl,
  } = paymentData;

  try {
    const response = await fetch('https://api-sandbox.co.uat.wompi.dev/v1/payment_links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
      },
      body: JSON.stringify({
        name: description || 'Pago FENALCO',
        description: description || 'Pago de afiliación o mensualidad',
        single_use: false,
        collect_shipping: false,
        currency,
        amount_in_cents: Math.round(amount * 100), // Wompi usa centavos
        customer_data: {
          email: customerEmail,
          full_name: paymentData.customerName || '',
          phone_number: paymentData.customerPhone || '',
        },
        redirect_url: redirectUrl || `${process.env.FRONTEND_URL}/afiliate?payment=success`,
        expiration_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        reference: reference || `FENALCO_${Date.now()}`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error de Wompi: ${error.error?.reason || 'Error desconocido'}`);
    }

    const data = await response.json();
    
    console.log('✅ Link de pago creado:', data.data.id);
    
    return {
      success: true,
      paymentLink: data.data.permalink,
      paymentId: data.data.id,
      reference: data.data.reference,
      expiresAt: data.data.expires_at,
    };

  } catch (error) {
    console.error('❌ Error al crear link de pago en Wompi:', error);
    throw error;
  }
};

/**
 * Verifica el estado de una transacción en Wompi
 * @param {string} transactionId - ID de la transacción
 * @returns {Promise<Object>} Estado de la transacción
 */
export const getTransactionStatus = async (transactionId) => {
  try {
    const response = await fetch(
      `https://api-sandbox.co.uat.wompi.dev/v1/transactions/${transactionId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.WOMPI_PUBLIC_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Error al consultar transacción');
    }

    const data = await response.json();
    
    return {
      id: data.data.id,
      status: data.data.status, // APPROVED, DECLINED, VOIDED, ERROR
      amount: data.data.amount_in_cents / 100,
      currency: data.data.currency,
      reference: data.data.reference,
      paymentMethod: data.data.payment_method_type,
      createdAt: data.data.created_at,
      finalizedAt: data.data.finalized_at,
    };

  } catch (error) {
    console.error('❌ Error al verificar transacción:', error);
    throw error;
  }
};

/**
 * Verifica la firma de un webhook de Wompi
 * @param {Object} event - Evento recibido del webhook
 * @returns {boolean} True si la firma es válida
 */
export const verifyWebhookSignature = (event) => {
  // ✅ CAMBIO: Ya no necesitamos await porque importamos crypto al inicio del archivo
  
  const {
    signature: {
      checksum,
      properties,
    },
    data,
    timestamp,
  } = event;

  // Crear el string a verificar
  const signatureString = `${data.transaction.id}${data.transaction.status}${data.transaction.amount_in_cents}`;
  
  // Calcular el checksum
  const calculatedChecksum = crypto
    .createHmac('sha256', process.env.WOMPI_EVENTS_SECRET)
    .update(signatureString)
    .digest('hex');

  const isValid = calculatedChecksum === checksum;
  
  if (!isValid) {
    console.warn('⚠️  Firma de webhook inválida');
  }

  return isValid;
};

/**
 * Procesa un evento de webhook de Wompi
 * @param {Object} event - Evento del webhook
 * @returns {Object} Datos procesados del evento
 */
export const processWebhookEvent = (event) => {
  const { data, event: eventType } = event;
  
  console.log(`📨 Webhook Wompi recibido: ${eventType}`);

  return {
    eventType,
    transactionId: data.transaction.id,
    status: data.transaction.status,
    amount: data.transaction.amount_in_cents / 100,
    reference: data.transaction.reference,
    paymentMethod: data.transaction.payment_method_type,
    timestamp: data.transaction.finalized_at || data.transaction.created_at,
  };
};

/**
 * Calcula el monto de la membresía según número de empleados
 * @param {number} numEmpleados - Número de empleados
 * @returns {number} Monto en COP
 */
export const calculateMembershipAmount = (numEmpleados) => {
  if (numEmpleados <= 10) {
    return parseInt(process.env.MEMBRESIA_1_10_EMPLEADOS) || 150000;
  } else if (numEmpleados <= 50) {
    return parseInt(process.env.MEMBRESIA_11_50_EMPLEADOS) || 300000;
  } else if (numEmpleados <= 100) {
    return parseInt(process.env.MEMBRESIA_51_100_EMPLEADOS) || 500000;
  } else {
    return parseInt(process.env.MEMBRESIA_MAS_100_EMPLEADOS) || 800000;
  }
};

export default {
  createPaymentLink,
  getTransactionStatus,
  verifyWebhookSignature,
  processWebhookEvent,
  calculateMembershipAmount,
};