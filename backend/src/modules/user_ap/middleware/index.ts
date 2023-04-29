import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import secrets from '../service/secrets';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeaderExist = request.headers.authorization;
  if (!authHeaderExist) {
    throw new Error('jwt token is missing');
  }
  // Bearrer,token
  const [, token] = authHeaderExist.split(' ');

  try {
    const decodedToken = verify(token, secrets.key);
    const { sub } = decodedToken as ITokenPayload;
    request.user = {
      id: parseInt(sub),
    };
    return next();
  } catch (error) {
    response.json({ message: 'Invalid jwt' });
    throw new Error('Invalid jwt');
  }
}
