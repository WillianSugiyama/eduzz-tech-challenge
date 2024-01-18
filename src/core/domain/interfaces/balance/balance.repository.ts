import { IBalanceModel } from "../../../../infrastructure/database/entities/balance.entity";

export interface IBalanceRepository {
  save(balance: IBalanceModel): Promise<IBalanceModel>;
  findByUserId(userId: string): Promise<IBalanceModel | undefined>;
  update(balance: IBalanceModel): Promise<IBalanceModel>;
}