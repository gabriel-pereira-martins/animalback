import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetService],
  controllers: [PetController]
})
export class PetModule {}
