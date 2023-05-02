import UserApp from '@modules/user_ap/models/entity/user_app.entity';
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
  idUser: UserApp;
}
