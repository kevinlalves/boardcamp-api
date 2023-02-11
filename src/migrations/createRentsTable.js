import pool from '../database/database.connection.js';

export const up = async () => {
  try {
    await pool.query(`
      CREATE TABLE rents (
        costumer_id int4 REFERENCES costumers,
        game_id int4 REFERENCES games,
        rent_date date NOT NULL,
        days_rented int2 NOT NULL,
        return_date date,
        original_price int4 NOT NULL,
        delay_fee int4,
        PRIMARY KEY (costumer_id, game_id)
      );
    `);

    console.log('createRentsTable migrated!');
  }
  catch (error) {
    console.log('error migrating createRentsTable');
    console.log(error);

    return true;
  }
};

export const down = async () => {
  try {
    await pool.query('DROP TABLE rents;');

    console.log('createRentsTable rolled back!');
  } catch (error) {
    console.log('error rolling back createRentsTable');
    console.log(error);

    return true;
  }
};
