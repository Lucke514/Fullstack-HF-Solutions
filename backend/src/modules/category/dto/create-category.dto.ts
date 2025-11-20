import { IsNotEmpty, IsString } from "class-validator";

/**
 * @author Lucas Gonzalez
 * @description DTO para la creacion de una nueva categoria
 * @note Implemente class-validator para asegurar que los datos recibidos son correctos y automatizar las validaciones
 */
export class CreateCategoryDto {
    @IsString({ message: 'El nombre de la categoria debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de la categoria no debe estar vacio' })
    name: string;
}
