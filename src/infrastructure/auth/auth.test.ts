import * as jwt from 'jsonwebtoken';
import { User } from '../../core/domain/entities/user/user';
import { ACTUAL_TIME_IN_SECONDS, FIFTEEN_MINUTES_IN_MS } from '../../utils/constants';
import { getActualTimeInSeconds } from '../../utils/getActualTime';
import { Auth } from './auth';

describe('Auth', () => {
  describe('createToken', () => {
    it('should return a token with the correct data', () => {
      // Arrange
      const auth = new Auth();
      const user: User = { id: '123', createdAt: new Date(), updatedAt: new Date(), email: 'teste@teste.com', name: 'teste', password: 'teste'};

      // Act
      const tokenData = auth.createToken(user);

      // Assert
      expect(tokenData).toBeDefined();
      expect(tokenData.expiresIn).toBe(FIFTEEN_MINUTES_IN_MS);
      expect(tokenData.token).toBeDefined();

      // Verify the token using the same secret
      const decodedToken = jwt.verify(tokenData.token, 'secret');
      expect(decodedToken).toEqual({ id: user.id, iat: Math.floor(ACTUAL_TIME_IN_SECONDS), exp: Math.floor(getActualTimeInSeconds()) });
    });
  });
});