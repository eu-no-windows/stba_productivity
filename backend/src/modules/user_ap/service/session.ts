import UserService from '.';
import { sign } from 'jsonwebtoken';
import { IUser } from '../models/interfaces';
import secrets from './secrets';

export interface IResponse {
  user: IUser;
  token: string;
}
export default class SessionService {
  private _userService: UserService;
  constructor() {
    this._userService = new UserService();
  }

  criarServicoSessao = async (email: string, password: string) => {
    const user = await this._userService.verifiPassword(email, password);
    const token = sign({}, secrets.key, {
      subject: user.id.toString(),
      expiresIn: '1d',
    });
    if (!user) {
      return undefined;
    }
    return { user, token };
  };
}
