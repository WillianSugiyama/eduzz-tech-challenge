import { Request, Response } from 'express';
import { UserController } from './user.controller';
import { IUserService } from '../../domain/interfaces/user/user.service';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: IUserService;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockUserService = {
      signUp: jest.fn(),
      signIn: jest.fn(),
    };
    userController = new UserController(mockUserService as IUserService);
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      setHeader: jest.fn(),
    };
  });

  describe('signUp', () => {
    it('should return 201 status code and result when sign up is successful', async () => {
      // Arrange
      const requestBody = {
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };
      const expectedResult = 'success';
      mockRequest.body = requestBody;
      mockUserService.signUp = jest.fn().mockResolvedValue(expectedResult);

      // Act
      await userController.signUp(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({ result: expectedResult });
    });

    it('should return error message when sign up fails', async () => {
      // Arrange
      const requestBody = {
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };
      const errorMessage = 'Invalid email';
      mockRequest.body = requestBody;
      mockUserService.signUp = jest.fn().mockResolvedValue({ status: 400, message: errorMessage });

      // Act
      await userController.signUp(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('signIn', () => {
    it('should return token and set cookie when sign in is successful', async () => {
      // Arrange
      const requestBody = {
        email: 'test@example.com',
        password: 'password',
      };
      const tokenData = {
        token: 'token',
        expiresIn: 3600,
      };
      mockRequest.body = requestBody;
      mockUserService.signIn = jest.fn().mockResolvedValue({ status: 200, message: tokenData });

      // Act
      await userController.signIn(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Set-Cookie', [
        `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`,
      ]);
      expect(mockResponse.send).toHaveBeenCalledWith({ result: {
        message: tokenData,
        status: 200
      } });
    });

    it('should return error message when sign in fails', async () => {
      // Arrange
      const requestBody = {
        email: 'test@example.com',
        password: 'password',
      };
      const errorMessage = 'Invalid credentials';
      mockRequest.body = requestBody;
      mockUserService.signIn = jest.fn().mockResolvedValue({ status: 401, message: errorMessage });

      // Act
      await userController.signIn(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});