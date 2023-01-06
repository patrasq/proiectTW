import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.controller';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';

import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { UserFriend } from './user/entities/user.friend.entity';
import { HttpExceptionFilter } from './Exception/http-exception.filter';

import { MiddlewareConsumer, NestModule, Module } from '@nestjs/common';
import { CorsMiddleware } from './common/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
      entities: [User, Category, Product, UserFriend],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
