import { IsEmpty, IsDate } from "class-validator";

export class CreateProductDto {

    @IsEmpty({message: 'Product name must be provide!'})
    name: string;

    @IsEmpty({message: 'Expiration date must be provide!'})
    @IsDate({message: 'Must be a date!'})
    expirationDate: Date;
}
