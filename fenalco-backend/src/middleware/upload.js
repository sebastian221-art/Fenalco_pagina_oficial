// ═══════════════════════════════════════════════════════════════════
// MIDDLEWARE DE UPLOAD - MULTER
// ═══════════════════════════════════════════════════════════════════

import multer from 'multer';

// Configurar almacenamiento en memoria (luego se sube a Cloudinary)
const storage = multer.memoryStorage();

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF, JPG o PNG'), false);
  }
};

// Configuración de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo por archivo
  },
});

// Middleware para los 4 documentos del formulario de afiliación
export const uploadAffiliationDocs = upload.fields([
  { name: 'docRUT', maxCount: 1 },
  { name: 'docCamara', maxCount: 1 },
  { name: 'docRepresentante', maxCount: 1 },
  { name: 'docRenta', maxCount: 1 },
]);

// Middleware para comprobante de pago (transferencia)
export const uploadPaymentProof = upload.single('transferProof');

export default {
  uploadAffiliationDocs,
  uploadPaymentProof,
};