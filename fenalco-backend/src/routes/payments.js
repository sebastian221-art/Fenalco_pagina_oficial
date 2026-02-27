// ═══════════════════════════════════════════════════════════════════
// RUTAS DE PAGOS
// ═══════════════════════════════════════════════════════════════════

import express from 'express';
import { uploadPaymentProof } from '../middleware/upload.js';
import {
  createTransferPayment,
  createWompiPayment,
  wompiWebhook,
  checkWompiPaymentStatus,
  getAllPayments,
  verifyPayment,
} from '../controllers/paymentController.js';

const router = express.Router();

// ── POST /api/payments/transfer ──
// Registrar pago por transferencia bancaria
// Multipart/form-data (incluye comprobante)
router.post('/transfer', uploadPaymentProof, createTransferPayment);

// ── POST /api/payments/wompi ──
// Crear link de pago con Wompi (tarjeta)
// Body: { "concept": "membresia", "payerName": "...", "payerEmail": "...", ... }
router.post('/wompi', createWompiPayment);

// ── POST /api/payments/wompi/webhook ──
// Webhook de Wompi (recibe notificaciones de pago)
// Wompi envía POST a esta ruta cuando cambia el estado de un pago
router.post('/wompi/webhook', wompiWebhook);

// ── GET /api/payments/wompi/:transactionId/status ──
// Verificar estado de transacción en Wompi
router.get('/wompi/:transactionId/status', checkWompiPaymentStatus);

// ── GET /api/payments ──
// Obtener todos los pagos (Panel Admin)
// Query params: ?status=APPROVED&paymentMethod=wompi&page=1&limit=20
router.get('/', getAllPayments);

// ── PATCH /api/payments/:id/verify ──
// Aprobar o rechazar pago (Panel Admin)
// Body: { "status": "APPROVED", "notes": "...", "verifiedBy": "admin" }
router.patch('/:id/verify', verifyPayment);

export default router;