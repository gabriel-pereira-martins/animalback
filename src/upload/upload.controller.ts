// src/upload/upload.controller.ts

import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service'; // Importando o S3Service

@Controller('upload')
export class UploadController {
  constructor(private readonly s3Service: S3Service) {}

  // Endpoint para o upload de imagens
  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // Usando o FileInterceptor para tratar o upload
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ imageUrl: string }> {
    try {
      // Faz o upload da imagem para o S3 e obtém a URL
      const imageUrl = await this.s3Service.uploadFile(file);
      
      // Retorna a URL da imagem para o frontend
      return { imageUrl };
    } catch (error) {
      throw new Error('Erro ao fazer o upload da imagem');
    }
  }
}
