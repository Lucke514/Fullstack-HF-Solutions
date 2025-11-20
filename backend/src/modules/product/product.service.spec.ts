import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { DatabaseService } from 'src/common/database/database.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear un producto', async () => {
      const dto = {
        title: 'Producto Test',
        price: 99.99,
        description: 'Descripción test',
        image: 'http://test.com/img.png',
        categoryId: 1,
        rating: { rate: 4.5, count: 100 }
      };
      
      const mockCategoryResult = { rows: [{ id: 1 }] };
      const mockProductResult = {
        rows: [{
          id: 1,
          title: 'Producto Test',
          price: '99.99',
          description: 'Descripción test',
          image: 'http://test.com/img.png',
          category_id: 1,
          rating: { rate: 4.5, count: 100 }
        }]
      };

      mockDatabaseService.query
        .mockResolvedValueOnce(mockCategoryResult)
        .mockResolvedValueOnce(mockProductResult);

      const result = await service.create(dto);

      expect(result.title).toBe('Producto Test');
      expect(result.categoryId).toBe(1);
    });

    it('debería lanzar NotFoundException si la categoría no existe', async () => {
      const dto = {
        title: 'Producto Test',
        price: 99.99,
        categoryId: 999
      };

      mockDatabaseService.query.mockResolvedValue({ rows: [] });

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debería retornar todos los productos', async () => {
      const mockResult = {
        rows: [
          {
            id: 1,
            title: 'Producto 1',
            price: '50.00',
            description: 'Desc 1',
            image: 'img1.png',
            category_id: 1,
            rating: { rate: 4.0, count: 50 }
          }
        ]
      };

      mockDatabaseService.query.mockResolvedValue(mockResult);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Producto 1');
    });
  });

  describe('update', () => {
    it('debería actualizar un producto', async () => {
      const mockCheckResult = {
        rows: [{
          id: 1,
          title: 'Producto Original',
          price: '50.00',
          category_id: 1
        }]
      };

      const mockUpdateResult = {
        rows: [{
          id: 1,
          title: 'Producto Actualizado',
          price: '75.00',
          category_id: 1
        }]
      };

      mockDatabaseService.query
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce(mockUpdateResult);

      const result = await service.update(1, { title: 'Producto Actualizado', price: 75 });

      expect(result.title).toBe('Producto Actualizado');
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockDatabaseService.query.mockResolvedValue({ rows: [] });

      await expect(service.update(999, { title: 'Test' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar un producto', async () => {
      const mockCheckResult = { rows: [{ id: 1 }] };
      
      mockDatabaseService.query
        .mockResolvedValueOnce(mockCheckResult)
        .mockResolvedValueOnce({});

      const result = await service.remove(1);

      expect(result.message).toContain('eliminado exitosamente');
    });

    it('debería lanzar NotFoundException si el producto no existe', async () => {
      mockDatabaseService.query.mockResolvedValue({ rows: [] });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
