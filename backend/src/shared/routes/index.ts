import TaskController from '@modules/task/controller';
import UserCotroller from '@modules/user_ap/controller';
import { Request, Response, Router } from 'express';

const userController = new UserCotroller();
const taskController = new TaskController();
const routes = Router();
routes.get(
  '/',
  (request: Request, response: Response): Response =>
    response
      .json({
        resources: [
          {
            user: {
              POST: '/api/v1/user',
              GET_ONE: '/api/v1/user/:id',
              PATCH: '/api/v1/user/:id',
              DELETE: '/api/v1/user/:id',
            },
          },
          {
            task: {
              GET: '/api/v1/task',
              POST: '/api/v1/task',
              GET_ONE: '/api/v1/task/:id',
              PATCH: '/api/v1/task/:id',
              DELETE: '/api/v1/task/:id',
              COUNT: '/api/v1/task/:id',
              GET_ALL_TASK_USER: '/api/v1/task/user/:id',
            },
          },
        ],
      })
      .status(200),
);

//Routes of User
routes.post('/api/v1/user', userController.create);
routes.get('/api/v1/user/:id', userController.getOne);
routes.patch('/api/v1/user/:id', userController.update);
routes.delete('/api/v1/user/:id', userController.delete);

//Routes od Tasks
routes.get('/api/v1/task', taskController.get);
routes.post('/api/v1/task', taskController.create);
routes.get('/api/v1/task/:id', taskController.getOne);
routes.patch('/api/v1/task/:id', taskController.update);
routes.delete('/api/v1/task/:id', taskController.delete);
routes.get('/api/v1/task/:id', taskController.countTask);
routes.get('/api/v1/task/user/:id', taskController.getTaskUser);

export default routes;
