import pool from '../database/database.connection.js';

export const up = async () => {
  try {
    await pool.query(`
      CREATE TABLE costumers (
        id serial PRIMARY KEY,
        name text NOT NULL,
        phone text NOT NULL,
        cpf varchar(11) NOT NULL UNIQUE,
        birthday date NOT NULL
      );
    `);

    console.log('createCostumersTable migrated!');
  }
  catch (error) {
    return error;
  }
}

export const down = async () => {
  try {
    await pool.query('DROP TABLE costumers;');
  }
  catch (error) {
    return error;
  }
}
