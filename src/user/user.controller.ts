import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { LoginType, UserType } from './model/user.entity';
import { UserService } from './user.service';
// import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService, // private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginType) {
    return this.userService.login(body);
  }

  @Put('create')
  async create(@Body() body: UserType) {
    return this.userService.create(body);
  }

  @Put(':id')
  async update() {
    return this.userService.update();
  }

  @Delete()
  async delete() {
    return this.userService.delete();
  }
}
