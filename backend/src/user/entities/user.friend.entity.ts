import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFriend {
  @PrimaryGeneratedColumn({
    name: 'user_friend_id',
  })
  id: number;

  @ManyToOne(() => User)
  // @JoinColumn({
  //   name: 'user_id',
  //   referencedColumnName: 'id',
  // })
  user: User;
}
