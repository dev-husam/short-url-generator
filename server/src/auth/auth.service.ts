import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(email: string, password: string): Promise<{ token: string, user: UserDocument }> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return { token, user };
  }

  async registerUser(email: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.createUser(email, hashedPassword);

    if (!user) throw new HttpException("invalid request", HttpStatus.BAD_REQUEST)
    const token = this.jwtService.sign({ userId: user._id, email: user.email });

    return { token, user };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
