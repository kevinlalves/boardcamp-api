import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      CREATE TABLE games (
        id serial PRIMARY KEY,
        name text NOT NULL UNIQUE,
        stock_total int4 NOT NULL DEFAULT 0,
        price_per_day int8 NOT NULL
      );
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await db.query('DROP TABLE games;');
  }
  catch (error) {
    return error;
  }
};
