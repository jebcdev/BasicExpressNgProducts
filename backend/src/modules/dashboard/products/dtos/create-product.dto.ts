import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Min,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ProductStatus } from "../entities/product.entity";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    code: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 150)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 180)
    slug: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @Length(0, 255)
    short_description?: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true }) // Cada imagen debe ser una string (URL o nombre de archivo)
    images?: string[];

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    sale_price?: number;

    @IsNotEmpty()
    @IsNumber()
    cost_price?: number;

    @IsNotEmpty()
    @IsInt()
    stock_quantity: number;

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    sku?: string;

    @IsNotEmpty()
    @IsString()
    @Length(0, 100)
    barcode?: string;

    @IsNotEmpty()
    @IsBoolean()
    featured?: boolean;

    @IsNotEmpty()
    @IsEnum(ProductStatus)
    status?: ProductStatus;

    @IsNotEmpty()
    @IsInt()
    category_id: number;

    @IsNotEmpty()
    @IsInt()
    brand_id: number;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true }) // Cada tag debe ser string
    tags?: string[];

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Object)
    attributes?: Record<string, any>[];
}
