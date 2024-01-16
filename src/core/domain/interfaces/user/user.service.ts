import { TokenDataResponse } from "../../../../infrastructure/auth/auth.interface";
import { IErrorResponse } from "../../../../infrastructure/exceptions/error-response";
import { CreateUserDTO } from "../../validators/user/create-user.dto";
import { SignInDTO } from "../../validators/user/sign-in.dto";

export interface IUserService {
  signUp(data: CreateUserDTO): Promise<string | IErrorResponse>;
  signIn(data: SignInDTO): Promise<TokenDataResponse | IErrorResponse>;
}