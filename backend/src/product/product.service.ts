import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const newProduct = new Product();
    const { name, expirationDate } = createProductDto;
    newProduct.id = Math.random() * 1000;
    newProduct.name = name;
    newProduct.expirationDate = expirationDate;
    newProduct.description = '';
    newProduct.category = null;
    newProduct.user = null;

    this.productRepository.save(newProduct);
  }

  findAll() {
    this.productRepository.find();
  }

  findOne(id: number) {
    this.productRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    this.productRepository.delete({ id });
  }
}
