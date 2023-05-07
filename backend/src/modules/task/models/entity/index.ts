import UserApp from '@modules/userApp/models/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @Column()
  descricao: string;

  @ManyToOne(() => UserApp, user => user.id)
  idUser: UserApp | number;
}
