
import { IsNotEmpty, IsString, Length } from "class-validator";
export class CreateBrandyDto {

    @IsNotEmpty() 
    @IsString() 
    @Length(4, 100) 
    name: string;

    @IsNotEmpty() 
    @IsString() 
    @Length(4, 255) 
    slug: string;

    @IsNotEmpty() 
    @IsString() 
    @Length(4, 255) 
    description: string;

    // @IsNotEmpty() 
    // @IsString() 
    // @Length(4, 255) 
    image: string;
 
}
