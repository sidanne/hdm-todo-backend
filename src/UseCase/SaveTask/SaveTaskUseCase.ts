import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';
import SaveTaskDto from './SaveTaskDto';

@Injectable()
export default class SaveTaskUseCase
  implements UseCase<Promise<Task>, [dto: SaveTaskDto]>
{
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    try {
      const { id, name } = dto;

      // Si on a un id, on met à jour
      if (id) {
        return this.taskRepository.save({ id, name });
      }
      // Sinon on crée
      return this.taskRepository.save({ name });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
