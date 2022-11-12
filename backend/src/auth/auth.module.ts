import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [],
  providers: [AuthService, UserModule],
})
export class AuthModule {}
