import { UserService } from './user.service';
import {
  User,
  ApiResponse,
  PublicUser,
  LogInCredentials,
} from './../types/index';
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async userSignup(
    @Body() incomingUser: User,
  ): Promise<ApiResponse<PublicUser>> {
    try {
      const user = await this.userService.signup(incomingUser);
      return {
        payload: user,
        message: `Success: ${incomingUser.full_name} is now a user.`,
      };
    } catch (error) {
      return {
        payload: null,
        message: `${incomingUser.full_name} failed to be added to system.`,
        error,
      };
    }
  }
  @Post('login')
  async userLogin(
    @Body() incomingUser: LogInCredentials,
  ): Promise<ApiResponse<PublicUser>> {
    try {
      const user = await this.userService.login(incomingUser);
      return {
        payload: user,
        message: `Success: ${user.full_name} is logged in.`,
      };
    } catch (error) {
      return {
        payload: null,
        message: `User failed to login, please check credentials.`,
      };
    }
  }
}
