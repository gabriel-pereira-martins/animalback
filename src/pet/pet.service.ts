import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pets } from './pets.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pets)
    private petsRepository: Repository<Pets>,
  ) {}

  // Criar um novo pet
  async createPet(name: string, image: string, description: string): Promise<Pets> {
    const pet = this.petsRepository.create({ name, image, description });
    return await this.petsRepository.save(pet);
  }

  // Obter todos os pets
  async findAllPets(): Promise<Pets[]> {
    return this.petsRepository.find();
  }

  // Obter um pet pelo ID
  async findPetById(id: number): Promise<Pets> {
    const pet = await this.petsRepository.findOne(id);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }

  // Atualizar um pet
  async updatePet(id: number, name: string, image: string, description: string): Promise<Pets> {
    const pet = await this.petsRepository.findOne(id);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    pet.name = name;
    pet.image = image;
    pet.description = description;

    return this.petsRepository.save(pet);
  }

  // Deletar um pet
  async deletePet(id: number): Promise<void> {
    const result = await this.petsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Pet not found');
    }
  }
}
