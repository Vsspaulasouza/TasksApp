import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { notFound } from 'src/utils';
import { TaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  private async findCategories(userId: number, categoriesIds: number[]) {
    return await this.prisma.category.findMany({
      where: { userId, id: { in: categoriesIds } },
    });
  }

  async postTask(dto: TaskDto, userId: number) {
    const { priority, status, title, categoriesIds } = dto;
    const data = { priority, status, title, userId };

    if (categoriesIds) {
      const categories = await this.findCategories(userId, categoriesIds);
      Object.assign(data, { categories: { connect: categories } });
    }

    try {
      const task = await this.prisma.task.create({
        data,
        include: { categories: true },
      });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getAllTasks(userId: number) {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      include: { categories: true },
    });
    return tasks;
  }

  async getTask(taskId: string, userId: number) {
    const numberTaskId = Number(taskId);
    const task = await this.prisma.task.findUnique({
      where: { id: numberTaskId },
      include: { categories: true },
    });

    if (!task) throw new NotFoundException('Task not found');
    if (task.userId !== userId)
      throw new ForbiddenException('This task belongs to another user');
    return task;
  }

  async updateTask(userId: number, taskId: string, dto: UpdateTaskDto) {
    const { priority, status, title, categoriesIds } = dto;
    const data = { priority, status, title, userId };
    const numberTaskId = Number(taskId);
    const disconnectData = {};

    if (categoriesIds) {
      const categories = await this.findCategories(userId, categoriesIds);
      Object.assign(disconnectData, { categories: { set: [] } });
      Object.assign(data, {
        categories: { connect: categories },
      });
    }

    try {
      await this.prisma.task.update({
        data: disconnectData,
        where: { id: numberTaskId, userId },
        include: { categories: true },
      });

      const task = await this.prisma.task.update({
        data,
        where: { id: numberTaskId, userId },
        include: { categories: true },
      });
      return task;
    } catch (error) {
      if (notFound(error)) throw new NotFoundException('Task not found');
      throw error;
    }
  }
}
