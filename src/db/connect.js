import Sequelize from 'sequelize';

const database = 'second_sequelize_test';
const hostname = process.env.DB_HOSTNAME || 'localhost';
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';

export const sequelize = new Sequelize(database, username, password, {
  host: hostname,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
