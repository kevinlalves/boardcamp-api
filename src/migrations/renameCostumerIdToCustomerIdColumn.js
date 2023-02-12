import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      ALTER TABLE rentals
      RENAME COLUMN costumer_id TO customer_id;
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
      RENAME COLUMN customer_id TO costumer_id;
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
