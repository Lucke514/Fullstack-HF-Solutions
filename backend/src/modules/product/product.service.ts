import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  // Instanciar para poder utilizar el servicio de base de datos
  constructor(
    private readonly databaseService: DatabaseService, 
  ) {}

  /**
   * @description Crea un nuevo producto
   * @param createProductDto - Data Transfer Object para crear un producto
   * @returns 
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      // Desestructurar el DTO para obtener los datos necesarios
      const { title, price, description, image, categoryId, rating } = createProductDto;

      // Validar que la categoría exista
      const categoryQuery = 'SELECT id FROM categories WHERE id = $1';
      const categoryResult = await this.databaseService.query(categoryQuery, [categoryId]);
      
      if (categoryResult.rows.length === 0) {
        throw new NotFoundException(`Categoría con ID ${categoryId} no encontrada`);
      }

      // Consulta SQL para insertar un nuevo producto
      const query = `
        INSERT INTO products (title, price, description, image, category_id, rating) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      `;
      const values = [title, price, description, image, categoryId, rating ? JSON.stringify(rating) : null];

      // Ejecutar la consulta y retornar el resultado
      const result = await this.databaseService.query<Product>(query, values);
      return this.mapProduct(result.rows[0]);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al crear el producto',
        error: (error instanceof Error) ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * @description Obtiene todos los productos
   * @returns 
   */
  async findAll(): Promise<Product[]> {
    try {
      // Consulta SQL para obtener todos los productos
      const query = 'SELECT * FROM products';
 
      // Ejecutar la consulta y retornar el resultado
      const result = await this.databaseService.query<any>(query);
      return result.rows.map(row => this.mapProduct(row));
    } catch (error: unknown) {
      throw new InternalServerErrorException({
        message: 'Error al obtener los productos',
        error: (error instanceof Error) ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * @description Actualiza un producto existente
   * @param id - ID del producto a actualizar
   * @param updateProductDto - Data Transfer Object con los datos a actualizar
   * @returns 
   */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      // Verificar si el producto existe
      const checkQuery = 'SELECT * FROM products WHERE id = $1';
      const checkResult = await this.databaseService.query(checkQuery, [id]);
      
      if (checkResult.rows.length === 0) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      // Construir dinámicamente la consulta de actualización
      const fields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      if (updateProductDto.title !== undefined) {
        fields.push(`title = $${paramIndex++}`);
        values.push(updateProductDto.title);
      }
      if (updateProductDto.price !== undefined) {
        fields.push(`price = $${paramIndex++}`);
        values.push(updateProductDto.price);
      }
      if (updateProductDto.description !== undefined) {
        fields.push(`description = $${paramIndex++}`);
        values.push(updateProductDto.description);
      }
      if (updateProductDto.image !== undefined) {
        fields.push(`image = $${paramIndex++}`);
        values.push(updateProductDto.image);
      }
      if (updateProductDto.categoryId !== undefined) {
        fields.push(`category_id = $${paramIndex++}`);
        values.push(updateProductDto.categoryId);
      }
      if (updateProductDto.rating !== undefined) {
        fields.push(`rating = $${paramIndex++}`);
        values.push(JSON.stringify(updateProductDto.rating));
      }

      // Si no hay campos para actualizar, retornar el producto sin cambios
      if (fields.length === 0) {
        return this.mapProduct(checkResult.rows[0]);
      }

      // Agregar el ID al final de los valores
      values.push(id);

      // Construir y ejecutar la consulta de actualización
      const query = `
        UPDATE products 
        SET ${fields.join(', ')} 
        WHERE id = $${paramIndex} 
        RETURNING *
      `;

      const result = await this.databaseService.query<any>(query, values);
      return this.mapProduct(result.rows[0]);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al actualizar el producto',
        error: (error instanceof Error) ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * @description Elimina un producto
   * @param id - ID del producto a eliminar
   * @returns 
   */
  async remove(id: number): Promise<{ message: string }> {
    try {
      // Verificar si el producto existe
      const checkQuery = 'SELECT * FROM products WHERE id = $1';
      const checkResult = await this.databaseService.query(checkQuery, [id]);
      
      if (checkResult.rows.length === 0) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      // Eliminar el producto
      const query = 'DELETE FROM products WHERE id = $1';
      await this.databaseService.query(query, [id]);

      return { message: `Producto con ID ${id} eliminado exitosamente` };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Error al eliminar el producto',
        error: (error instanceof Error) ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * @description Mapea los nombres de columnas de la base de datos a camelCase
   * @param row - Fila de la base de datos
   * @returns 
   */
  private mapProduct(row: any): Product {
    return {
      id: row.id,
      title: row.title,
      price: parseFloat(row.price),
      description: row.description,
      image: row.image,
      categoryId: row.category_id,
      rating: row.rating ? (typeof row.rating === 'string' ? JSON.parse(row.rating) : row.rating) : undefined,
    };
  }
}
