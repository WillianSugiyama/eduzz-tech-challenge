import { Repository } from "typeorm";
import { IAuth } from "../../../infrastructure/auth/auth.interface";
import { UserModel } from "../../../infrastructure/database/entities/user.entity";
import { UserRepository } from "../../../infrastructure/database/repositories/user/user.repository";
import { IUserRepository } from "../../domain/interfaces/user/user.repository";
import { IUserService } from "../../domain/interfaces/user/user.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

export class UserWrapper {
  private readonly userService: IUserService;
  private readonly userRepository: IUserRepository;
  private readonly authService: IAuth;

  constructor(repository: Repository<UserModel>, authService: IAuth) {
    this.userRepository = new UserRepository(repository);
    this.userService = new UserService(this.userRepository, authService);
  }

  public getController(): UserController {
    return new UserController(this.userService);
  }
}