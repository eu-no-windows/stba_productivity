import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableTask1682634841022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'dataCriacao',
            type: 'timestamp',
          },
          {
            name: 'descricao',
            type: 'text',
          },
          {
            name: 'idUser',
            type: 'int',
            isUnique: true,
          },
        ],
      }),
    );

    const foreignKey = new TableForeignKey({
      columnNames: ['idUser'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user_app',
      onDelete: 'CASCADE',
    });
    await queryRunner.createForeignKey('taskedss', foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task');
  }
}
