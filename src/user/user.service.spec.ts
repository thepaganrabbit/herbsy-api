import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../models/user.entity';
import { User } from './../types/index';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

// jest.mock('bcyrpt', () => ({
//   compare: jest.fn()
// }))

describe('UserService', () => {
  let service: UserService;
  let entityMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // update: jest.fn(), // eventually will add password reset
  };

  const jwtMock = {
    sign: jest.fn(),
  };

  let testUser: User = {
    id: 2,
    full_name: 'tom',
    email: 'tom@tom.com',
    password: 'tommy',
    createdOn: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: entityMock,
        },
      ],
    })
      .overrideProvider(JwtService)
      .useValue(jwtMock)
      .compile();

    service = module.get<UserService>(UserService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signs a user up', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testUser);
    entityMock.save = mock;
    await service.signup(testUser);
    expect(mock).toHaveBeenCalled();
  });
  it('fails to sign a user up if save failes', async () => {
    try {
      const mock = jest.fn().mockResolvedValueOnce(null);
      entityMock.save = mock;
      await service.signup(testUser);
      expect(mock).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Failed');
    }
  });
  it('signs a user up and returns token', async () => {
    const mock = jest.fn().mockResolvedValueOnce(testUser);
    entityMock.save = mock;
    let testToken = 'jjfjffuf';
    const jwt_mock = jest.fn().mockReturnValueOnce(testToken);
    jwtMock.sign = jwt_mock;
    const response = await service.signup(testUser);
    expect(mock).toHaveBeenCalled();
    expect(jwt_mock).toHaveBeenCalled();
    expect(response.token).toEqual(testToken);
  });
  it('logs a user in', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    const mock = jest.fn().mockResolvedValueOnce(testUser);
    entityMock.findOne = mock;
    await service.login({ email: testUser.email, password: '' });
    expect(mock).toHaveBeenCalled();
  });
  it('fails to log a user in if password does not match', async () => {
    try {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);
      const mock = jest.fn().mockResolvedValueOnce(testUser);
      entityMock.findOne = mock;
      await service.login({
        email: testUser.email,
        password: testUser.password,
      });
      expect(mock).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Unable');
    }
  });
  it('fails to log a user in if no user is found', async () => {
    try {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      const mock = jest.fn().mockResolvedValueOnce(null);
      entityMock.findOne = mock;
      await service.login({
        email: testUser.email,
        password: testUser.password,
      });
      expect(mock).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Failed');
    }
  });
  it('logs a user in and returns a token', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    const mock = jest.fn().mockResolvedValueOnce(testUser);
    entityMock.findOne = mock;
    let testToken = 'jjfjffuf';
    const jwt_mock = jest.fn().mockReturnValueOnce(testToken);
    jwtMock.sign = jwt_mock;
    const response = await service.login({
      email: testUser.email,
      password: '',
    });
    expect(mock).toHaveBeenCalled();
    expect(jwt_mock).toHaveBeenCalled();
    expect(response.token).toEqual(testToken);
  });
});
