import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'product_name',
    nullable: false,
    default: '',
  })
  name: string;

  @Column('datetime', {
    name: 'product_expiration_date',
    nullable: true,
  })
  expirationDate: Date;

  @Column({
    name: 'product_description',
    nullable: true,
    default: '',
  })
  description: string;

  @Column({
    name: 'product_stock',
    nullable: false,
    default: 0,
  })
  stock: number;

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'SET NULL',
  })
  user: User;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: Category;
}
