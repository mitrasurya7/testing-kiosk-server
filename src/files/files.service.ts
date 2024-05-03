import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  getFile(filePath: string, res: Response): void {
    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    // Tentukan tipe konten berdasarkan ekstensi file
    const contentType = this.getContentType(filePath);
    // Set header untuk menentukan jenis konten
    res.setHeader('Content-Type', contentType);

    // Buka file sebagai stream
    const stream = fs.createReadStream(filePath);

    // Pipe stream ke respons HTTP
    stream.pipe(res);
  }

  // Fungsi untuk menentukan tipe konten berdasarkan ekstensi file
  private getContentType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.mp4':
        return 'video/mp4';
      case '.mp3':
        return 'audio/mpeg';
      case '.jpg':
        return 'image/jpg';
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      // Tambahkan jenis konten lain sesuai kebutuhan
      default:
        return 'application/octet-stream'; // Default content type
    }
  }
}
