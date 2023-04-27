import { Request, Response, Router } from 'express';

const routes = Router();
routes.get(
  '/',
  (request: Request, response: Response): Response =>
    response.json({ message: 'bem vindo dev' }).status(200),
);
export default routes;
