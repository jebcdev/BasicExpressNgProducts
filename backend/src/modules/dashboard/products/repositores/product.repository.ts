import { DeleteResult, UpdateResult } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

export interface IProductRepository {
    getAll(): Promise<ProductEntity[] | null>;

    getById(id: number): Promise<ProductEntity | null>;

    getBySlug(slug: string): Promise<ProductEntity | null>;

    getByName(name: string): Promise<ProductEntity | null>;

    createNew(data: ProductEntity): Promise<ProductEntity | null>;

    updateById(id: number,data: ProductEntity): Promise<UpdateResult | null>;

    deleteById(id: number): Promise<DeleteResult | null>;
}
