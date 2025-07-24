import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async save(data: { id?: number; name: string }): Promise<Task> {
    if (data.id === null || data.id === undefined) {
      // Création : on retire l'id du payload
      const { id, ...createData } = data;
      return this.prisma.task.create({ data: createData });
    }

    // Mise à jour
    const { id, ...updateData } = data;
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }
}
