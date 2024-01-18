import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IBalanceModel } from '../../../../infrastructure/database/entities/balance.entity';
import { IUserModel } from '../../../../infrastructure/database/entities/user.entity';

export class Balance {
  public readonly id?: string;
  public readonly currencyValue: number;
  public readonly bitcoinValue: number;
  public readonly user?: IUserModel;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  

  constructor(props: Balance) {
    Object.assign(this, props);

    if(!props.id) this.id = uuid();
  }

  public static create(props: IBalanceModel): Balance {
    return new Balance(props);
  }

  public static update(balance: Balance, props: IBalanceModel): Balance {
    return new Balance({ ...balance, ...props });
  }

  public static toDomain(balance: IBalanceModel): Balance {
    return new Balance(balance);
  }

  public static toPersistence(balance: Balance, balanceRepository: Repository<IBalanceModel>): IBalanceModel {
    return balanceRepository.create(balance);
  }
}