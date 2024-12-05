// src/upload/upload.controller.ts

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service'; // Importando o S3Service

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // Usando o FileInterceptor para tratar o upload
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ imageUrl: string }> {
    try {
      const imageUrl = await this.s3Service.uploadFile(file); // Faz o upload local
      return { imageUrl }; // Retorna a URL do arquivo
    } catch (error) {
      console.log('Erro ao fazer uploadddddddd:', error);
      throw new Error('Erro ao fazer o upload da imagem');
    }
  }
}
