import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import { CreateBrandyDto, UpdateBrandDto } from "../dtos";
import { BrandService } from "../services/brand.service";
import { BrandEntity } from "../entities/brand.entity";
import { deleteFile } from "../../../../utils/fileHelpers.util";

export class BrandController {
    private service: BrandService;

    constructor() {
        this.service = new BrandService();
    }

    public async getAll(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const data: BrandEntity[] | null =
                await this.service.getAll();

            if (!data)
                return res.status(404).json("Brands Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Brand | BrandController",
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
                return res.status(404).json("Brand Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Brand | BrandController",
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
                return res.status(404).json("Brand Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Brand | BrandController",
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
            const dto: CreateBrandyDto = plainToInstance(
                CreateBrandyDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | BrandController CreateNew",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            const nameExists: BrandEntity | null =
                await this.service.getByName(dto.name);
            if (nameExists) {
                return res
                    .status(400)
                    .json(
                        `Brand Already Exists: ${nameExists.name}`
                    );
            }

            const imageUrl = req.file
                ? `/public/uploads/brands/${req.file.filename}`
                : null;
            const brandData = { ...dto, image: imageUrl };

            const data: BrandEntity | null =
                await this.service.createNew(
                    plainToInstance(BrandEntity, brandData)
                );

            if (!data) {
                return res
                    .status(500)
                    .json("Error Creating Brand");
            }

            return res.status(201).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message:
                    "Error Creating Brand | BrandController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async updateById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const toUpdate: BrandEntity | null =
                await this.service.getById(id);
            if (!toUpdate) {
                return res.status(404).json("Brand Not Found");
            }

            const dto: UpdateBrandDto = plainToInstance(
                UpdateBrandDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);
            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | BrandController UpdateById",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Si se sube una nueva imagen, elimina la anterior
            if (req.file) {
                if (toUpdate.image) {
                    deleteFile(toUpdate.image); 
                }
                toUpdate.image = `/public/uploads/brands/${req.file.filename}`; // Guarda nueva ruta
            }

            toUpdate.name = dto.name || toUpdate.name;
            const updatedData: UpdateResult | null =
                await this.service.updateById(
                    id,
                    plainToInstance(BrandEntity, toUpdate)
                );

            if (!updatedData) {
                return res
                    .status(500)
                    .json("Error Updating Brand");
            }

            return res
                .status(200)
                .json(await this.service.getById(id));
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message:
                    "Error Updating Brand | BrandController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async deleteById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const data: BrandEntity | null =
                await this.service.getById(id);
            if (!data) {
                return res.status(404).json("Brand Not Found");
            }

            if (data.image) {
                console.log(
                    `Attempting to delete file at: ${data.image}`
                );
                deleteFile(data.image); // Llama a la función para eliminar la imagen
            }

            const deleteResult = await this.service.deleteById(id);
            if (!deleteResult) {
                return res
                    .status(500)
                    .json("Error Deleting Brand");
            }

            return res
                .status(200)
                .json("Brand Deleted Successfully");
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message:
                    "Error Deleting Brand | BrandController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}
