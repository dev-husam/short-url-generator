// user/user.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }


}
