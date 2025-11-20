import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DatabaseService } from 'src/common/database/database.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  // Instanciar para poder utilizar el servicio de base de datos
  constructor(
    private readonly databaseService: DatabaseService, 
  ) {}

  /**
   * @description Crea una nueva categoría
   * @param createCategoryDto - Data Transfer Object para crear una categoría
   * @returns 
   */
  async create(createCategoryDto: CreateCategoryDto) : Promise<Category>{
    try {
      // Desestructurar el DTO para obtener los datos necesarios
      const { name } = createCategoryDto;

      // Consulta SQL para insertar una nueva categoría
      const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING *';
      const values = [name];

      // Ejecutar la consulta y retornar el resultado
      const result = await this.databaseService.query<Category>(query, values);
      return result.rows[0];
    } catch (error : unknown) {
      throw new InternalServerErrorException({
        message: 'Error al crear la categoría',
        error: (error instanceof Error) ? error.message : 'Error desconocido',
      });
    }
  }

  /**
   * @description Obtiene todas las categorías
   * @returns 
   */
  async findAll() : Promise<Category[]>{
    try {
      // Consulta SQL para obtener todas las categorías
      const query = 'SELECT * FROM categories';
 
      // Ejecutar la consulta y retornar el resultado
      const result = await this.databaseService.query<Category>(query);
      return result.rows;
    } catch (error : unknown) {
      throw new InternalServerErrorException({
        message: 'Error al obtener las categorías',
        error: (error instanceof Error) ? error.message : 'Error desconocido',
      });
    }
  }
}
