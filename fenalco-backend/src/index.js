// ═══════════════════════════════════════════════════════════════════
// SERVIDOR PRINCIPAL - FENALCO SUR DE SANTANDER
// ═══════════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Importar rutas
import affiliationRoutes from './routes/affiliations.js';
import paymentRoutes from './routes/payments.js';
import errorHandler from './middleware/errorHandler.js';

// Configuración de __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ── SEGURIDAD BÁSICA ──
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ── CORS ──
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sin origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ── RATE LIMITING ──
// Protege contra spam y ataques DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: { 
    error: 'Demasiadas solicitudes desde esta IP. Intenta de nuevo en 15 minutos.' 
  },
});

app.use('/api', limiter);

// Límite más estricto para formularios
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // máximo 5 solicitudes por hora
  message: { 
    error: 'Demasiadas solicitudes de afiliación. Intenta de nuevo en 1 hora.' 
  },
});

app.use('/api/affiliations', formLimiter);

// ── LOGGING ──
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ── PARSING ──
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── ARCHIVOS ESTÁTICOS (Panel Admin) ──
app.use('/admin', express.static(path.join(__dirname, '../public/admin')));

// ── HEALTH CHECK ──
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// ── RUTAS DE LA API ──
app.use('/api/affiliations', affiliationRoutes);
app.use('/api/payments', paymentRoutes);

// ── RUTA RAÍZ ──
app.get('/', (req, res) => {
  res.json({
    message: 'Backend FENALCO Sur de Santander',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      affiliations: '/api/affiliations',
      payments: '/api/payments',
      admin: '/admin',
    },
    documentation: 'https://github.com/tu-repo/fenalco-backend',
  });
});

// ── MANEJO DE ERRORES 404 ──
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
  });
});

// ── MANEJO DE ERRORES GLOBAL ──
app.use(errorHandler);

// ── INICIAR SERVIDOR ──
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║                                                          ║');
  console.log('║     🚀  FENALCO SUR DE SANTANDER - BACKEND API  🚀      ║');
  console.log('║                                                          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ✓ Servidor:     http://localhost:${PORT}                    ║`);
  console.log(`║  ✓ Health Check: http://localhost:${PORT}/health            ║`);
  console.log(`║  ✓ Panel Admin:  http://localhost:${PORT}/admin             ║`);
  console.log(`║  ✓ Ambiente:     ${process.env.NODE_ENV || 'development'}                  ║`);
  console.log('║                                                          ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log('║  Endpoints disponibles:                                  ║');
  console.log('║  → POST   /api/affiliations                             ║');
  console.log('║  → GET    /api/affiliations                             ║');
  console.log('║  → POST   /api/payments/transfer                        ║');
  console.log('║  → POST   /api/payments/wompi                           ║');
  console.log('║  → POST   /api/payments/wompi/webhook                   ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log('');
});

// ── MANEJO DE ERRORES NO CAPTURADOS ──
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  // En producción, reinicia el servidor
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  // En producción, reinicia el servidor
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

export default app;