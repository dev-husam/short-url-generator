import { Module } from '@nestjs/common';
import { UrlShortsService } from './url-shorts.service';
import { UrlShortsController } from './url-shorts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { URLShortsSchema } from 'src/models/url-shorts.mode';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'URLShorts', schema: URLShortsSchema }]),
    AnalyticsModule
  ],
  controllers: [UrlShortsController],
  providers: [UrlShortsService],
})
export class UrlShortsModule { }
