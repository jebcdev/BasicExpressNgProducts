import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    
} from "class-validator";
import { ProductStatus } from "../entities/product.entity";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @Length(3, 50)
    code?: string;

    @IsOptional()
    @IsString()
    @Length(3, 150)
    name?: string;

    @IsOptional()
    @IsString()
    @Length(3, 180)
    slug?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    short_description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    sale_price?: number;

    @IsOptional()
    @IsNumber()
    cost_price?: number;

    @IsOptional()
    @IsInt()
    stock_quantity?: number;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    sku?: string;

    @IsOptional()
    @IsString()
    @Length(0, 100)
    barcode?: string;

    @IsOptional()
    @IsBoolean()
    featured?: boolean;

    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @IsOptional()
    @IsInt()
    category_id?: number;

    @IsOptional()
    @IsInt()
    brand_id?: number;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    attributes?: string[];
}
