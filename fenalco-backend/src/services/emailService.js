// ═══════════════════════════════════════════════════════════════════
// SERVICIO DE EMAIL - FENALCO SUR DE SANTANDER
// ═══════════════════════════════════════════════════════════════════

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email al administrador cuando llega una nueva afiliación
 */
export const sendAdminNotification = async (data) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_ADMIN,
      subject: `🆕 Nueva solicitud de afiliación — ${data.nombreComercial}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #1e40af, #3b82f6); padding: 32px 24px; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px; }
            .content { padding: 32px 24px; }
            .section { margin-bottom: 24px; }
            .section h2 { color: #1f2937; font-size: 18px; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #e5e7eb; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 12px 8px; border-bottom: 1px solid #f3f4f6; }
            td:first-child { color: #6b7280; width: 40%; }
            td:last-child { color: #1f2937; font-weight: 600; }
            tr:hover { background: #f9fafb; }
            .alert { background: #dbeafe; border-left: 4px solid: #3b82f6; padding: 16px; border-radius: 8px; margin: 24px 0; }
            .alert p { margin: 0; color: #1e40af; font-weight: 600; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 16px; }
            .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 12px 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Solicitud de Afiliación</h1>
              <p>FENALCO Sur de Santander</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>📋 Información de la Empresa</h2>
                <table>
                  <tr><td>Razón Social</td><td>${data.razonSocial}</td></tr>
                  <tr><td>Nombre Comercial</td><td>${data.nombreComercial}</td></tr>
                  <tr><td>NIT</td><td>${data.nit}</td></tr>
                  <tr><td>Sector</td><td>${data.sector}</td></tr>
                  <tr><td>Ciudad</td><td>${data.ciudad}</td></tr>
                  <tr><td>N° Empleados</td><td>${data.numEmpleados}</td></tr>
                  <tr><td>Teléfono</td><td>${data.celular}</td></tr>
                  <tr><td>Email</td><td>${data.email}</td></tr>
                </table>
              </div>

              <div class="section">
                <h2>👤 Representante Legal</h2>
                <table>
                  <tr><td>Nombre</td><td>${data.repPrimerNombre} ${data.repPrimerApellido}</td></tr>
                  <tr><td>Cédula</td><td>${data.repCedula}</td></tr>
                  <tr><td>Teléfono</td><td>${data.repTelefono}</td></tr>
                  <tr><td>Email</td><td>${data.repEmail}</td></tr>
                </table>
              </div>

              <div class="section">
                <h2>💰 Información de Pago</h2>
                <table>
                  <tr><td>Periodicidad</td><td>${data.periodicidad}</td></tr>
                  <tr><td>Ventas Anuales</td><td>$${new Intl.NumberFormat('es-CO').format(data.ventas)} COP</td></tr>
                  <tr><td>Email Facturación</td><td>${data.emailFacturacion}</td></tr>
                </table>
              </div>

              <div class="alert">
                <p>📎 Los documentos adjuntos están almacenados en Cloudinary.</p>
                <p>Ingresa al panel de administración para revisar la solicitud completa.</p>
              </div>

              <center>
                <a href="${process.env.FRONTEND_URL}/admin" class="button">Ver Panel de Administración</a>
              </center>
            </div>

            <div class="footer">
              <p><strong>FENALCO Sur de Santander</strong></p>
              <p>Carrera 17 #35-46, Centro Comercial Sangil Plaza Lcl L-02</p>
              <p>San Gil, Santander - Colombia</p>
              <p style="margin-top: 16px; color: #9ca3af;">
                Este es un correo automático. Por favor no respondas a esta dirección.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Email de notificación enviado al administrador');
  } catch (error) {
    console.error('❌ Error al enviar email al administrador:', error);
    // No lanzar error para que no bloquee el flujo
  }
};

/**
 * Email de confirmación al solicitante
 */
export const sendApplicantConfirmation = async (data) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: '✅ Recibimos tu solicitud de afiliación — FENALCO Sur de Santander',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0; }
            .content { padding: 32px 24px; }
            .success-icon { width: 80px; height: 80px; background: #d1fae5; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 48px; }
            h2 { color: #1f2937; font-size: 22px; margin: 0 0 16px; }
            p { color: #4b5563; line-height: 1.7; margin: 0 0 16px; }
            .info-box { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0; }
            .info-box p { margin: 4px 0; color: #1e40af; }
            .info-box strong { color: #1e3a8a; }
            .next-steps { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0; }
            .next-steps h3 { color: #1f2937; font-size: 16px; margin: 0 0 12px; }
            .next-steps ol { margin: 0; padding-left: 20px; }
            .next-steps li { color: #4b5563; margin: 8px 0; }
            .contact { background: #f0fdf4; border: 1px solid #86efac; padding: 16px; border-radius: 8px; margin: 24px 0; }
            .contact p { margin: 4px 0; color: #166534; }
            .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 12px 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✓</div>
              <h1>¡Solicitud Recibida!</h1>
              <p>FENALCO Sur de Santander</p>
            </div>
            
            <div class="content">
              <h2>Hola ${data.repPrimerNombre},</h2>
              
              <p>
                Hemos recibido correctamente la solicitud de afiliación de <strong>${data.nombreComercial}</strong>.
              </p>
              
              <p>
                Tu solicitud ha sido registrada con éxito y nuestro equipo comenzará a revisarla en las próximas horas.
              </p>

              <div class="info-box">
                <p><strong>Número de Solicitud:</strong> #${data.id.substring(0, 8).toUpperCase()}</p>
                <p><strong>Empresa:</strong> ${data.nombreComercial}</p>
                <p><strong>NIT:</strong> ${data.nit}</p>
                <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString('es-CO', { dateStyle: 'full' })}</p>
              </div>

              <div class="next-steps">
                <h3>📋 Próximos pasos:</h3>
                <ol>
                  <li>Nuestro equipo revisará tu documentación y la información enviada</li>
                  <li>Verificaremos que todos los requisitos estén completos</li>
                  <li>Te contactaremos al correo <strong>${data.repEmail}</strong> o al teléfono <strong>${data.celular}</strong> en máximo <strong>24-48 horas hábiles</strong></li>
                  <li>Una vez aprobada, recibirás las instrucciones para el pago de la membresía</li>
                </ol>
              </div>

              <div class="contact">
                <p><strong>¿Tienes dudas o preguntas?</strong></p>
                <p>📱 WhatsApp: <a href="https://wa.me/573185840599">+57 318 584 0599</a></p>
                <p>📧 Email: administrativosurdesantander@fenalco.com.co</p>
                <p>📍 Carrera 17 #35-46, CC Sangil Plaza, Local L-02</p>
                <p>⏰ Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 6:00 PM</p>
              </div>

              <p style="margin-top: 32px; font-style: italic; color: #6b7280;">
                Gracias por confiar en FENALCO Sur de Santander para fortalecer tu empresa.
              </p>
            </div>

            <div class="footer">
              <p><strong>FENALCO Sur de Santander</strong></p>
              <p>La fuerza que une a los comerciantes de la región</p>
              <p style="margin-top: 16px; color: #9ca3af;">
                Este es un correo automático. Por favor no respondas a esta dirección.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Email de confirmación enviado al solicitante');
  } catch (error) {
    console.error('❌ Error al enviar email al solicitante:', error);
    // No lanzar error para que no bloquee el flujo
  }
};

/**
 * Email de notificación de pago aprobado
 */
export const sendPaymentConfirmation = async (payment, affiliation) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: payment.payerEmail,
      subject: '✅ Pago confirmado — FENALCO Sur de Santander',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #059669, #10b981); padding: 32px 24px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; }
            .content { padding: 32px 24px; }
            .payment-details { background: #f0fdf4; border: 2px solid #86efac; padding: 20px; border-radius: 8px; margin: 24px 0; }
            .payment-details table { width: 100%; }
            .payment-details td { padding: 8px 0; color: #166534; }
            .payment-details td:first-child { font-weight: 600; }
            .footer { background: #f9fafb; padding: 24px; text-align: center; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Pago Confirmado</h1>
            </div>
            
            <div class="content">
              <h2>Hola ${payment.payerName},</h2>
              <p>Tu pago ha sido procesado y confirmado exitosamente.</p>
              
              <div class="payment-details">
                <table>
                  <tr><td>Concepto:</td><td>${payment.concept}</td></tr>
                  <tr><td>Monto:</td><td>$${new Intl.NumberFormat('es-CO').format(payment.amount)} COP</td></tr>
                  <tr><td>Método:</td><td>${payment.paymentMethod === 'transfer' ? 'Transferencia Bancaria' : 'Tarjeta (Wompi)'}</td></tr>
                  <tr><td>Referencia:</td><td>#${payment.id.substring(0, 8).toUpperCase()}</td></tr>
                  <tr><td>Fecha:</td><td>${new Date().toLocaleDateString('es-CO')}</td></tr>
                </table>
              </div>

              <p>Gracias por tu pago. Si tienes alguna pregunta, contáctanos.</p>
            </div>

            <div class="footer">
              <p><strong>FENALCO Sur de Santander</strong></p>
              <p>administrativosurdesantander@fenalco.com.co</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ Email de confirmación de pago enviado');
  } catch (error) {
    console.error('❌ Error al enviar email de pago:', error);
  }
};