import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { Request } from "express";

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) => {
        cb(
            null,
            path.join(
                __dirname,
                "..",
                "..",
                "public/uploads/products/"
            )
        );
    },

    filename: (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, filename: string) => void
    ) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuidv4()}${ext}`;
        cb(null, filename);
    },
});

// Filtro para solo imágenes
const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    try {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"));
        }
    } catch (error) {
        console.error(error);
    }
};

// Configuración para múltiples imágenes (máximo 10)
export const uploadProductImage = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB por archivo
        files: 10 // máximo 10 archivos
    }
});