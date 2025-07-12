import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto'; // Using index.ts for DTO imports
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    // The service's create method expects Omit<Todo, 'id' | 'completed'>
    // CreateTodoDto matches this structure (title, description?)
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    try {
      return this.todoService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Re-throw other errors
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    try {
      return this.todoService.update(id, updateTodoDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Re-throw other errors
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK) // Or HttpStatus.NO_CONTENT if preferred, then return void
  remove(@Param('id') id: string): { deleted: boolean; id: string } {
    try {
      return this.todoService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Re-throw other errors
    }
  }
}
