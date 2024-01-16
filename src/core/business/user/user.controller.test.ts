import { Request, Response } from 'express';
import { IUserService } from '../../domain/interfaces/user/user.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let userService: IUserService;
  let request: Request;
  let response: Response;

  beforeEach(() => {
    userService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
    };
    userController = new UserController(userService);
    request = {} as Request;
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe('signUp', () => {
    it('should call userService.signUp and return 201 status code with result', async () => {
      // Arrange
      const signUpData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };
      request.body = signUpData;
      const expectedResult = { status: 201, message: 'User signed up successfully' };
      userService.signUp = jest.fn().mockResolvedValue(expectedResult);

      // Act
      await userController.signUp(request, response);

      // Assert
      expect(userService.signUp).toHaveBeenCalledWith(signUpData);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({ result: expectedResult });
    });
  });

  describe('signIn', () => {
    it('should call userService.signIn and return 200 status code with result', async () => {
      // Arrange
      const signInData = {
        email: 'test@example.com',
        password: 'password123',
      };
      request.body = signInData;
      const expectedResult = { status: 200, message: 'User signed in successfully' };
      userService.signIn = jest.fn().mockResolvedValue(expectedResult);

      // Act
      await userController.signIn(request, response);

      // Assert
      expect(userService.signIn).toHaveBeenCalledWith(signInData);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({ result: expectedResult });
    });
  });
});