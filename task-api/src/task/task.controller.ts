import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { TaskDto, UpdateTaskDto } from './dto';
import { TaskService } from './task.service';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  postCategory(@Body() dto: TaskDto, @GetUser('id') userId: number) {
    return this.taskService.postTask(dto, userId);
  }

  @Get()
  getAllCategories(@GetUser('id') userId: number) {
    return this.taskService.getAllTasks(userId);
  }

  @Get(':id')
  getCategory(@Param('id') taskId: string, @GetUser('id') userId: number) {
    return this.taskService.getTask(taskId, userId);
  }

  @Patch(':id')
  updateTask(
    @GetUser('id') userId: number,
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(userId, taskId, dto);
  }
}

// TODO: Atualizar tasks
// TODO: Deletar usuário, categorias e tasks
