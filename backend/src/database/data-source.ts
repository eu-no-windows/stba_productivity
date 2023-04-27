import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CreateTableUser1682634832023 } from './migrations/1682634832023-CreateTableUser';
import { CreateTableTask1682634841022 } from './migrations/1682634841022-CreateTableTask';
import UserApp from '@modules/user_ap/models/entity/user_app.entity';
import Task from '@modules/task/models/entity/task.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [UserApp, Task],
  migrations: [CreateTableUser1682634832023, CreateTableTask1682634841022],
  subscribers: [],
});
