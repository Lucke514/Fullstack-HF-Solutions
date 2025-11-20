import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * @author Lucas Gonzalez
 * @description DTO para la actualización de un producto existente
 * @note PartialType hace que todas las propiedades de CreateProductDto sean opcionales
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
