import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      CREATE TABLE costumers (
        id serial PRIMARY KEY,
        name text NOT NULL,
        phone text NOT NULL,
        cpf varchar(11) NOT NULL UNIQUE,
        birthday date NOT NULL
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
    await db.query('DROP TABLE costumers;');
  }
  catch (error) {
    return error;
  }
};
