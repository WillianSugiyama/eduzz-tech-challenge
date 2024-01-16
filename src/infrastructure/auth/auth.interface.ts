import { Request } from "express";
import { User } from "../../core/domain/entities/user/user";

export interface TokenData {
  expiresIn: number;
  token: string;
}
export interface TokenDataResponse {
  message: TokenData;
  status: number;
}

export interface DataStoredInToken {
  id: string;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface IAuth {
  createToken(data: User): TokenDataResponse;
}
