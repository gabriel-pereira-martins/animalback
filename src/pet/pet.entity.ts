import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pet') // Nome da tabela
export class Pet {
  @PrimaryGeneratedColumn() // Gerar o ID automaticamente
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;
}
