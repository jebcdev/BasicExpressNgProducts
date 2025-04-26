import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateResult } from "typeorm";

import {CreateCategoryDto,UpdateCategoryDto} from '../dtos'
import { CategoryService } from "../services/category.service";
import { CategoryEntity } from "../entities/category.entity";

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

            if (!data) return res.status(404).json("Categories Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Categories | CategoryController",
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

            if (!data) return res.status(404).json("Category Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Category | CategoryController",
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

            if (!data) return res.status(404).json("Category Not Found");

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Category | CategoryController",
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
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            const nameExists: CategoryEntity | null =
                await this.service.getByName(dto.name);

            if (nameExists)
                return res
                    .status(400)
                    .json(`Category Already Exists: ${nameExists.name}`);

            const categorySlug: CategoryEntity | null =
                await this.service.getBySlug(dto.name);

            if (categorySlug)
                return res
                    .status(400)
                    .json(`Category Already Exists: ${categorySlug.slug}`);

            const data: CategoryEntity | null =
                await this.service.createNew(
                    plainToInstance(CategoryEntity, dto)
                );

            if (!data) {
                return res.status(500).json("Error Creating Category");
            }

            return res.status(201).json(data);
        } catch (error) {
            return res.status(500).json({
                message: "Error Fetching Categories | CategoryController",
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

            const toUpdate: CategoryEntity | null =
                await this.service.getById(id);

            if (!toUpdate) {
                return res.status(404).json("Category Not Found");
            }

            const dto: UpdateCategoryDto = plainToInstance(
                UpdateCategoryDto,
                req.body
            );

            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0) {
                return res.status(400).json({
                    message:
                        "Validation Error | CategoryController UpdateById",
                    errors: errors.map((err) => {
                        return {
                            property: err.property,
                            constraints: err.constraints,
                        };
                    }),
                });
            }

            const updatedData: UpdateResult | null =
                await this.service.updateById(
                    id,
                    plainToInstance(CategoryEntity, dto)
                );

            if (!updatedData) {
                return res.status(500).json("Error Updating Category");
            }

            return res
                .status(200)
                .json(await this.service.getById(id));
        } catch (error) {
            return res.status(500).json({
                message: "Error Updating Categories | CategoryController",
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

            const data: CategoryEntity | null =
                await this.service.getById(id);

            if (!data) return res.status(404).json("Category Not Found");

            const deleteResult = await this.service.deleteById(id);

            if (!deleteResult)
                return res.status(500).json("Error Deleting Category");

            return res.status(200).json("Category Deleted Successfully");
        } catch (error) {
            return res.status(500).json({
                message: "Error Deleting Categories | CategoryController",
                data:
                    error instanceof Error
                        ? error.message
                        : String(error),
            });
        }
    }
}
