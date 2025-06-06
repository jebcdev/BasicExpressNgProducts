import {
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from "class-validator";
export class UpdateCategoryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(4, 100)
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(4, 255)
    slug: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(4, 255)
    description: string;

    // @IsOptional()
    // @IsNotEmpty()
    // @IsString()
    // @Length(4, 255)
    image: string;
}
