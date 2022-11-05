import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn({
        name: 'user_id'
    })
    id: number;

    @Column({
        name: 'user_first_name',
        nullable: false,
        default: ''
    })
    firstName: string;

    @Column({
        name: 'user_last_name',
        nullable: false,
        default: ''
    })
    lastName: string;

    @Column({
        name: 'user_email',
        nullable: false,
        default: ''
    })
    email: string;

    @Column({
        name: 'user_phone_number',
        nullable: false,
        default: ''
    })
    phoneNumber: string;

    @OneToMany(() => Product, product => product.user)
    products: Product[]
}