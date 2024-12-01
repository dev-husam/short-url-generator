import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type URLShortsDocument = HydratedDocument<URLShorts>;

@Schema({ timestamps: true })
export class URLShorts {
    @Prop({ required: true })
    originalUrl: string;

    @Prop({ required: true, unique: true })
    shortUrl: string;

    @Prop({ type: Date, required: true })
    expirationDate: Date;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ default: 0 })
    totalClicks: number;
}

export const URLShortsSchema = SchemaFactory.createForClass(URLShorts);
