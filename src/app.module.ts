import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { PetModule } from './pet/pet.module';
import { Pet } from './pet/pet.entity';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Diretório onde os arquivos serão armazenados
      serveRoot: '/public', // Prefixo que você quer para o acesso via URL
    }),
  ],
})
export class AppModule {}
