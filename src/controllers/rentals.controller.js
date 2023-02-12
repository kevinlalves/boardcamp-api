import chalk from 'chalk';
import db from '../database/database.connection.js';
import { foreingKeyConstraint } from '../utils/constants/postgres.js';
import { standardBatch } from '../utils/constants/queries.js';
import internalError from '../utils/functions/internalError.js';
import { createReadQuery, createWriteQuery, listQuery } from '../queries/rentals.queries.js';

export const listRentals = async (req, res) => {
  console.log(chalk.cyan('GET /rentals'));
  const {
    customerId,
    gameId,
    offset = 0,
    limit = standardBatch,
    order = 'rentDate',
    desc,
    status,
    startDate
  } = req.Params;

  try {
    const { rows: rentals } = await db.query(
      listQuery({ customerId, gameId, order, desc, status, startDate }),
      [offset, limit]
    );

    res.json(rentals);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const createRental = async (req, res) => {
  console.log(chalk.cyan('POST /rentals'));
  const { customerId, gameId, daysRented } = req.Params;

  try {
    const { rows } = await db.query(createReadQuery(), [gameId]);

    if (!rows.length) {
      return res.status(400).send('não foram encontrados jogos com o id recebido');
    }

    const { totalNumOfGames, gamePricePerDay, numGamesRented } = rows[0];
    if (numGamesRented >= totalNumOfGames) {
      return res.status(400).send('jogo está sem estoque');
    }

    await db.query(createWriteQuery(), [customerId, gameId, daysRented, daysRented * gamePricePerDay]);

    res.status(201).send();
  }
  catch (error) {
    if (error.code === foreingKeyConstraint) {
      return res.status(400).send('não foram encontrados clientes com o id recebido');
    }

    internalError(error, res);
  }
};
