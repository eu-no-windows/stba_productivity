import { UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../models/dtos';
import { IUser } from '../models/interfaces';
import UserAppRepository from '../models/repository';
import UserApp from '../models/entity/user_app.entity';
import { compare, hash } from 'bcryptjs';

export default class UserService {
  async create(user: CreateUserDto): Promise<IUser | undefined> {
    const { email, password } = user;
    const userWithEmailEqual = await this.getUserByEmail(email);
    if (userWithEmailEqual) {
      return undefined;
    }
    const passwordencrypt = await hash(password, 9);
    const userCripted = {
      ...user,
      password: passwordencrypt,
    };
    return await UserAppRepository.save(userCripted);
  }

  async getUserById(id: number): Promise<IUser | null> {
    return await UserAppRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateUser: UpdateUserDto,
  ): Promise<UpdateResult | undefined> {
    const userExists = this.getUserById(id);
    if (userExists) {
      return await UserAppRepository.update({ id }, updateUser);
    }
    return undefined;
  }

  async delete(id: number): Promise<boolean> {
    const userExists = await this.getUserById(id);
    if (userExists) {
      await UserAppRepository.remove(userExists);
      return true;
    }
    return false;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return await UserAppRepository.findOne({ where: { email } });
  }

  async verifiPassword(
    email: string,
    passwordUser: string,
  ): Promise<IUser | undefined> {
    const userExist = await this.getUserByEmail(email);
    if (userExist) {
      const userCorret = await compare(passwordUser, userExist.password);
      if (userCorret) {
        return userExist;
      }
      return undefined;
    }
    return undefined;
  }

  // async getAllUser(): Promise<IUser[]> {
  //   return await UserAppRepository.find();
  // }
}
