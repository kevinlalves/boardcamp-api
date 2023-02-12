import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      ALTER TABLE games
      ADD COLUMN image text NOT NULL;
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    const query = `
      ALTER TABLE games
      DROP COLUMN image;
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
