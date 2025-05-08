import { DeleteResult, Repository, UpdateResult } from "typeorm";

import { DatabaseConnection } from "../../../database/DatabaseConnection";
import {IBrandRepository} from "../repositories/brand.repository";
import { BrandEntity} from "../entities/brand.entity";

export class BrandService implements IBrandRepository {

    private repository: Repository<BrandEntity>;

    constructor() {
        this.repository =
            DatabaseConnection.appDataSource.getRepository(
                BrandEntity
            );
    }

    public async getAll(): Promise<BrandEntity[] | null> {
        return await this.repository.find({
            order: {
                id: "DESC",
            },
            // relations: ["users"],
        });
    }

    public async getById(id: number): Promise<BrandEntity | null> {
        return await this.repository.findOne({
            where: {
                id: id,
            },
            // relations: ["users"],
        });
    }

    public async getBySlug(slug: string): Promise<BrandEntity | null> {
        return await this.repository.findOne({
            where: {
                slug: slug,
            },
        });
    }
    
    public async getByName(name: string): Promise<BrandEntity | null> {
        return await this.repository.findOne({
            where: {
                name: name,
            },
        });
    }

    public async createNew(
        data: BrandEntity
    ): Promise<BrandEntity | null> {
        return await this.repository.save(data);
    }

    public async updateById(
        id: number,
        data: BrandEntity
    ): Promise<UpdateResult | null> {
        return await this.repository.update(id, data);
    }

    public async deleteById(
        id: number
    ): Promise<DeleteResult | null> {
        return await this.repository.softDelete(id);
    }
}
