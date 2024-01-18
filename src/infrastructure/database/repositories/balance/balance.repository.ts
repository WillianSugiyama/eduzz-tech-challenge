import { Repository } from "typeorm";
import { IBalanceRepository } from "../../../../core/domain/interfaces/balance/balance.repository";
import { BalanceModel, IBalanceModel } from "../../entities/balance.entity";
import { Balance } from "../../../../core/domain/entities/balance/balance";

export class BalanceRepository implements IBalanceRepository {
  private readonly repository: Repository<BalanceModel>;
  private readonly balance: Balance;

  constructor(repository: Repository<BalanceModel>) {
    this.repository = repository;
  }

  public async save(balance: IBalanceModel): Promise<IBalanceModel> {
    const result = await this.repository.save(balance);

    return result;
  }

  public async findByUserId(userId: string): Promise<BalanceModel | undefined> {
    const balance = await this.repository.findOne({ where: { user: { id: userId } } });

    return balance;
  }

  public async update(balance: IBalanceModel): Promise<IBalanceModel> {
    const result = await this.repository.save(balance);

    return result;
  }
}