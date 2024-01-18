import { Repository } from 'typeorm';
import { BalanceModel } from '../../../../infrastructure/database/entities/balance.entity';
import { Balance } from './balance';
import { BalanceRepository } from '../../../../infrastructure/database/repositories/balance/balance.repository';

describe('Balance', () => {
  let balanceRepository: BalanceRepository;
  let repositoryMock: jest.Mocked<Repository<BalanceModel>>;

  beforeEach(() => {
    repositoryMock = {} as jest.Mocked<Repository<BalanceModel>>;
    balanceRepository = new BalanceRepository(repositoryMock);
  })


  it('should create a new Balance instance', () => {
    // Arrange
    const props = {
      currencyValue: 100,
      bitcoinValue: 0.01,
    };

    // Act
    const balance = Balance.create(props);

    // Assert
    expect(balance).toBeInstanceOf(Balance);
    expect(balance.currencyValue).toBe(props.currencyValue);
    expect(balance.bitcoinValue).toBe(props.bitcoinValue);
  });

  it('should update the balance', () => {
    // Arrange
    const balance = new Balance({
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
    });
    const props = {
      currencyValue: 200,
      bitcoinValue: 0.02,
    };

    // Act
    const updatedBalance = Balance.update(balance, props);

    // Assert
    expect(updatedBalance).toBeInstanceOf(Balance);
    expect(updatedBalance.id).toBe(balance.id);
    expect(updatedBalance.currencyValue).toBe(props.currencyValue);
    expect(updatedBalance.bitcoinValue).toBe(props.bitcoinValue);
  });

  it('should convert balance to domain', () => {
    // Arrange
    const balanceData = {
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
    };

    // Act
    const balance = Balance.toDomain(balanceData);

    // Assert
    expect(balance).toBeInstanceOf(Balance);
    expect(balance.id).toBe(balanceData.id);
    expect(balance.currencyValue).toBe(balanceData.currencyValue);
    expect(balance.bitcoinValue).toBe(balanceData.bitcoinValue);
  });

  it('should convert balance to persistence', () => {
    // Arrange
    const balance = new Balance({
      id: '123',
      currencyValue: 100,
      bitcoinValue: 0.01,
    });

    const balanceRepository: Partial<Repository<BalanceModel>> = {
      create: jest.fn()
    };

    // Act
    Balance.toPersistence(balance, balanceRepository  as Repository<BalanceModel>);


    // Assert
    expect(balanceRepository.create).toHaveBeenCalledWith(balance);
  });
});