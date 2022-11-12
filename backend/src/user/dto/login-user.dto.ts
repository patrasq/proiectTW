import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginUserDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}