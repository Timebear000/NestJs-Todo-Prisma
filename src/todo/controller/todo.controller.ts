import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '@prisma/client';
@Controller('api/v1/todo')
export class TodoController {
  private logger = new Logger('TodoController');
  constructor(private readonly todoService: TodoService) {}

  // 전체 조회
  @Get()
  async fetchAllTodos(): Promise<Todo[]> {
    return this.todoService.fetchAllTodos();
  }

  // 단일 조회
  @Get(':id')
  async fetchTodoItem(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.fetchTodoItem(id);
  }
  // 단일 삭제
  @Delete(':id')
  async deleteTodoItem(@Param('id') id: number): Promise<Todo | null> {
    return this.todoService.deleteTodoItem(id);
  }

  // 단일 추가
  @Post()
  async addTodoItem(@Body() data: Todo): Promise<Todo> {
    return this.todoService.addTodoItem(data);
  }
  // 단일 수정
  @Put(':id')
  async updateTodoItem(
    @Param('id') id: number,
    @Body() data: Todo,
  ): Promise<Todo> {
    return this.todoService.updateTodoItem(
      id,
      data.title,
      data.content,
      data.is_done,
    );
  }
}
