// ═══════════════════════════════════════════════════════════════════
// SERVICIO DE ALMACENAMIENTO - CLOUDINARY
// ═══════════════════════════════════════════════════════════════════

import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Sube un archivo a Cloudinary
 * @param {Buffer} fileBuffer - Buffer del archivo
 * @param {string} filename - Nombre del archivo
 * @param {string} folder - Carpeta en Cloudinary
 * @returns {Promise<string>} URL segura del archivo
 */
export const uploadFile = (fileBuffer, filename, folder = 'fenalco/afiliaciones') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
        resource_type: 'auto', // Detecta automáticamente PDF, imágenes, etc.
        format: 'pdf', // Fuerza PDF si es documento
      },
      (error, result) => {
        if (error) {
          console.error('❌ Error al subir archivo a Cloudinary:', error);
          reject(error);
        } else {
          console.log('✅ Archivo subido:', result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    // Enviar el buffer al stream
    uploadStream.end(fileBuffer);
  });
};

/**
 * Elimina un archivo de Cloudinary
 * @param {string} publicId - ID público del archivo en Cloudinary
 * @returns {Promise<boolean>}
 */
export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('✅ Archivo eliminado de Cloudinary');
    return result.result === 'ok';
  } catch (error) {
    console.error('❌ Error al eliminar archivo de Cloudinary:', error);
    return false;
  }
};

/**
 * Extrae el public_id de una URL de Cloudinary
 * @param {string} url - URL completa de Cloudinary
 * @returns {string} Public ID
 */
export const getPublicIdFromUrl = (url) => {
  const matches = url.match(/\/v\d+\/(.+)\.\w+$/);
  return matches ? matches[1] : null;
};

export default {
  uploadFile,
  deleteFile,
  getPublicIdFromUrl,
};