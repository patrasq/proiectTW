import { Catch, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CronJob } from 'src/cron/interceptor';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // private readonly cronJob: CronJob,
    private readonly categoryService: CategoryService,
    private readonly userService: UserService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.findOne(
      createProductDto.categoryId,
    );
    const user = await this.userService.findOneById(createProductDto.userId);

    if (!category || user instanceof HttpException) {
      throw new HttpException('Category or User not found!', 404);
    } else {
      return this.productRepository.save({
        name: createProductDto.name,
        expirationDate: createProductDto.expirationDate,
        stock: createProductDto.stock,
        category: { id: createProductDto.categoryId },
        userId: { id: createProductDto.userId },
        description: createProductDto.description,
      });
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new HttpException('Product not found!', 404);
    } else {
      return product;
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const product = await this.productRepository.findBy({ id });
    if (!product) {
      throw new HttpException('Product not found!', 404);
    } else {
      this.productRepository.delete({ id });
      return {
        message: `Product with id ${id} deleted successfully!`,
      };
    }
  }
}
