import { IBalanceHistoryModel } from "../../../../infrastructure/database/entities/balance-history.entity";

export interface IBalanceHistoryRepository {
  save(balanceHistory: IBalanceHistoryModel): Promise<IBalanceHistoryModel>;
  findByBalanceId(balanceId: string, startDate?: Date, endDate?: Date): Promise<IBalanceHistoryModel[]>;
}