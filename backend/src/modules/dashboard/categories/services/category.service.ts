import { DeleteResult, Repository, UpdateResult } from "typeorm";

import { DatabaseConnection } from "../../../database/DatabaseConnection";
import { ICategoryRepository } from "../repositories/icategory.repository";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryService implements ICategoryRepository {

    private repository: Repository<CategoryEntity>;

    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                CategoryEntity
            );
    }

    public async getAll(): Promise<CategoryEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            // relations: ["users"],
        });
    }

    public async getById(id: number): Promise<CategoryEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            // relations: ["users"],
        });
    }

    public async getBySlug(slug: string): Promise<CategoryEntity | null> {
        return await this.repository.findOne({
            where: {
                slug: slug,
            },
        });
    }
    
    public async getByName(name: string): Promise<CategoryEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name,
            },
        });
    }

    public async createNew(
        data: CategoryEntity
    ): Promise<CategoryEntity | null> {
        return await this.repository.save(data);
    }

    public async updateById(
        id: number,
        data: CategoryEntity
    ): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    public async deleteById(
        id: number
    ): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}
