import { Repository } from 'typeorm';
import { UserModel } from '../../entities/user.entity';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let repositoryMock: jest.Mocked<Repository<UserModel>>;

  beforeEach(() => {
    repositoryMock = {} as jest.Mocked<Repository<UserModel>>;
    userRepository = new UserRepository(repositoryMock);
  });

  it('should save a user and return the id', async () => {
    // Arrange
    const user = new UserModel();
    repositoryMock.save = jest.fn().mockResolvedValue({ id: '123' } as UserModel);

    // Act
    const result = await userRepository.save(user);

    // Assert
    expect(repositoryMock.save).toHaveBeenCalledWith(user);
    expect(result).toBe('123');
  });

  it('should find a user by email', async () => {
    // Arrange
    const email = 'test@example.com';
    const user = new UserModel();
    repositoryMock.findOne = jest.fn().mockResolvedValue(user);

    // Act
    const result = await userRepository.findByEmail(email);

    // Assert
    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { email } });
    expect(result).toBe(user);
  });

  it('should find a user by id', async () => {
    // Arrange
    const id = '123';
    const user = new UserModel();
    repositoryMock.findOne = jest.fn().mockResolvedValue(user);

    // Act
    const result = await userRepository.findById(id);

    // Assert
    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(result).toBe(user);
  });
});