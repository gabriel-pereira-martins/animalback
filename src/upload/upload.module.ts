// src/upload/upload.module.ts

import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadController } from './upload.controller'; // Importando o UploadController

@Module({
  providers: [S3Service],
  controllers: [UploadController], // Registrando o controlador
})
export class UploadModule {}
