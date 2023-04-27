import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  idUser: number;
}
