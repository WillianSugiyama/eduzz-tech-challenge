import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BalanceHistoryModel } from "./balance-history.entity";
import { IUserModel, UserModel } from "./user.entity";

export interface IBalanceModel {
  id?: string;
  currencyValue: number;
  bitcoinValue: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserModel;
}

@Entity('balance')
export class BalanceModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(() => UserModel, user => user.balance)
  user?: IUserModel;
  
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  currencyValue: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  bitcoinValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BalanceHistoryModel, balanceHistory => balanceHistory.balance)
  balanceHistory?: BalanceHistoryModel[];
}