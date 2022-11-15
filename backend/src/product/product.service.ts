import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CronJob } from 'src/cron/interceptor';
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
  ) {}

  create(createProductDto: CreateProductDto) {
    // const newProduct = new Product();
    // const { name, expirationDate, description } = createProductDto;
    // newProduct.name = name;
    // newProduct.expirationDate = expirationDate;
    // newProduct.description = description;
    // newProduct.category = null;
    // newProduct.user = null;

    return this.productRepository.save({
      name: createProductDto.name,
      expirationDate: createProductDto.expirationDate,
      description: createProductDto.description,
    });

    // this.productRepository.save(newProduct);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    this.productRepository.delete({ id });
  }
}
