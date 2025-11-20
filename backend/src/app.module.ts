import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { DatabaseService } from './common/database/database.service';

@Module({
  imports: [CategoryModule, ProductModule],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
