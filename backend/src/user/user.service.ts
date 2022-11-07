import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new User();
    const { firstName, lastName, phoneNumber, email } = createUserDto;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.phoneNumber = phoneNumber;

    this.userRepository.save(newUser);
  }

  findAll() {
    this.userRepository.find();
  }

  findOne(id: number) {
    this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.userRepository.delete({ id });
  }
}
