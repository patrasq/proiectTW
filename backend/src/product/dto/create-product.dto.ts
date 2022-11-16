import { IsNotEmpty, IsDateString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name must be provide!' })
  name: string;

  @MaxLength(30)
  description: string;

  // check if userId is a valid user
  @IsNotEmpty({ message: 'User id must be provide!' })
  userId: number;

  // check if categoryId is a valid category
  @IsNotEmpty({ message: 'Category id must be provide!' })
  categoryId: number;

  @IsNotEmpty({ message: 'Stock must be provide!' })
  stock: number;

  @IsNotEmpty({ message: 'Expiration date must be provide!' })
  @IsDateString({ message: 'Must be a date!' })
  expirationDate: Date;
}
