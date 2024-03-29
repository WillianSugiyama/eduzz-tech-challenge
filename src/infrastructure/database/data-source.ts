import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: false,
  logging: false,
  entities: ['src/infrastructure/database/entities/*.entity.ts'],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  subscribers: [],
});
