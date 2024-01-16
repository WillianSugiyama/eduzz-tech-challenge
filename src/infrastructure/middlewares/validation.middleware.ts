/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpException } from '../exceptions/http-exception';

export function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    validate(plainToInstance(type, request.body), { skipMissingProperties})
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  }
}