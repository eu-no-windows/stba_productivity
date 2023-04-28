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
    const taskExists = this.getTaskById(id);
    if (taskExists) {
      //conversion rapida de tipo
      const taskRemover = {
        ...taskExists,
      } as unknown as Task;

      await TaskRepository.remove(taskRemover);
      return true;
    }
    return false;
  }

  async getAllTaskById(id: number): Promise<ITask[] | null> {
    return await TaskRepository.find({ where: { id } });
  }

  async countAllTaskById(id: number): Promise<number> {
    return await TaskRepository.countBy({ id });
  }
}
