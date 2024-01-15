import { Repository } from "typeorm";
import { IUserRepository } from "../../../../core/domain/interfaces/user/user.repository";
import { UserModel } from "../../entities/user.entity";

export class UserRepository implements IUserRepository {
  private readonly repository: Repository<UserModel>;

  constructor(repository: Repository<UserModel>) {
    this.repository = repository;
  }

  public async save(user: UserModel): Promise<string> {
    const { id } = await this.repository.save(user);

    return id;
  }

  public async findByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<UserModel | undefined> { 
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }
}