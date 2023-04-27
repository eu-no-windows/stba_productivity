import {
  Column,
  CreateDateColumn,
  Entity,
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
}
