import { compare } from '../../../utils/hash';
import { UserModel } from './user.entity';

describe('UserModel', () => {
  let userModel: UserModel;

  beforeEach(() => {
    userModel = new UserModel();
  });

  it('should set email to lowercase before inserting', () => {
    // Arrange
    userModel.email = 'TEST@EXAMPLE.COM';

    // Act
    userModel.emailToLowerCase();

    // Assert
    expect(userModel.email).toBe('test@example.com');
  });

  it('should hash password before inserting', async () => {
    // Arrange
    userModel.password = 'password123';

    // Act
    await userModel.hashPassword();

    // Assert
    expect(await compare('password123', userModel.password)).toBeTruthy();
  });
});