export class CreateUserDto {
  nome: string;
  dataNascimento: Date;
  email: string;
  password: string;
  tipoUsuario: string;
  endereco: string;
  numeroCelular: string;
}
export class UpdateUserDto {
  nome?: string;
  dataNascimento?: Date;
  password?: string;
  tipoUsuario?: string;
  endereco?: string;
  numeroCelular?: string;
}
