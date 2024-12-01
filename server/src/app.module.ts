import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UrlShortsModule } from './url-shorts/url-shorts.module';
import { Analytics } from './models/analytics.model';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: process.env.MONGO_URI,
        }
      }
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          autoLoadEntities: true,
          type: "postgres",
          url: process.env.POSTGRESS_URL,
          entities: [Analytics],
          synchronize: true
        }
      }
    }),
    AuthModule, AnalyticsModule, UserModule, UrlShortsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
