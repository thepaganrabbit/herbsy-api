import { ForbiddenException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User, PublicUser } from './../types/index';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { v4 } from 'uuid';

describe('UserController', () => {
  let controller: UserController;
  const userServiceMock = {
    signup: null,
    login: null,
  };
  let testUser: User = {
    id: 2,
    full_name: 'tom',
    email: 'tom@tom.com',
    password: 'tommy',
    createdOn: new Date(),
  };
  const testLogin = {
    email: testUser.email,
    password: testUser.password
  }
  const testPublicUser: PublicUser = {
    user_id: v4(),
    full_name: testUser.full_name,
    token: '92302393903209'
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).overrideProvider(UserService)
    .useValue(userServiceMock).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should sign user up and return a payload', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testPublicUser);
    userServiceMock.signup = mock;
    const response = await controller.userSignup(testUser);
    expect(mock).toHaveBeenCalled();
    expect(response.payload).toEqual(testPublicUser)
    userServiceMock.signup = null;
  });
  it('should not sign user up and return a error', async () => {
    const mock = jest.fn().mockImplementationOnce(() => {
      throw new BadRequestException()
    });
    userServiceMock.signup = mock;
    const res = await controller.userSignup(testUser);
    expect(res.message).toContain('failed')
  });
  it('should fail to sign user up fail', async () => {
    const mock = jest.fn().mockRejectedValueOnce(null);
    try {
      userServiceMock.signup = mock;
      await controller.userSignup(null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(mock).toHaveBeenCalled();
    }
  });
  it('should log user in and return a payload', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testPublicUser);
    userServiceMock.login = mock;
    const response = await controller.userLogin(testLogin);
    expect(mock).toHaveBeenCalled();
    expect(response.payload).toEqual(testPublicUser)
    userServiceMock.signup = null;
  });
  it('should fail to log user in and return a payload', async () => {
    const mock = jest.fn().mockImplementationOnce(() => {
      throw new BadRequestException()
    });
    userServiceMock.signup = mock;
    const res = await controller.userLogin(testLogin);
    expect(res.message).toContain('failed')
  });
  it('should fail log user in and return a error', async () => {
    const mock = jest.fn().mockRejectedValueOnce(null);
    try {
      userServiceMock.signup = mock;
      await controller.userLogin(null);
    } catch (error) {
      expect(error).toBeDefined();
      expect(mock).toHaveBeenCalled();
    }
  });
});
