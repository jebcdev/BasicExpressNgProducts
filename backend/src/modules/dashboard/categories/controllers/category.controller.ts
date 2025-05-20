import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import { CreateCategoryDto, UpdateCategoryDto } from "../dtos";
import { CategoryService } from "../services/category.service";
import { CategoryEntity } from "../entities/category.entity";
import { deleteFile } from "../../../../utils/fileHelpers.util";

export class CategoryController {
    private service: CategoryService;

    constructor() {
        this.service = new CategoryService();
    }

    public async getAll(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const data: CategoryEntity[] | null =
                await this.service.getAll();

            if (!data)
                return res.status(404).json("Categories Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Categories | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const data = await this.service.getById(id);

            if (!data)
                return res.status(404).json("Category Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Category | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getBySlug(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const slug = req.params.slug;

            const data = await this.service.getBySlug(slug);

            if (!data)
                return res.status(404).json("Category Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Category | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async createNew(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const dto: CreateCategoryDto = plainToInstance(
                CreateCategoryDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | CategoryController CreateNew",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            const nameExists: CategoryEntity | null =
                await this.service.getByName(dto.name);
            if (nameExists) {
                return res
                    .status(400)
                    .json(
                        `Category Already Exists: ${nameExists.name}`
                    );
            }

            const imageUrl = req.file
                ? `/public/uploads/categories/${req.file.filename}`
                : null;
            const categoryData = { ...dto, image: imageUrl };

            const data: CategoryEntity | null =
                await this.service.createNew(
                    plainToInstance(CategoryEntity, categoryData)
                );

            if (!data) {
                return res
                    .status(500)
                    .json("Error Creating Category");
            }

            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message:
                    "Error Creating Category | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

        // filepath: d:\doc\tut\web\yt\BasicExpressNgProducts\backend\src\modules\dashboard\categories\controllers\category.controller.ts

    
    public async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
    
            const toUpdate: CategoryEntity | null = await this.service.getById(id);
            if (!toUpdate) {
                return res.status(404).json("Category Not Found");
            }
    
            const dto: UpdateCategoryDto = plainToInstance(UpdateCategoryDto, req.body);
    
            const errors: ValidationError[] = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation Error | CategoryController UpdateById",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }
    
            // Si se sube una nueva imagen, elimina la anterior
            if (req.file) {
                if (toUpdate.image) {
                    deleteFile(toUpdate.image); // Aquí ahora ya pasa el path tal cual /uploads/categories/abc123.png
                }
                toUpdate.image = `/public/uploads/categories/${req.file.filename}`; // Guarda nueva ruta
            }
    
            toUpdate.name = dto.name || toUpdate.name;
            
            const updatedData: UpdateResult | null = await this.service.updateById(
                id,
                plainToInstance(CategoryEntity, toUpdate)
            );
    
            if (!updatedData) {
                return res.status(500).json("Error Updating Category");
            }
    
            return res.status(200).json(await this.service.getById(id));
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Error Updating Category | CategoryController",
                data: error instanceof Error ? error.message : String(error),
            });
        }
    }
    
public async deleteById(req: Request, res: Response): Promise<Response> {
    try {
        const id = parseInt(req.params.id);

        const data: CategoryEntity | null = await this.service.getById(id);
        if (!data) {
            return res.status(404).json("Category Not Found");
        }

        if (data.image) {
            console.log(`Attempting to delete file at: ${data.image}`);
            deleteFile(data.image); // Llama a la función para eliminar la imagen
        }

        const deleteResult = await this.service.deleteById(id);
        if (!deleteResult) {
            return res.status(500).json("Error Deleting Category");
        }

        return res.status(200).json("Category Deleted Successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error Deleting Category | CategoryController",
            data: error instanceof Error ? error.message : String(error),
        });
    }
}
}