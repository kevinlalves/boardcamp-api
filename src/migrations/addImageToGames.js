import pool from '../database/database.connection.js';


export const up = async () => {
  try {
    pool.query(`
      ALTER TABLE games
      ADD COLUMN image text NOT NULL;
    `);
  }
  catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    pool.query(`
      ALTER TABLE games
      DROP COLUMN image;
    `);
  }
  catch (error) {
    return error;
  }
};
