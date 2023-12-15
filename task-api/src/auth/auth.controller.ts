import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AuthDtoLogin, AuthDtoSignUp, AuthDtoUpdate } from './dto';
import { JwtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDtoLogin) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: AuthDtoSignUp) {
    return this.authService.signup(dto);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  updateCredentials(@GetUser('id') userId: number, @Body() dto: AuthDtoUpdate) {
    return this.authService.updateCredentials(userId, dto);
  }
}
