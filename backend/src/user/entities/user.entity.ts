import { Exclude } from '@nestjs/class-transformer';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserFriend } from './user.friend.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column({
    name: 'first_name',
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    name: 'last_name',
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    name: 'email',
    nullable: false,
    default: '',
    //unique: true
  })
  email: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  @Exclude()
  password: string;

  @Column({
    name: 'phone_number',
    nullable: false,
    default: '',
  })
  phoneNumber: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => UserFriend, (userFriend) => userFriend.user)
  userFriends: UserFriend[];

  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }
}
