import { Repository } from 'typeorm';
import { IBalanceHistoryModel } from '../../../../infrastructure/database/entities/balance-history.entity';
import { BalanceHistoryType } from '../../enums/balance-history/balance-history-type.enum';
import { BalanceOption } from '../../enums/balance-history/balance-option.enum';
import { BalanceHistory } from './balance-history';

describe('BalanceHistory', () => {
  it('should create a new BalanceHistory instance', () => {
    // Arrange
    const props = {
      currencyValue: '100',
      bitcoinValue: '0.01',
      option: BalanceOption.CURRENCY,
      type: BalanceHistoryType.BUY,
    };

    // Act
    const balanceHistory = BalanceHistory.create(props);

    // Assert
    expect(balanceHistory).toBeInstanceOf(BalanceHistory);
    expect(balanceHistory.currencyValue).toBe(props.currencyValue);
    expect(balanceHistory.bitcoinValue).toBe(props.bitcoinValue);
    expect(balanceHistory.option).toBe(props.option);
    expect(balanceHistory.type).toBe(props.type);
  });

  it('should update the balance history', () => {
    // Arrange
    const balanceHistory = new BalanceHistory({
      id: '123',
      currencyValue: '100',
      bitcoinValue: '0.01',
      option: BalanceOption.CURRENCY,
      type: BalanceHistoryType.BUY,
    });
    const props = {
      currencyValue: '200',
      bitcoinValue: '0.02',
      option: BalanceOption.CURRENCY,
      type: BalanceHistoryType.DEPOSIT,
    };

    // Act
    const updatedBalanceHistory = BalanceHistory.update(balanceHistory, props);

    // Assert
    expect(updatedBalanceHistory).toBeInstanceOf(BalanceHistory);
    expect(updatedBalanceHistory.id).toBe(balanceHistory.id);
    expect(updatedBalanceHistory.currencyValue).toBe(props.currencyValue);
    expect(updatedBalanceHistory.bitcoinValue).toBe(props.bitcoinValue);
    expect(updatedBalanceHistory.option).toBe(props.option);
    expect(updatedBalanceHistory.type).toBe(props.type);
  });

  it('should convert balance history to domain', () => {
    // Arrange
    const balanceHistoryData = {
      id: '123',
      currencyValue: '100',
      bitcoinValue: '0.01',
      option: BalanceOption.BITCOIN,
      type: BalanceHistoryType.SELL,
    };

    // Act
    const balanceHistory = BalanceHistory.toDomain(balanceHistoryData);

    // Assert
    expect(balanceHistory).toBeInstanceOf(BalanceHistory);
    expect(balanceHistory.id).toBe(balanceHistoryData.id);
    expect(balanceHistory.currencyValue).toBe(balanceHistoryData.currencyValue);
    expect(balanceHistory.bitcoinValue).toBe(balanceHistoryData.bitcoinValue);
    expect(balanceHistory.option).toBe(balanceHistoryData.option);
    expect(balanceHistory.type).toBe(balanceHistoryData.type);
  });

  it('should convert balance history to persistence', () => {
    // Arrange
    const balanceHistory = new BalanceHistory({
      id: '123',
      currencyValue: '100',
      bitcoinValue: '0.01',
      option: BalanceOption.CURRENCY,
      type: BalanceHistoryType.BUY,
    });

    const balanceHistoryRepository: Partial<Repository<IBalanceHistoryModel>> = {
      create: jest.fn()
    };

    // Act
    BalanceHistory.toPersistence(balanceHistory, balanceHistoryRepository as Repository<IBalanceHistoryModel>);

    // Assert
    expect(balanceHistoryRepository.create).toHaveBeenCalledWith(balanceHistory);
  });
});