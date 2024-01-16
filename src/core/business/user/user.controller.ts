import { Request, Response } from "express";
import { TokenData } from "../../../infrastructure/auth/auth.interface";
import { IUserController } from "../../domain/interfaces/user/user.controller";
import { IUserService } from "../../domain/interfaces/user/user.service";

export class UserController implements IUserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  public async signUp(request: Request, response: Response): Promise<Response<string>> {
    const { email, password, name } = request.body;


    const result = await this.userService.signUp({ email, password, name });

    if (typeof result !== 'string') {
      return response.status(result.status).json({ message: result.message });
    }

    return response.status(201).json({ result });
  }

  public async signIn(request: Request, response: Response): Promise<Response<string>> {
    const { email, password } = request.body;

    const result = await this.userService.signIn({ email, password });

    if(result.status !== 200) { 
      return response.status(result.status).json({ message: result.message });
    }

    response.setHeader('Set-Cookie', [this.createCookie(result.message as TokenData)]);
    return response.send({ result});
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}