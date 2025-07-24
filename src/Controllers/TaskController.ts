import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  BadRequestException,
} from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller()
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch('/tasks/:id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    const taskId = Number(id);
    if (isNaN(taskId)) {
      throw new BadRequestException('Invalid task ID');
    }
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle({
      ...dto,
      id: taskId,
    });
  }

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    const taskId = Number(id);
    if (isNaN(taskId)) {
      throw new BadRequestException('Invalid task ID');
    }
    return (await this.useCaseFactory.create(DeleteTask)).handle(taskId);
  }
}
