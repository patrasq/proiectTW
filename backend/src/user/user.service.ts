import { ClassSerializerInterceptor, forwardRef, Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      return 'User already exists';
    }

    return this.userRepository.save({ firstName: createUserDto.firstName, 
      lastName: createUserDto.lastName,
       email: createUserDto.email, 
       password: this.authService.storeHashInDatabase(createUserDto.password),
      phoneNumber: createUserDto.phoneNumber });
  }

  findAll() {
    return this.userRepository.find();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findOneById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.userRepository.delete({ id });
  }
}
