import { Repository } from 'typeorm';
import { User } from '../../../../core/domain/entities/user/user';
import { BalanceModel, IBalanceModel } from '../../../../infrastructure/database/entities/balance.entity';
import { BalanceRepository } from './balance.repository';
import { UserModel } from '../../entities/user.entity';

describe('BalanceRepository', () => {
  let balanceRepository: BalanceRepository;
  let mockRepository: Partial<Repository<BalanceModel>>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findOne: jest.fn(),
    };
    balanceRepository = new BalanceRepository(mockRepository as Repository<BalanceModel>);
  });

  it('should save a balance', async () => {
    // Arrange
    const balance: IBalanceModel = {
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
      user: {
        id: '123',
      } as UserModel
    };

    const expectedResult: IBalanceModel = {
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
      user: {
        id: '123',
      } as UserModel
    };
    mockRepository.save = jest.fn().mockResolvedValue(expectedResult);

    // Act
    const result = await balanceRepository.save({
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
      user: {
        id: '123',
      } as User,
    } as BalanceModel);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockRepository.save).toHaveBeenCalledWith(balance);
  });

  it('should find a balance by user ID', async () => {
    // Arrange
    const userId = '123';
    const balance: IBalanceModel = {
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
      user: {
        id: '123',
      } as UserModel
    };
    mockRepository.findOne = jest.fn().mockResolvedValue(balance);

    // Act
    const result = await balanceRepository.findByUserId(userId);

    // Assert
    expect(result).toEqual(balance);
    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { user: { id: userId } } });
  });

  it('should update a balance', async () => {
    // Arrange
    const balance: IBalanceModel = {
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
    };
    const expectedResult: IBalanceModel = {
      id: '123',
      currencyValue: 200,
      bitcoinValue: 0.02,
    };
    mockRepository.save = jest.fn().mockResolvedValue(expectedResult);

    // Act
    const result = await balanceRepository.update(balance);

    // Assert
    expect(result).toEqual(expectedResult);
    expect(mockRepository.save).toHaveBeenCalledWith(balance);
  });
});