import { IsEmpty } from "class-validator";

export class CreateCategoryDto {

    @IsEmpty()
    name: string;
}
