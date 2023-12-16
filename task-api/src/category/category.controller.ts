import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CategoryService } from './category.service';
import { CategoryDto, UpdateCategoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  postCategory(@Body() dto: CategoryDto, @GetUser('id') userId: number) {
    return this.categoryService.postCategory(dto, userId);
  }

  @Get()
  getAllCategories(@GetUser('id') userId: number) {
    return this.categoryService.getAllCategories(userId);
  }

  @Get(':id')
  getCategory(@Param('id') categoryId: string, @GetUser('id') userId: number) {
    return this.categoryService.getCategory(categoryId, userId);
  }

  @Patch(':id')
  updateCategory(
    @GetUser('id') userId: number,
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(userId, categoryId, dto);
  }

  @Delete(':id')
  deleteCategory(
    @GetUser('id') userId: number,
    @Param('id') categoryId: string,
  ) {
    return this.categoryService.deleteCategory(userId, categoryId);
  }
}
