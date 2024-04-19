import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from 'src/model/user.model';
import { UserValidate } from './user.validation';
import * as bcrypt from 'bcrypt';
import { v4 as uuid} from 'uuid';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private prismaService: PrismaService,
  ) {}

  // function to register new user
  async Register(request: RegisterUserRequest): Promise<UserResponse> {
    this.logger.debug(`Register new user ${JSON.stringify(request)}`);
    const registerRequest = this.validationService.validate(
      UserValidate.Register,
      request,
    );
    const totalUserWithSameUsername = await this.prismaService.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername > 0) {
      throw new HttpException('User with same username already exists', 400);
    }

    request.password = await bcrypt.hash(request.password, 10);

    const user = await this.prismaService.user.create({
      data: request,
    })

    return {
        username: user.username,
        email: user.email,
    };
  }

  // function to login user
  async Login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.debug(`Login user ${JSON.stringify(request)}`);
    const loginRequest = this.validationService.validate(
      UserValidate.Login,
      request,
    );

    let user = await this.prismaService.user.findFirst({
      where: {
        username: loginRequest.username
      }
    })

    if (!user) {
      throw new HttpException('username or password is incorrect', 401);
    }

    const isMatch = await bcrypt.compare(loginRequest.password, user.password);

    if (!isMatch) {
      throw new HttpException('username or password is incorrect', 401);
    }
    
    user = await this.prismaService.user.update({
      where: {
        username: user.username
      },
      data: {
        token: uuid()
      }
    })
    return {
        username: user.username,
        email: user.email,
        token: user.token
    }
  }

  // function to delete user logout

  async deleteToken(user: User) {
    await this.prismaService.user.update({
      where: {
        username: user.username
      },
      data: {
        token: null
      }
    })

    return {
      success: true
    }
  }
}
