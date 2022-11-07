import { IsEmpty } from "class-validator";

export class CreateProductDto {

    @IsEmpty()
    name: string;
}
