import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Analytics } from 'src/models/analytics.model';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
    constructor(@InjectRepository(Analytics) private analyticsRepo: Repository<Analytics>) { }

    async logClick(shortUrl: string, ipAddress: string, userAgent: string) {
        return this.analyticsRepo.save({ shortUrl, ipAddress, userAgent });
    }

    async getUrlStats(shortUrl: string, userId: string) {
        const stats = await this.analyticsRepo.find({ where: { shortUrl } });
        const totalClicks = stats.length;
        const uniqueVisitors = new Set(stats.map((stat) => stat.ipAddress)).size;

        return {
            totalClicks,
            uniqueVisitors,
            stats,
        };
    }
}
