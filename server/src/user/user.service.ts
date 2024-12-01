import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.model';


@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }


  async createUser(email: string, hashedPassword: string): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    return !!user;
  }
}
