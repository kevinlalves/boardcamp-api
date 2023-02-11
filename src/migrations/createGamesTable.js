import pool from '../database/database.connection.js';

export const up = async () => {
  try {
    await pool.query(`
      CREATE TABLE games (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        stock_total INT4 NOT NULL DEFAULT 0,
        price_per_day INT8 NOT NULL
      );
    `);

    console.log('createGamesTable migrated!');
  }
  catch (error) {
    console.log('error migrating createGamesTable...');
    console.log(error);
    return true;
  }
};

export const down = async () => {
  try {
    await pool.query('DROP TABLE games;');

    console.log('createGamesTable rolled back!');
  }
  catch (error) {
    console.log('error rolling back createGamesTable...');
    console.log(error);
    return true;
  }
};
