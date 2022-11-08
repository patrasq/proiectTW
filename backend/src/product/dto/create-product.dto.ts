import { IsNotEmpty, IsDateString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product name must be provide!' })
  name: string;

  @MaxLength(15)
  description: string;

  @IsNotEmpty({ message: 'Expiration date must be provide!' })
  @IsDateString({ message: 'Must be a date!' })
  expirationDate: Date;
}
