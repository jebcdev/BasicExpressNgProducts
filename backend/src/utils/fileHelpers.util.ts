import fs from 'fs';
import path from 'path';

/**
 * Borra un archivo dado su ruta relativa desde /public
 * @param filePath Ruta relativa del archivo (ej: /uploads/categories/abc123.png)
 */
export const deleteFile = (filePath: string) => {
  // Asegúrate de que la ruta no tenga un "/" inicial
  const normalizedPath = filePath.startsWith('/')
    ? filePath.substring(1)
    : filePath;

  // Construir la ruta absoluta correcta usando process.cwd()
  const fullPath = path.join(process.cwd(), 'dist', 'public', normalizedPath);

  console.log(`Attempting to delete file at: ${fullPath}`);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`File deleted: ${fullPath}`);
  } else {
    console.log(`File not found: ${fullPath}`);
  }


  

};


// Nueva función para borrar múltiples archivos
export const deleteMultipleFiles = (filePaths: string[]): void => {
    if (!filePaths || !Array.isArray(filePaths)) return;
    
    filePaths.forEach(filePath => {
        if (filePath) {
            deleteFile(filePath);
        }
    });
};

// Función para borrar archivos de imágenes de productos
export const deleteProductImages = (images: string[]): void => {
    if (!images || !Array.isArray(images)) return;
    
    images.forEach(imagePath => {
        if (imagePath) {
            // Remover el prefijo /public si existe para obtener la ruta correcta
            const cleanPath = imagePath.replace(/^\/public/, '');
            deleteFile(cleanPath);
        }
    });
};