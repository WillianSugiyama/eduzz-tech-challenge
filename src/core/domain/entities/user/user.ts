import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IUserModel, UserModel } from '../../../../infrastructure/database/entities/user.entity';

export class User {
  public readonly id?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: IUserModel) {
    Object.assign(this, props);

    if(!props.id) this.id = uuid();
  }

  public static create(props: IUserModel): IUserModel {
    return new User(props);
  }

  public static update(user: User, props: IUserModel): User {
    return new User({ ...user, ...props });
  }

  public static toDomain(user: IUserModel): User {
    return new User(user);
  }

  public static toPersistence(user: User, userRepository: Repository<UserModel>): IUserModel {
    return userRepository.create(user);
  }
}