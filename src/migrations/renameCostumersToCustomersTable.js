import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      ALTER TABLE costumers
      RENAME TO customers;
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
      ALTER TABLE customers
      RENAME TO costumers;
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
