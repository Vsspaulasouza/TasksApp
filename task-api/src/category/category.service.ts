import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async postCategory(dto: CategoryDto, userId: number) {
    const data = Object.assign({}, dto, { userId });

    try {
      const category = await this.prisma.category.create({ data });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories(userId: number) {
    const categories = await this.prisma.category.findMany({
      where: {
        userId,
      },
    });
    return categories;
  }

  async getCategory(categoryId: string, userId: number) {
    const numberCategoryId = Number(categoryId);
    const category = await this.prisma.category.findUnique({
      where: { id: numberCategoryId },
    });

    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId)
      throw new ForbiddenException('This category belongs to another user');
    return category;
  }
}
