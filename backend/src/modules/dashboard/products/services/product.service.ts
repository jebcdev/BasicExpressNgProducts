import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { DatabaseConnection } from "../../../database/DatabaseConnection";
import { IProductRepository } from "./../repositores/product.repository";
import { ProductEntity } from "../entities/product.entity";

export class ProductService implements IProductRepository {
    private repository: Repository<ProductEntity>;

    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                ProductEntity
            );
    }

    public async getAll(): Promise<ProductEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            relations: ["brand", "category"],
        });
    }

    public async getById(id: number): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            relations: ["brand", "category"],
        });
    }

    public async getBySlug(
        slug: string
    ): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                slug: slug,
            },
            relations: ["brand", "category"],
        });
    }

    public async getByName(
        name: string
    ): Promise<ProductEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name,
            },
            relations: ["brand", "category"],
        });
    }

    public async createNew(
        data: ProductEntity
    ): Promise<ProductEntity | null> {
        return await this.repository.save(data);
    }

    public async updateById(
        id: number,
        data: ProductEntity
    ): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    public async deleteById(
        id: number
    ): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}
