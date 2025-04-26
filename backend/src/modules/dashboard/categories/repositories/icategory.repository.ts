
import { DeleteResult, UpdateResult } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";

export interface ICategoryRepository {
    
    getAll(): Promise<CategoryEntity[] | null>;

    getById(id: number): Promise<CategoryEntity | null>;

    getBySlug(slug: string): Promise<CategoryEntity | null>;

    getByName(name: string): Promise<CategoryEntity | null>;

    createNew(data: CategoryEntity): Promise<CategoryEntity | null>;

    updateById(id: number, data: CategoryEntity): Promise<UpdateResult | null>;

    deleteById(id: number): Promise<DeleteResult | null>;
}
