import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { HttpExceptionFilter } from 'src/Exception/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    CategoryService,
    UserService,
    HttpExceptionFilter,
  ],
})
export class ProductModule {}
