import { Body, Controller, HttpCode, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service'; 
import { WebResponse } from '../model/web.model';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from '../model/user.model';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async Register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
      const response = await this.userService.Register(request);
      return {
          data: response
      }
  }

  @Post('/login')
  @HttpCode(200)
  async Login(@Body() request: LoginUserRequest): Promise<WebResponse<UserResponse>> {
      const response = await this.userService.Login(request);
      return {
          data: response
      }
  }
  
  @Delete('/logout')
  async Logout(@Auth() user: User): Promise<WebResponse<UserResponse | boolean>> {
      const response = await this.userService.deleteToken(user);
      return {
          data: response.success
      }
  }
}
