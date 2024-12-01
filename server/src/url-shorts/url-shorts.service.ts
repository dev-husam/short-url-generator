import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { URLShortsDocument } from 'src/models/url-shorts.mode';

@Injectable()
export class UrlShortsService {
    constructor(@InjectModel('URLShorts') private urlModel: Model<URLShortsDocument>,
        private readonly analyticsService: AnalyticsService
    ) { }


    async urlList(userId: string) {
        const urlListData = await this.urlModel.find({ userId })
        return urlListData
    }

    async createShortUrl(originalUrl: string, userId: string) {
        const shortUrl = Math.random().toString(36).substr(2, 8);
        const expiresAt = new Date(Date.now() + 120 * 60 * 1000);
        const newUrl = new this.urlModel({ originalUrl, shortUrl, userId, expirationDate: expiresAt });
        await newUrl.save();

        const createdUrl = await this.urlModel.findById(newUrl._id)

        return createdUrl;
    }

    async expandUrl(shortUrl: string, VistorInfo: { ipAddress: string, userAgent: string }): Promise<string> {
        const url = await this.urlModel.findOne({ shortUrl });
        if (!url || new Date() > url.expirationDate) {
            throw new NotFoundException('Short URL not found or expired');
        }
        url.totalClicks += 1
        await url.save()
        await this.analyticsService.logClick(shortUrl, VistorInfo.ipAddress, VistorInfo.userAgent)
        return url.originalUrl;
    }

    async getAnalytics(shortUrl: string, userId: string) {
        const url = await this.urlModel.findOne({ shortUrl, createdBy: userId });
        if (!url) {
            throw new NotFoundException('URL not found');
        }

        return this.analyticsService.getUrlStats(shortUrl, userId);
    }

}
