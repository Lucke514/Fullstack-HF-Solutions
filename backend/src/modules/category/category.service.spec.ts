import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { DatabaseService } from 'src/common/database/database.service';

describe('CategoryService', () => {
  let service: CategoryService;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una categoría', async () => {
      const dto = { name: 'Categoría de Prueba' };
      const mockResult = { rows: [{ id: 1, name: 'Categoría de Prueba' }] };
      mockDatabaseService.query.mockResolvedValue(mockResult);

      const result = await service.create(dto);

      expect(result).toEqual({ id: 1, name: 'Categoría de Prueba' });
      expect(mockDatabaseService.query).toHaveBeenCalledWith(
        'INSERT INTO categories (name) VALUES ($1) RETURNING *',
        ['Categoría de Prueba']
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las categorías', async () => {
      const mockResult = { 
        rows: [
          { id: 1, name: 'Categoría 1' },
          { id: 2, name: 'Categoría 2' }
        ] 
      };
      mockDatabaseService.query.mockResolvedValue(mockResult);

      const result = await service.findAll();

      expect(result).toEqual(mockResult.rows);
      expect(mockDatabaseService.query).toHaveBeenCalledWith('SELECT * FROM categories');
    });
  });
});
