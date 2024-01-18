import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { BalanceHistoryModel, IBalanceHistoryModel } from '../../../../infrastructure/database/entities/balance-history.entity';
import { BalanceHistoryRepository } from './balance-history.repository';
import { BalanceOption } from '../../../../core/domain/enums/balance-history/balance-option.enum';
import { BalanceHistoryType } from '../../../../core/domain/enums/balance-history/balance-history-type.enum';

describe('BalanceHistoryRepository', () => {
  let repository: BalanceHistoryRepository;
  let mockRepository: Partial<Repository<BalanceHistoryModel>>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        leftJoin: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockReturnThis(),
      })) as unknown as (alias?: string, queryRunner?: QueryRunner) => SelectQueryBuilder<BalanceHistoryModel>,
    };

    repository = new BalanceHistoryRepository(mockRepository as Repository<BalanceHistoryModel>);
  });

  it('should save a balance history', async () => {
    // Arrange
    const balanceHistory: IBalanceHistoryModel = {
      id: '123',
      currencyValue: '100',
      bitcoinValue: '0.01',
      createdAt: new Date(),
      option: BalanceOption.BITCOIN,
      type: BalanceHistoryType.BUY,
    };

    // Act
    await repository.save(balanceHistory);

    // Assert
    expect(mockRepository.save).toHaveBeenCalledWith(balanceHistory);
  });

  it('should find balance histories by balance id', async () => {
    // Arrange
    const balanceId = '123';
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-31');

    // Act
    await repository.findByBalanceId(balanceId, startDate, endDate);


    // Assert
    expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
  });
});