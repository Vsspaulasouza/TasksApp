import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userId: number, data: UpdateUserDto) {
    const user = await this.prisma.user.update({ data, where: { id: userId } });
    delete user.hash;

    return user;
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
    return 'User deleted';
  }
}
