import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      CREATE TABLE rentals (
        id serial UNIQUE,
        customer_id int4 REFERENCES customers,
        game_id int4 REFERENCES games,
        rent_date date NOT NULL DEFAULT NOW(),
        days_rented int2 NOT NULL,
        return_date date,
        original_price int4 NOT NULL,
        delay_fee int4,
        PRIMARY KEY (customer_id, game_id)
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
    await db.query('DROP TABLE rents;');
  }
  catch (error) {
    return error;
  }
};
