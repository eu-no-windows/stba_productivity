export class CreateTaskDto {
  nome: string;
  dataCriacao: Date;
  descricao: string;
  idUser: number;
}
export class UpdateTaskDto {
  nome?: string;
  dataCriacao?: Date;
  descricao?: string;
}
