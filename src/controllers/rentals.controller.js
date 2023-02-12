import chalk from 'chalk';
import db from '../database/database.connection.js';
import { foreingKeyConstraint } from '../utils/constants/postgres.js';
import internalError from '../utils/functions/internalError.js';

export const listRentals = async (req, res) => {

};

export const createRental = async (req, res) => {
  const { customerId, gameId, daysRented } = req.Params;

  console.log(chalk.cyan('POST /rentals'));

  try {
    const selectQuery = `
      SELECT
        games.stock_total AS "totalNumOfGames",
        games.price_per_day AS "gamePricePerDay",
        COUNT(rentals.game_id) AS "numGamesRented"
      FROM games
      LEFT JOIN rentals ON rentals.game_id = games.id
      WHERE games.id = $1
      GROUP BY games.id;
    `;
    const { rows } = await db.query(selectQuery, [gameId]);

    if (!rows.length) {
      return res.status(400).send('não foram encontrados jogos com o id recebido');
    }

    const { totalNumOfGames, gamePricePerDay, numGamesRented } = rows[0];
    if (numGamesRented >= totalNumOfGames) {
      return res.status(400).send('jogo está sem estoque');
    }

    const insertQuery = `
      INSERT INTO rentals (customer_id, game_id, days_rented, original_price) VALUES
      ($1, $2, $3, $4);
    `;
    await db.query(insertQuery, [customerId, gameId, daysRented, daysRented*gamePricePerDay]);

    res.status(201).send();
  }
  catch (error) {
    if (error.code === foreingKeyConstraint) {
      return res.status(400).send('não foram encontrados clientes com o id recebido');
    }

    internalError(error, res);
  }
};
