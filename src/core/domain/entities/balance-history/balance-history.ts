import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { IBalanceHistoryModel } from '../../../../infrastructure/database/entities/balance-history.entity';
import { BalanceHistoryType } from "../../enums/balance-history/balance-history-type.enum";
import { BalanceOption } from "../../enums/balance-history/balance-option.enum";
import { Balance } from "../balance/balance";

export class BalanceHistory {
  public readonly id?: string;
  public readonly currencyValue: string;
  public readonly bitcoinValue: string;
  public readonly option: BalanceOption;
  public readonly type: BalanceHistoryType;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly balance?: Balance;

  constructor(props: BalanceHistory) {
    Object.assign(this, props);

    if(!props.id) this.id = uuid();
  }

  public static create(props: IBalanceHistoryModel): BalanceHistory {
    return new BalanceHistory(props);
  }

  public static update(balanceHistory: BalanceHistory, props: IBalanceHistoryModel): BalanceHistory {
    return new BalanceHistory({ ...balanceHistory, ...props });
  }

  public static toDomain(balanceHistory: IBalanceHistoryModel): BalanceHistory {
    return new BalanceHistory(balanceHistory);
  }

  public static toPersistence(balanceHistory: BalanceHistory, balanceRepository: Repository<IBalanceHistoryModel>): IBalanceHistoryModel {
    return balanceRepository.create(balanceHistory);
  }
}