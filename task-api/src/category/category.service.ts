import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { notFound } from 'src/utils';
import { CategoryDto, UpdateCategoryDto } from './dto';

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

  async updateCategory(
    userId: number,
    categoryId: string,
    data: UpdateCategoryDto,
  ) {
    const numberCategoryId = Number(categoryId);

    try {
      const category = await this.prisma.category.update({
        data,
        where: { id: numberCategoryId, userId },
      });
      return category;
    } catch (error) {
      if (notFound(error)) throw new NotFoundException('Category not found');
      throw error;
    }
  }
}
