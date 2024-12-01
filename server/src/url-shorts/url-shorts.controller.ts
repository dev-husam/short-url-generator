import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UrlShortsService } from './url-shorts.service';
import { AppAuthGuard } from 'src/guards/auth.guards';
import { Request, Response } from 'express';

@Controller('url')
export class UrlShortsController {
  constructor(private readonly urlShortsService: UrlShortsService) { }

  @UseGuards(AppAuthGuard)
  @Post('shorten')
  async shorten(@Body() body: { originalUrl: string }, @Req() req: any) {
    return this.urlShortsService.createShortUrl(body.originalUrl, req.user.userId);
  }
  @UseGuards(AppAuthGuard)
  @Get()
  async urlList(@Req() req: any) {
    return this.urlShortsService.urlList(req.user.userId);
  }
  @Get("expand/:short")
  async expand(@Param("short") short: string, @Req() req: Request, @Res() res: Response) {
    const ipAddress = req.ip || req.headers['x-forwarded-for']
    const userAgent = req.headers['user-agent'];
    const url = await this.urlShortsService.expandUrl(short, { ipAddress: ipAddress as string, userAgent })
    res.status(302).redirect(url);
  }
}
