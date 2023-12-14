import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

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
}
