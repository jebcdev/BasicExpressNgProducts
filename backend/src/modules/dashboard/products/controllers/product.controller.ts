import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import { CreateProductDto, UpdateProductDto } from "./../dtos";
import { ProductService } from "../services/product.service";
import { ProductEntity } from "../entities/product.entity";
import {
    deleteFile,
    deleteProductImages,
} from "../../../../utils/fileHelpers.util"; //TODO: investigar para borrar varios archivos
import e from "cors";

export class ProductController {
    private service: ProductService;
    constructor() {
        this.service = new ProductService();
    }

    public async getAll(
        _req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const data: ProductEntity[] | null =
                await this.service.getAll();

            if (!data)
                return res.status(404).json("Products Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message:
                    "Error Fetching Products | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const data = await this.service.getById(id);

            if (!data)
                return res.status(404).json("Product Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Product | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    public async createNew(req: Request, res: Response) {
        try {
            // Transformar los datos del form-data antes de crear el DTO
            const transformedBody = {
                ...req.body,
                // Convertir strings a numbers
                price: req.body.price
                    ? parseFloat(req.body.price)
                    : undefined,
                sale_price: req.body.sale_price
                    ? parseFloat(req.body.sale_price)
                    : undefined,
                cost_price: req.body.cost_price
                    ? parseFloat(req.body.cost_price)
                    : undefined,
                stock_quantity: req.body.stock_quantity
                    ? parseInt(req.body.stock_quantity)
                    : undefined,
                category_id: req.body.category_id
                    ? parseInt(req.body.category_id)
                    : undefined,
                brand_id: req.body.brand_id
                    ? parseInt(req.body.brand_id)
                    : undefined,
                // Convertir string a boolean - CORREGIR ESTA PARTE
                featured:
                    req.body.featured !== undefined
                        ? req.body.featured === "true" ||
                          req.body.featured === true
                        : false, // Valor por defecto
                // Convertir strings a arrays (si vienen como JSON strings)
                tags: req.body.tags
                    ? typeof req.body.tags === "string"
                        ? JSON.parse(req.body.tags)
                        : req.body.tags
                    : undefined,
                attributes: req.body.attributes
                    ? typeof req.body.attributes === "string"
                        ? JSON.parse(req.body.attributes)
                        : req.body.attributes
                    : undefined,
            };

            const dto: CreateProductDto = plainToInstance(
                CreateProductDto,
                transformedBody
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | ProductController CreateNew",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            const nameExists: ProductEntity | null =
                await this.service.getByName(dto.name);

            if (nameExists)
                return res
                    .status(400)
                    .json("Product Name Already Exists");

            const slugExists: ProductEntity | null =
                await this.service.getBySlug(dto.slug);
            if (slugExists)
                return res
                    .status(400)
                    .json("Product Slug Already Exists");

            // Procesar múltiples imágenes
            const files = req.files as Express.Multer.File[];
            const imageUrls: string[] = [];

            if (files && files.length > 0) {
                files.forEach((file) => {
                    imageUrls.push(
                        `/public/uploads/products/${file.filename}`
                    );
                });
            }

            const productData = { ...dto, images: imageUrls };

            const data: ProductEntity | null =
                await this.service.createNew(
                    plainToInstance(ProductEntity, productData)
                );

            if (!data)
                return res.status(404).json("Product Not Created");

            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json({
                message: "Error Creating Product | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }

    // ...existing code...
    public async updateById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const toUpdate: ProductEntity | null =
                await this.service.getById(id);

            if (!toUpdate)
                return res.status(404).json("Product Not Found");

            const transformedBody = {
                ...req.body,
                code:
                    req.body.code && req.body.code.trim() !== ""
                        ? req.body.code.trim()
                        : toUpdate.code,
                price: req.body.price
                    ? parseFloat(req.body.price)
                    : undefined,
                sale_price: req.body.sale_price
                    ? parseFloat(req.body.sale_price)
                    : undefined,
                cost_price: req.body.cost_price
                    ? parseFloat(req.body.cost_price)
                    : undefined,
                stock_quantity: req.body.stock_quantity
                    ? parseInt(req.body.stock_quantity)
                    : undefined,
                category_id: req.body.category_id
                    ? parseInt(req.body.category_id)
                    : undefined,
                brand_id: req.body.brand_id
                    ? parseInt(req.body.brand_id)
                    : undefined,
                // Corregir la lógica para featured
                featured:
                    req.body.featured !== undefined
                        ? req.body.featured === "true" ||
                          req.body.featured === true
                        : undefined, // Cambiar false por undefined
                tags: req.body.tags
                    ? typeof req.body.tags === "string"
                        ? JSON.parse(req.body.tags)
                        : req.body.tags
                    : undefined,
                attributes: req.body.attributes
                    ? typeof req.body.attributes === "string"
                        ? JSON.parse(req.body.attributes)
                        : req.body.attributes
                    : undefined,
            };

            console.log(transformedBody);

            const dto: UpdateProductDto = plainToInstance(
                UpdateProductDto,
                transformedBody
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | ProductController UpdateById",
                    errors: errors.map((err) => ({
                        property: err.property,
                        constraints: err.constraints,
                    })),
                });
            }

            // Procesar nuevas imágenes si se suben
            const files = req.files as Express.Multer.File[];

            if (files && files.length > 0) {
                // Si vienen nuevas imágenes, borrar las anteriores
                if (toUpdate.images && toUpdate.images.length > 0) {
                    deleteProductImages(toUpdate.images);
                }

                // Procesar las nuevas imágenes
                const newImageUrls: string[] = [];
                files.forEach((file) => {
                    newImageUrls.push(
                        `/public/uploads/products/${file.filename}`
                    );
                });

                toUpdate.images = newImageUrls;
            }
            // Si no vienen nuevas imágenes, conservar las anteriores

            toUpdate.code = dto.code || toUpdate.code;
            toUpdate.name = dto.name || toUpdate.name;
            toUpdate.slug = dto.slug || toUpdate.slug;
            toUpdate.description =
                dto.description || toUpdate.description;
            toUpdate.short_description =
                dto.short_description || toUpdate.short_description;
            toUpdate.price = dto.price || toUpdate.price;
            toUpdate.sale_price =
                dto.sale_price || toUpdate.sale_price;
            toUpdate.cost_price =
                dto.cost_price || toUpdate.cost_price;
            toUpdate.stock_quantity =
                dto.stock_quantity || toUpdate.stock_quantity;
            toUpdate.sku = dto.sku || toUpdate.sku;
            toUpdate.barcode = dto.barcode || toUpdate.barcode;
            toUpdate.featured =
                dto.featured !== undefined // Cambiar la lógica aquí también
                    ? dto.featured
                    : toUpdate.featured;
            toUpdate.status = dto.status || toUpdate.status;
            toUpdate.category_id =
                dto.category_id || toUpdate.category_id;
            toUpdate.brand_id = dto.brand_id || toUpdate.brand_id;
            toUpdate.tags = dto.tags || toUpdate.tags;
            toUpdate.attributes =
                dto.attributes || toUpdate.attributes;

            const updatedData: UpdateResult | null =
                await this.service.updateById(
                    id,
                    plainToInstance(ProductEntity, toUpdate)
                );

            if (!updatedData)
                return res.status(500).json("Error Updating Product");

            return res
                .status(200)
                .json(await this.service.getById(id));
        } catch (error) {
            return res.status(500).json({
                message: "Error Updating Product | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
    // ...existing code...

    public async deleteById(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const id = parseInt(req.params.id);

            const data: ProductEntity | null =
                await this.service.getById(id);

            if (!data)
                return res.status(404).json("Product Not Found");

            // TODO: OJO CONEL DELETE DE IMAGENES
            /* if (data.images) {
                deleteFile(data.images); // Aquí ahora ya pasa el path tal cual /uploads/products/abc123.png
            } */

            const deleteResult = await this.service.deleteById(id);
            if (!deleteResult)
                return res.status(500).json("Error Deleting Product");

            return res
                .status(200)
                .json("Product Deleted Successfully");
        } catch (error) {
            return res.status(500).json({
                message: "Error Deleting Product | ProductController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}
