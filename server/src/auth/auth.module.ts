import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppAuthGuard } from 'src/guards/auth.guards';

@Global()
@Module({
  imports: [

    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '3d' },
        }
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AppAuthGuard],
  exports: [AuthService, AppAuthGuard, JwtModule],

})
export class AuthModule { }
