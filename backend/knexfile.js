import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    client: 'pg',
    connection: process.env.DB_URI,
    migrations: {
      directory: './src/migrations',
      tableName: 'knex_migrations'
    }
  }
};