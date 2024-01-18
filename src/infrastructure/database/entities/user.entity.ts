import { BeforeInsert, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashText } from "../../../utils/hash";
import { BalanceModel } from "./balance.entity";

export interface IUserModel {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToOne(() => BalanceModel, balance => balance.user)
  balance: BalanceModel;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashText(this.password);
  }
}