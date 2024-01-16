import { NextFunction, Request, Response } from "express";

export interface IUserController {
  signUp(request: Request, response: Response): Promise<Response<string>>;
  signIn(request: Request, response: Response, next: NextFunction): Promise<Response<string>>;
}