import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  updateMe(@GetUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete('me')
  deleteMe(@GetUser('id') userId: number) {
    return this.userService.deleteUser(userId);
  }
}
