// ═══════════════════════════════════════════════════════════════════
// RUTAS DE AFILIACIONES
// ═══════════════════════════════════════════════════════════════════

import express from 'express';
import { uploadAffiliationDocs } from '../middleware/upload.js';
import {
  createAffiliation,
  getAllAffiliations,
  getAffiliationById,
  updateAffiliationStatus,
} from '../controllers/affiliationController.js';

const router = express.Router();

// ── POST /api/affiliations ──
// Crear nueva solicitud de afiliación
// Multipart/form-data (incluye archivos)
router.post('/', uploadAffiliationDocs, createAffiliation);

// ── GET /api/affiliations ──
// Obtener todas las afiliaciones (Panel Admin)
// Query params: ?status=PENDING&page=1&limit=20&search=nombre
router.get('/', getAllAffiliations);

// ── GET /api/affiliations/:id ──
// Obtener una afiliación específica por ID
router.get('/:id', getAffiliationById);

// ── PATCH /api/affiliations/:id/status ──
// Actualizar estado de afiliación (Panel Admin)
// Body: { "status": "APPROVED", "notes": "..." }
router.patch('/:id/status', updateAffiliationStatus);

export default router;