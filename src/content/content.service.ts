import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Logger } from 'winston';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ContentResponse, CreateContentRequest } from '../model/content.model';
import { ContentValidation } from './content.validation';
import { ValidationService } from 'src/common/validation.service';
import { PrismaService } from 'src/common/prisma.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class ContentService {
  constructor(
    private readonly prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async CreateContent(
    createContentRequest: CreateContentRequest,
    userId: number,
    file: Express.Multer.File,
  ): Promise<ContentResponse> {
    this.logger.info('CreateContent: ' + JSON.stringify(createContentRequest));
    this.validationService.validate(
      ContentValidation.Create,
      createContentRequest,
    );

    if (!file) {
      throw new BadRequestException('File not found');
    }

    try {
      // Generate unique file name using UUID
      const ext = path.extname(file.originalname);
      const fileName = `${uuidv4()}${ext}`;

      // Define storage directory
      const storageDir = path.join(__dirname, '../../files');

      // Check if the storage directory exists, if not, create it
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir, { recursive: true });
      }

      // Define the file path
      const filePath = path.join(storageDir, fileName);

      // Move the uploaded file to the storage directory
      fs.renameSync(file.path, filePath);

      // Save content data to the database
      const content = await this.prismaService.content.create({
        data: {
          title: fileName,
          type: ext,
          userId: userId,
          url: `${process.env.BACKEND_URL}/api/files/${fileName}`, // Store the full file path in the database
          templateId: null,
        },
      });

      return content;
    } catch (error) {
      this.logger.error('Failed to create content: ' + error);
      throw new InternalServerErrorException('Failed to create content');
    }
  }

  async findAll(): Promise<ContentResponse[]> {
    return this.prismaService.content.findMany();
  }

  async findById(id: number): Promise<ContentResponse> {
    return this.prismaService.content.findUnique({ where: { id: Number(id) } });
  }
}
