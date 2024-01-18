import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Balance } from "../../../core/domain/entities/balance/balance";
import { BalanceHistoryType } from "../../../core/domain/enums/balance-history/balance-history-type.enum";
import { BalanceOption } from "../../../core/domain/enums/balance-history/balance-option.enum";
import { BalanceModel } from "./balance.entity";

export interface IBalanceHistoryModel {
  id?: string;
  currencyValue: string;
  bitcoinValue: string;
  option: BalanceOption;
  type: BalanceHistoryType;
  createdAt?: Date;
  updatedAt?: Date;
  balance?: Balance;
}

@Entity('balance-history')
export class BalanceHistoryModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  currencyValue: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  bitcoinValue: string;

  @Column({ type: 'enum', enum: BalanceOption })
  option: BalanceOption;

  @Column({ type: 'enum', enum: BalanceHistoryType })
  type: BalanceHistoryType;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => BalanceModel, balance => balance.balanceHistory)
  balance?: Balance;
}