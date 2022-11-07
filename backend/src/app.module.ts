import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.controller';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		AuthModule,
		UserModule,
		ProductModule,
		CategoryModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASS,
			database: process.env.DATABASE_NAME,
			entities: [],
			synchronize: true,
		}),
		UserModule,
	]
})
export class AppModule { }
