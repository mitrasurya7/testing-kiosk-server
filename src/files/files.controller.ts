import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import * as path from 'path';

@Controller('/api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':fileName')
  async getFile(@Res() res: Response, @Param('fileName') fileName: string) {
    // Tentukan path ke file
    const filePath = path.join(__dirname, '../../files', fileName);

    // Panggil method getFile dari FilesService
    this.filesService.getFile(filePath, res);
  }
}