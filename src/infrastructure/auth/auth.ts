import * as jwt from 'jsonwebtoken';
import { User } from '../../core/domain/entities/user/user';
import { FIFTEEN_MINUTES_IN_MS } from '../../utils/constants';
import { IAuth, TokenDataResponse } from "./auth.interface";

export class Auth implements IAuth {
  public createToken(data: User): TokenDataResponse {
    const expiresIn = FIFTEEN_MINUTES_IN_MS;
    const secret = 'secret';

    return {
      message: {
        expiresIn,
        token: jwt.sign({ id: data.id }, secret, { expiresIn })
      },
      status: 200,
    }
  }
}
