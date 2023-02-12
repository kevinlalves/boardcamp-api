import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      ALTER TABLE rentals
      ALTER COLUMN rent_date
      SET DEFAULT NOW();
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
      ALTER COLUMN rent_date
      SET DEFAULT NOW();
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
