import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser(username: string) {
    await this.prismaService.user.deleteMany({
      where: {
        username,
      },
    });
  }

  async RegisterUser(username: string) {
    await this.prismaService.user.create({
      data: {
        username,
        email: `${username}@mail.com`,
        password: await bcrypt.hash('password', 10),
        role: 'admin',
        locationId: 3,
      },
    });
  }

  async LoginUser(username: string) {
    const user = await this.prismaService.user.update({
      where: {
        username,
      },
      data: {
        token: uuidv4(),
      },
    });
  }

  async getToken(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
    return user.token;
  }

  async deleteTemplate(name: string) {
    await this.prismaService.template.deleteMany({
      where: {
        name,
      },
    });
  }
}
