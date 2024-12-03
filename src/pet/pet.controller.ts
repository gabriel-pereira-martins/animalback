import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PetsService } from './pet.service';
import { Pets } from './pets.entity';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  // Criar pet
  @Post()
  async create(@Body() body: { name: string; image: string; description: string }): Promise<Pets> {
    return this.petsService.createPet(body.name, body.image, body.description);
  }

  // Listar todos os pets
  @Get()
  async findAll(): Promise<Pets[]> {
    return this.petsService.findAllPets();
  }

  // Buscar pet por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pets> {
    return this.petsService.findPetById(id);
  }

  // Atualizar pet
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name: string; image: string; description: string }): Promise<Pets> {
    return this.petsService.updatePet(id, body.name, body.image, body.description);
  }

  // Deletar pet
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.petsService.deletePet(id);
  }
}
