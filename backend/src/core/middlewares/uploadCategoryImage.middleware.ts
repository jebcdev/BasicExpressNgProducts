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
                "public/uploads/categories/"
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

export const uploadCategoryImage = multer({ storage, fileFilter });
