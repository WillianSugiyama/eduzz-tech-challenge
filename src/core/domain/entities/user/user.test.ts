import { Repository } from 'typeorm';
import { UserModel } from '../../../../infrastructure/database/entities/user.entity';
import { User } from './user';

describe('User', () => {
  it('should create a new user', () => {
    // Arrange
    const props = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Act
    const user = User.create(props);

    // Assert
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined();
    expect(user.name).toBe(props.name);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.createdAt).toBe(props.createdAt);
    expect(user.updatedAt).toBe(props.updatedAt);
  });

  it('should update an existing user', () => {
    // Arrange
    const existingUser = User.create({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const props = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'newpassword',
      updatedAt: new Date(),
    };

    // Act
    const updatedUser = User.update(existingUser, props);

    // Assert
    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.id).toBe(existingUser.id);
    expect(updatedUser.name).toBe(props.name);
    expect(updatedUser.email).toBe(props.email);
    expect(updatedUser.password).toBe(props.password);
    expect(updatedUser.createdAt).toBe(existingUser.createdAt);
    expect(updatedUser.updatedAt).toBe(props.updatedAt);
  });

  it('should convert to domain model', () => {
    // Arrange
    const userModel = {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Act
    const user = User.toDomain(userModel);

    // Assert
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(userModel.id);
    expect(user.name).toBe(userModel.name);
    expect(user.email).toBe(userModel.email);
    expect(user.password).toBe(userModel.password);
    expect(user.createdAt).toBe(userModel.createdAt);
    expect(user.updatedAt).toBe(userModel.updatedAt);
  });

  it('should convert to persistence model', () => {
    // Arrange
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const userRepository: Partial<Repository<UserModel>> = {
      create: jest.fn(),
    };

    // Act
    User.toPersistence(user, userRepository as Repository<UserModel>);

    // Assert
    expect(userRepository.create).toHaveBeenCalledWith(user);
  });
});