import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';

@Controller('pet')
export class PetController {
  constructor(private readonly PetService: PetService) {}

  // Criar pet
  @Post()
  async create(@Body() body: { name: string; image: string; description: string }): Promise<Pet> {
    return this.PetService.createPet(body.name, body.image, body.description);
  }

  // Listar todos os Pet
  @Get()
  async findAll(): Promise<Pet[]> {
    return this.PetService.findAllPets();
  }

  // Buscar pet por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pet> {
    return this.PetService.findPetById(id);
  }

  // Atualizar pet
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name: string; image: string; description: string }): Promise<Pet> {
    return this.PetService.updatePet(id, body.name, body.image, body.description);
  }

  // Deletar pet
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.PetService.deletePet(id);
  }
}
