import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pets') // Nome da tabela
export class Pets {
  @PrimaryGeneratedColumn() // Gerar o ID automaticamente
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;
}
