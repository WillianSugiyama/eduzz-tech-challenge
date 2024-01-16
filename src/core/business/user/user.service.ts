import { IAuth, TokenDataResponse } from "../../../infrastructure/auth/auth.interface";
import { IErrorResponse } from "../../../infrastructure/exceptions/error-response";
import { compare } from "../../../utils/hash";
import { IUserRepository } from "../../domain/interfaces/user/user.repository";
import { IUserService } from "../../domain/interfaces/user/user.service";
import { CreateUserDTO } from "../../domain/validators/user/create-user.dto";
import { SignInDTO } from "../../domain/validators/user/sign-in.dto";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;
  private readonly authService: IAuth;

  constructor(userRepository: IUserRepository, authService: IAuth) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async signUp(data: CreateUserDTO): Promise<string | IErrorResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if(user) {
      return {
        message: `User with email ${data.email} already exists`,
        status: 400,
      }
    }

    const id = await this.userRepository.save(data);

    return id;
  }

  public async signIn(data: SignInDTO): Promise<TokenDataResponse | IErrorResponse> {
    const user = await this.userRepository.findByEmail(data.email);

    if(!user) {
      return {
        message: `User not found with email ${data.email}`,
        status: 404,
      }
    }

    if(!compare(data.password, user.password)) {
      return {
        message: 'Invalid credentials',
        status: 400,
      }
    }

    user.password = undefined;
    const tokenData = this.authService.createToken(user);

    return tokenData;
  }
}