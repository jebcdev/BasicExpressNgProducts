import { DeleteResult, UpdateResult } from "typeorm";
import { BrandEntity } from "../entities/brand.entity";

export interface IBrandRepository {
    getAll(): Promise<BrandEntity[] | null>;

    getById(id: number): Promise<BrandEntity | null>;

    getBySlug(slug: string): Promise<BrandEntity | null>;

    getByName(name: string): Promise<BrandEntity | null>;

    createNew(data: BrandEntity): Promise<BrandEntity | null>;

    updateById(
        id: number,
        data: BrandEntity
    ): Promise<UpdateResult | null>;

    deleteById(id: number): Promise<DeleteResult | null>;
}
