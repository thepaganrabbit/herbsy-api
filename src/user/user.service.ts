import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';

import { UserEntity } from './../models/user.entity';
import { User, LogInCredentials, PublicUser } from './../types/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: LogInCredentials): Promise<PublicUser> {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (!foundUser) throw new BadRequestException('failed to locate user');
      const isMatch = await compare(user.password, foundUser.passowrd);
      if (!isMatch) throw new ForbiddenException('Unable to log you in');
      const token = this.jwtService.sign(
        { full_name: foundUser.full_name, user_id: foundUser.user_id },
        { expiresIn: '2h' },
      );
      return {
        full_name: foundUser.full_name,
        user_id: foundUser.user_id,
        token,
      };
    } catch (error) {}
  }
  async signup(incomingUser: User): Promise<PublicUser> {
    try {
      const userDTO: User = {
        user_id: v4(),
        full_name: incomingUser.full_name,
        password: await hash(incomingUser.password, 10),
        email: incomingUser.email,
        createdOn: new Date(),
      };

      const user = await this.userRepository.save(userDTO);
      if (!user) {
        throw new ForbiddenException(
          'Failed to sign up, please check credentials.',
        );
      }
      const token = this.jwtService.sign(
        { full_name: user.full_name, user_id: user.user_id },
        { expiresIn: '2h' },
      );
      return {
        full_name: user.full_name,
        user_id: user.user_id,
        token,
      };
    } catch (error) {
      throw new ForbiddenException(
        'Failed to sign up, please check credentials.',
      );
    }
  }
}
