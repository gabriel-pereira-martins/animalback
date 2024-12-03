import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      return {
        success: false,
        message: 'Email ou senha inválidos!',
      };
    }

    return {
      success: true,
      message: 'Login bem-sucedido!',
      user,
    }
}}
