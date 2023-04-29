import { UpdateResult } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../models/dtos';
import { ITask } from '../models/interfaces';
import TaskRepository from '../models/repository';
import Task from '../models/entity/task.entity';

export default class TaskService {
  async create(task: CreateTaskDto): Promise<ITask> {
    return await TaskRepository.save(task);
  }

  async getTaskById(id: number): Promise<ITask | null> {
    return await TaskRepository.findOne({ where: { id } });
  }

  async getAllTask(): Promise<ITask[]> {
    return await TaskRepository.find();
  }

  async update(
    id: number,
    updateTask: UpdateTaskDto,
  ): Promise<UpdateResult | undefined> {
    const taskExists = this.getTaskById(id);
    if (taskExists) {
      return await TaskRepository.update({ id }, updateTask);
    }
    return undefined;
  }

  async delete(id: number): Promise<boolean> {
    const taskExists = await this.getTaskById(id);
    if (taskExists) {
      await TaskRepository.remove(taskExists);
      return true;
    }
    return false;
  }

  async getAllTaskUserById(idUser: number): Promise<ITask[]> {
    return await TaskRepository.find({ where: { idUser } });
  }

  async countAllTaskById(id: number): Promise<number> {
    return await TaskRepository.countBy({ id });
  }
}
