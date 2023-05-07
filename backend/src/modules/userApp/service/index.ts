import { UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../models/dtos';
import UserAppRepository from '../models/repository';
import { compare, hash } from 'bcryptjs';
import UserApp from '../models/entity';

export default class UserService {
  async create(user: CreateUserDto): Promise<UserApp | undefined> {
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

  async getUserById(id: number): Promise<UserApp | null> {
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

  async getUserByEmail(email: string): Promise<UserApp> {
    return await UserAppRepository.findOne({ where: { email } });
  }

  async verifiPassword(
    email: string,
    passwordUser: string,
  ): Promise<UserApp | undefined> {
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

  // async getAllUser(): Promise<User[]> {
  //   return await UserAppRepository.find();
  // }
}
