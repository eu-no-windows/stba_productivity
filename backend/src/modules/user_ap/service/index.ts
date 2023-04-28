import { UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../models/dtos';
import { IUser } from '../models/interfaces';
import UserAppRepository from '../models/repository';
import UserApp from '../models/entity/user_app.entity';

export default class UserService {
  async create(user: CreateUserDto): Promise<IUser | undefined> {
    const { email } = user;
    const userWithEmailEqual = await this.getUserByEmail(email);
    if (userWithEmailEqual) {
      return undefined;
    }
    return await UserAppRepository.save(user);
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
    const userExists = this.getUserById(id);
    if (userExists) {
      //conversion rapida de tipo
      const userRemover = {
        ...userExists,
      } as unknown as UserApp;

      await UserAppRepository.remove(userRemover);
      return true;
    }
    return false;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return await UserAppRepository.findOne({ where: { email } });
  }

  // async getAllUser(): Promise<IUser[]> {
  //   return await UserAppRepository.find();
  // }
}
