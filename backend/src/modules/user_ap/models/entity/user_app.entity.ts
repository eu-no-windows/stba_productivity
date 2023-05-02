import Task from '@modules/task/models/entity/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class UserApp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn()
  dataNascimento: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tipoUsuario: string;

  @Column()
  endereco: string;

  @Column()
  numeroCelular: string;

  @OneToMany(
    () => Task,
    task => {
      task.id;
    },
  )
  tasks: Task[];
}
