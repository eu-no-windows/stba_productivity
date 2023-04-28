import { Request, Response } from 'express';
import TaskService from '../service';

export default class TaskController {
  private _taskService: TaskService;
  constructor() {
    this._taskService = new TaskService();
  }

  public create = async (request: Request, response: Response) => {
    const task = request.body;
    const taskCreated = await this._taskService.create(task);
    if (taskCreated) {
      return response.json(taskCreated).status(201);
    }
    return response
      .json({
        message:
          'could not be created, please check the information if it does not already exist.',
      })
      .status(400);
  };

  public get = async (request: Request, response: Response) => {
    const tasklist = await this._taskService.getAllTask;
    return response.json(tasklist).status(200);
  };

  public getOne = async (request: Request, response: Response) => {
    const idTask = parseInt(request.params.id);
    const task = await this._taskService.getTaskById(idTask);
    if (task) {
      return response.json(task).status(200);
    }
    return response.json({ message: 'Not Found' }).status(404);
  };

  public update = async (request: Request, response: Response) => {
    const taskId = parseInt(request.params.id);
    const task = request.body;
    const result = await this._taskService.update(taskId, task);
    if (result) {
      return response.json(task).status(200);
    }
    return response
      .json({ message: 'update was not allowed or resource does not exist' })
      .status(404);
  };

  public delete = async (request: Request, response: Response) => {
    const taskId = parseInt(request.params.id);
    const result = await this._taskService.delete(taskId);
    if (result) {
      return response.status(204);
    }
    return response
      .json({ message: 'delete was not allowed or resource does not exist.' })
      .status(404);
  };

  public countTask = async (request: Request, response: Response) => {
    const taskId = parseInt(request.params.id);
    const result = await this._taskService.countAllTaskById(taskId);
    return response.json(result).status(200);
  };
  public getTaskUser = async (request: Request, response: Response) => {
    const idUser = parseInt(request.params.id);
    const tasks = await this._taskService.getAllTaskUserById(idUser);
    return response.json(tasks).status(200);
  };
}
