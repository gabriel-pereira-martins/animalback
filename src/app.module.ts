import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { PetModule } from './pet/pet.module';
import { Pet } from './pet/pet.entity';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 8002,
      username: 'root', // Altere para o usuário do seu banco
      password: 'root', // Altere para a senha do seu banco
      database: 'animalLotions',
      entities: [User, Pet],
      synchronize: true, // Não use em produção! Sincroniza as entidades com o banco.
    }),
    UserModule,
    PetModule,
    UploadModule,
  ],
})
export class AppModule {}
