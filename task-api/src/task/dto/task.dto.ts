import { Priority, Status } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsIn(Object.keys(Status))
  @IsNotEmpty()
  status: Status;

  @IsIn(Object.keys(Priority))
  @IsNotEmpty()
  priority: Priority;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  categoriesIds?: number[];
}
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsIn(Object.keys(Status))
  @IsNotEmpty()
  status: Status;

  @IsOptional()
  @IsIn(Object.keys(Priority))
  @IsNotEmpty()
  priority: Priority;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  categoriesIds?: number[];
}
