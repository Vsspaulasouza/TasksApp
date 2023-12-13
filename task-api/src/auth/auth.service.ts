import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { isDuplicate } from 'src/utils';
import { AuthDtoLogin, AuthDtoSignUp } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: AuthDtoLogin) {
    const { username, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new ForbiddenException('User not found');

    const passwordMatch = await bcrypt.compare(password, user.hash);

    if (!passwordMatch) throw new ForbiddenException('Credentials incorrect');

    return this.loginToken(user.id, user.username);
  }

  async signup(dto: AuthDtoSignUp) {
    const { name, username, password } = dto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const data = { name, username, hash };

    try {
      const user = await this.prisma.user.create({ data });
      return this.loginToken(user.id, user.username);
    } catch (error) {
      if (isDuplicate(error))
        throw new ForbiddenException('Duplicate username');
      throw error;
    }
  }

  async loginToken(userId: number, username: string) {
    const payload = { sub: userId, username };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return { access_token: token };
  }
}
