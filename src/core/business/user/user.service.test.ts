import { IAuth } from '../../../infrastructure/auth/auth.interface';
import { IUserRepository } from '../../domain/interfaces/user/user.repository';
import { CreateUserDTO } from '../../domain/validators/user/create-user.dto';
import { SignInDTO } from '../../domain/validators/user/sign-in.dto';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;
  let authService: IAuth;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
    };
    authService = {
      createToken: jest.fn(),
    }
    userService = new UserService(userRepository, authService);
  });

  describe('signUp', () => {
    it('should return UserAlreadyExists if user with the same email already exists', async () => {
      // Arrange
      const data: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };
      
      userRepository.findByEmail = jest.fn().mockResolvedValue({ id: 'existingUserId' });

      // Act
      const result = await userService.signUp(data);

      // Assert
      expect(result).toEqual({
        message: 'User with email test@example.com already exists',
        status: 400,
      })
    });

    it('should save the user and return the id if user does not exist', async () => {
      // Arrange
      const data: CreateUserDTO = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
      };

      userRepository.findByEmail = jest.fn().mockResolvedValue(null);
      userRepository.save = jest.fn().mockResolvedValue('newUserId');

      // Act
      const result = await userService.signUp(data);

      // Assert
      expect(result).toBe('newUserId');
      expect(userRepository.save).toHaveBeenCalledWith(data);
    });
  });

  describe('signIn', () => {
    it('should return HttpException with status 401 if user does not exist', async () => {
      // Arrange
      const data: SignInDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      userRepository.findByEmail = jest.fn().mockResolvedValue(null);

      // Act
      const result = await userService.signIn(data);

      // Assert
      expect(result).toEqual({
        message: 'User not found with email test@example.com',
        status: 404,
      })
    });

    it('should return the user id if credentials are valid', async () => {
      // Arrange
      const data: SignInDTO = {
        email: 'test@example.com',
        password: 'password123',
      };
      const user = {
        id: 'userId',
        password: 'hashedPassword',
      };
      userRepository.findByEmail = jest.fn().mockResolvedValue(user);

      // Act
      const result = await userService.signIn(data);

      // Assert
      expect(result).toBe(user.id);
    });
  });
});