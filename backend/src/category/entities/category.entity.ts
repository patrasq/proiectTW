import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

    @PrimaryGeneratedColumn({
        name: 'category_id'
    })
    id: number;

    @Column({
        name: 'category_name',
        nullable: false,
        default: ''
    })
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[]

}
