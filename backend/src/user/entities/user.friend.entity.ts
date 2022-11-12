import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserFriend {
  @PrimaryGeneratedColumn({
    name: 'user_friend_id',
  })
  id: number;

  @Column({
    name: 'friend_name',
  })
  friendName: string;

  @ManyToOne(() => User, (user) => user.userFriends)
  user: User;
}
