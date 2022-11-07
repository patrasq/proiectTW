import { IsNotEmpty, MaxLength, IsEmail } from "class-validator"
import { isNumber } from "util";

export class CreateUserDto{

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MaxLength(10, {message: 'Phone number must be 10 digits long!'})
    phoneNumber: string

}