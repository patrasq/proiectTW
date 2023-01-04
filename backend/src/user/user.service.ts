import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    console.log(user);
    if (user) {
      return new HttpException(
        `User with email ${createUserDto.email} already exists!`,
        409,
      );
    } else {
      return this.userRepository.save({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: this.createHash(createUserDto.password),
        phoneNumber: createUserDto.phoneNumber,
      });
    }
  }

  /**
   * Create new hash.
   *
   * @param password
   * @returns string
   */
  createHash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  findAll() {
    return this.userRepository.find();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
    // TO DO: Fix this
    // if (!user) {
    //   return new HttpException(`User with email ${email} not found`, 404);
    // } else {
    //   return user;
    // }
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return new HttpException(`User with id ${id} not found`, 404);
    } else {
      return user;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return new HttpException(`User with id ${id} found`, 404);
    } else {
      this.userRepository.delete({ id });
      return {
        message: `User with id ${id} deleted succesfully!`,
        status: HttpStatus.OK,
      };
    }
  }
}
