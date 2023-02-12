import chalk from 'chalk';
import db from '../database/database.connection.js';
import internalError from '../utils/functions/internalError.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { standardBatch } from '../utils/constants/queries.js';
import camelToSnakeCase from '../utils/functions/camelToSnakeCase.js';

export const listGames = async (req, res) => {
  const { name = '', offset = 0, limit = standardBatch, order = 'id', desc = false } = req.Params;

  console.log(chalk.cyan('GET /games'));

  try {
    const query = `
      SELECT
        id,
        name,
        image,
        stock_total AS "stockTotal",
        price_per_day AS "pricePerDay"
      FROM games
      WHERE name ILIKE $1
      ORDER BY ${camelToSnakeCase(order)} ${desc ? 'DESC' : 'ASC'}
      OFFSET $2
      LIMIT $3;
    `;
    const { rows: games } = await db.query(query, [name + '%', offset, limit]);

    res.json(games);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const addGame = async (req, res) => {
  const { name, image, stockTotal, pricePerDay } = req.Params;

  console.log(chalk.cyan('POST /games'));

  try {
    const query = `
      INSERT INTO games (name, image, stock_total, price_per_day) VALUES
      ($1, $2, $3, $4);
    `;
    await db.query(query, [name, image, stockTotal, pricePerDay]);

    res.status(201).send();
  }
  catch (error) {
    if (error.code === valueAlreadyExistsError) {
      return res.status(409).send('já existe um jogo com o mesmo nome');
    }

    internalError(error, res);
  }
};
