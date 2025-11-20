import { IsNotEmpty, IsString, IsNumber, IsOptional, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

/**
 * @description Clase para validar el rating del producto
 */
class RatingDto {
    @IsNumber({}, { message: 'El rate debe ser un número' })
    @Min(0, { message: 'El rate debe ser mayor o igual a 0' })
    @IsNotEmpty({ message: 'El rate no debe estar vacío' })
    rate: number;

    @IsNumber({}, { message: 'El count debe ser un número' })
    @Min(0, { message: 'El count debe ser mayor o igual a 0' })
    @IsNotEmpty({ message: 'El count no debe estar vacío' })
    count: number;
}

/**
 * @description DTO para la creacion de un nuevo producto
 * @note Implemente class-validator para asegurar que los datos recibidos son correctos y automatizar las validaciones
 */
export class CreateProductDto {
    @IsString({ message: 'El título del producto debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título del producto no debe estar vacío' })
    title: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
    @IsNotEmpty({ message: 'El precio no debe estar vacío' })
    price: number;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional()
    description?: string;

    @IsString({ message: 'La imagen debe ser una cadena de texto (URL)' })
    @IsOptional()
    image?: string;

    @IsNumber({}, { message: 'El ID de categoría debe ser un número' })
    @IsNotEmpty({ message: 'El ID de categoría no debe estar vacío' })
    categoryId: number;

    @ValidateNested()
    @Type(() => RatingDto)
    @IsOptional()
    rating?: RatingDto;
}
