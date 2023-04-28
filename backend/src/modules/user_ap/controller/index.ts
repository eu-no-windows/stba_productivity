import { Request, Response } from 'express';
import UserService from '../service';

export default class UserCotroller {
  private _userService: UserService;
  constructor() {
    this._userService = new UserService();
  }

  public create = async (request: Request, response: Response) => {
    const user = request.body;
    const userCreated = await this._userService.create(user);
    if (userCreated) {
      return response.json(userCreated).status(201);
    }
    return response
      .json({
        message:
          'could not be created, please check the information if it does not already exist.',
      })
      .status(400);
  };

  public getOne = async (request: Request, response: Response) => {
    const iduser = parseInt(request.params.id);
    const user = await this._userService.getUserById(iduser);
    if (user) {
      return response.json(user).status(200);
    }
    return response.json({ message: 'Not Found' }).status(404);
  };

  public update = async (request: Request, response: Response) => {
    const userID = parseInt(request.params.id);
    const user = request.body;
    const result = await this._userService.update(userID, user);
    if (result) {
      return response.json(user).status(200);
    }
    return response
      .json({ message: 'update was not allowed or resource does not exist' })
      .status(404);
  };

  public delete = async (request: Request, response: Response) => {
    const userId = parseInt(request.params.id);
    const result = await this._userService.delete(userId);
    if (result) {
      return response.status(204);
    }
    return response
      .json({ message: 'delete was not allowed or resource does not exist.' })
      .status(404);
  };
}
