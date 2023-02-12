import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      ALTER TABLE rentals
      ADD COLUMN id serial UNIQUE;
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
      ALTER TABLE rentals
      DROP COLUMN id;
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
