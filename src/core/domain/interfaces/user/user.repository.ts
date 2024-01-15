import { IUserModel } from "../../../../infrastructure/database/entities/user.entity";

export interface IUserRepository {
  save(user: IUserModel): Promise<string>;
  findByEmail(email: string): Promise<IUserModel | undefined>;
  findById(id: string): Promise<IUserModel | undefined>;
}