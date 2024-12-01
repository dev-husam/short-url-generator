import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Register the user by delegating to AuthService
    const authedObj = await this.authService.registerUser(email, password);

    return { userId: authedObj.user._id, token: authedObj.token };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Authenticate the user and return a JWT token
    const result = await this.authService.validateUser(email, password);

    return result;
  }

}
