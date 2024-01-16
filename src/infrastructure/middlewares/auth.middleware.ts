import { NextFunction, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { IUserRepository } from "../../core/domain/interfaces/user/user.repository";
import { SECRET } from "../../utils/constants";
import { DataStoredInToken, RequestWithUser } from "../auth/auth.interface";
import { AppDataSource } from "../database/data-source";
import { UserModel } from "../database/entities/user.entity";
import { UserRepository } from "../database/repositories/user/user.repository";
import { WrongAuthenticationTokenException } from "../exceptions/wrong-authentication-token-exception";

export async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  const userRepository: IUserRepository = new UserRepository(AppDataSource.getRepository(UserModel));

  if(cookies && cookies.Authorization) {
    const secret = SECRET;

    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;

      const id = verificationResponse.id;
      const user = await userRepository.findById(id);

      if(user) {
        request.user = user;
        next()
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch(error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new WrongAuthenticationTokenException());
  }
}