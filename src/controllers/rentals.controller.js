import chalk from 'chalk';
import db from '../database/database.connection.js';
import { customConstraint, foreingKeyConstraint } from '../utils/constants/postgres.js';
import { standardBatch } from '../utils/constants/queries.js';
import internalError from '../utils/functions/internalError.js';
import { closeQuery, createReadQuery, createWriteQuery, deleteQuery, listQuery } from '../queries/rentals.queries.js';

export const listRentals = async (req, res) => {
  const {
    customerId,
    gameId,
    offset = 0,
    limit = standardBatch,
    order = 'id',
    desc,
    status,
    startDate
  } = req.Params;
  console.log(chalk.cyan('GET /rentals'));

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
  const { customerId, gameId, daysRented } = req.Params;
  console.log(chalk.cyan('POST /rentals'));

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


export const closeRental = async (req, res) => {
  const { id } = req.Params;
  console.log(chalk.cyan(`POST /rentals/${id}/return`));

  try {
    // driven garbage
    const { rows } = await db.query('select id from rentals where id = $1 and "returnDate" is not null', [id]);
    if (rows.length > 0) {
      return res.status(400).send('jogo já foi entregue');
    }
    //

    const { rowCount } = await db.query(closeQuery(), [id]);
    if (rowCount === 0) {
      return res.status(404).send('não existe alguel com o id fornecido');
    }

    res.send();
  }
  catch (error) {
    if (error.code === customConstraint) {
      return res.status(400).send('jogo já foi entregue');
    }

    internalError(error, res);
  }
};

export const deleteRental = async (req, res) => {
  const { id } = req.Params;
  console.log(chalk.cyan(`DELETE /rentals/${id}`));

  try {
    const { rowCount } = await db.query(deleteQuery(), [id]);
    if (rowCount === 0) {
      return res.status(404).send('não existe alguel com o id fornecido');
    }

    res.send();
  }
  catch (error) {
    if (error.code === customConstraint) {
      return res.status(400).send('não é permitida a deleção de algueis ainda em aberto');
    }

    internalError(error, res);
  }
};
