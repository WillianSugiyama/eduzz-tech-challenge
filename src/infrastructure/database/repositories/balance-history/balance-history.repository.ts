import { Repository } from "typeorm";
import { IBalanceHistoryRepository } from "../../../../core/domain/interfaces/balance-history/balance-history.repository";
import { BalanceHistoryModel, IBalanceHistoryModel } from "../../entities/balance-history.entity";

export class BalanceHistoryRepository implements IBalanceHistoryRepository {
  private readonly repository: Repository<BalanceHistoryModel>;

  constructor(repository: Repository<BalanceHistoryModel>) {
    this.repository = repository;
  }

  public async save(balance: IBalanceHistoryModel): Promise<IBalanceHistoryModel> {
    const result = await this.repository.save(balance);

    return result;
  }

  public async findByBalanceId(balanceId: string, startDate?: Date, endDate?: Date): Promise<IBalanceHistoryModel[]> {
    const query = this.repository.createQueryBuilder('balanceHistory')
      .leftJoinAndSelect('balanceHistory.balance', 'balance')
      .where('balance.id = :balanceId', { balanceId });

    if(startDate && endDate) query.andWhere('balanceHistory.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate });

    const result = await query.getMany();

    return result;
  }
}