import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { S3Service } from './s3.service'; // Importando o S3Service


@Injectable()
export class UploadService {
  private s3 = new AWS.S3();

  async uploadToS3(file: Express.Multer.File): Promise<string> {
    const s3Bucket = 'lotionpet'; // Substitua pelo seu nome do bucket S3
    const s3Region = 'us-east-2'; // Substitua pela sua região do bucket
    const s3Url = `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/`;

    const params: S3.PutObjectRequest = {
      Bucket: s3Bucket,
      Key: `uploads/${Date.now()}_${file.originalname}`, // Nome único para o arquivo
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', // Permite o acesso público
    };

    // Enviar para o S3
    await this.s3.putObject(params).promise();

    // Retornar a URL pública da imagem
    return `${s3Url}uploads/${Date.now()}_${file.originalname}`;
  }
}
