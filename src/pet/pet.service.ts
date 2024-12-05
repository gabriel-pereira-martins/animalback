import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}


  async createPet(name: string, image: string, description: string): Promise<Pet> {
    const pet = this.petsRepository.create({ name, image, description });
    return await this.petsRepository.save(pet);
  }


  async findAllPets(): Promise<Pet[]> {
    return this.petsRepository.find();
  }


  async findPetById(id): Promise<Pet> {
    const pet = await this.petsRepository.findOne(id);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    return pet;
  }


  async updatePet(id, name: string, image: string, description: string): Promise<Pet> {
    const pet = await this.petsRepository.findOne(id);
    if (!pet) {
      throw new NotFoundException('Pet not found');
    }
    pet.name = name;
    pet.image = image;
    pet.description = description;

    return this.petsRepository.save(pet);
  }


  async deletePet(id: number): Promise<void> {
    const result = await this.petsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Pet not found');
    }
  }
}
