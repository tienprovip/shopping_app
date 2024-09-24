import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;