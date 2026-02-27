// ═══════════════════════════════════════════════════════════════════
// MIDDLEWARE DE MANEJO DE ERRORES
// ═══════════════════════════════════════════════════════════════════

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error capturado:', err);

  // Error de Multer (archivo muy grande o tipo no permitido)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      error: 'El archivo supera el límite de 10MB',
      code: 'FILE_TOO_LARGE',
    });
  }

  if (err.message?.includes('Solo se permiten')) {
    return res.status(400).json({
      error: err.message,
      code: 'INVALID_FILE_TYPE',
    });
  }

  // Error de Prisma (base de datos)
  if (err.code?.startsWith('P')) {
    // P2002: Unique constraint violation
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'campo';
      return res.status(409).json({
        error: `Ya existe un registro con este ${field}`,
        code: 'DUPLICATE_ENTRY',
        field,
      });
    }

    // P2025: Record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        error: 'Registro no encontrado',
        code: 'NOT_FOUND',
      });
    }

    // Otros errores de Prisma
    return res.status(500).json({
      error: 'Error de base de datos',
      code: 'DATABASE_ERROR',
    });
  }

  // Error de validación (express-validator)
  if (err.array) {
    return res.status(400).json({
      error: 'Errores de validación',
      code: 'VALIDATION_ERROR',
      details: err.array(),
    });
  }

  // Error de CORS
  if (err.message?.includes('CORS')) {
    return res.status(403).json({
      error: 'Acceso no permitido desde este origen',
      code: 'CORS_ERROR',
    });
  }

  // Error genérico
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor' 
    : err.message;

  res.status(statusCode).json({
    error: message,
    code: err.code || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;