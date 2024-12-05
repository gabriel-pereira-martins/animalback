// src/upload/s3.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import multer from 'multer';

@Injectable()
export class S3Service {
  // Configurando o multer para salvar o arquivo localmente
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', '..', 'public')); // Salvar na pasta public
    },  
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Nome único para o arquivo
    },
  });

  private upload = multer({ storage: this.storage });

  // Método para fazer o upload e retornar a URL do arquivo
  async uploadFile(file: Express.Multer.File): Promise<string> {
    console.log('aqui tem que estar o file')
    console.log(file)
    const filePath = path.join('public', file.filename); // Caminho do arquivo
    console.log('Arquivo salvo em:', filePath);

    // Retorna a URL do arquivo no servidor local
    return `http://localhost:3010/${filePath}`; // Exemplo de URL do arquivo
  }
}
