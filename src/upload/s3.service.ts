// src/upload/s3.service.ts

import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class S3Service {
  private s3 = new AWS.S3();
  
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Defina no seu .env
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Defina no seu .env
      region: 'us-east-2', // Região do seu bucket
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: 'lotionpet', // Nome do seu bucket
      Key: `${Date.now()}-${file.originalname}`, // Nome único para o arquivo
      Body: fileStream,
      ContentType: file.mimetype,
      ACL: 'public-read', // Define a permissão de leitura pública
    };

    try {
      const result = await this.s3.upload(uploadParams).promise();
      return result.Location; // Retorna a URL da imagem
    } catch (error) {
      console.error('Erro ao fazer upload para o S3', error);
      throw new Error('Erro ao fazer upload para o S3');
    }
  }
}
