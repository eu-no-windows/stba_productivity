import { Request, Response } from 'express';
import SessionService from '../service/session';

export default class SessionController {
  private _sessinService: SessionService;
  constructor() {
    this._sessinService = new SessionService();
  }
  create = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    const { user, token } = await this._sessinService.criarServicoSessao(
      email,
      password,
    );
    if (token) {
      return response.status(200).json({ user, token });
    }
    return response
      .status(401)
      .json({ message: 'Incorret email/password combination' });
  };
}
