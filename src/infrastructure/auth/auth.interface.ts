import { User } from "../../core/domain/entities/user/user";

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  id: string;
}

export interface IAuth {
  createToken(data: User): TokenData;
}