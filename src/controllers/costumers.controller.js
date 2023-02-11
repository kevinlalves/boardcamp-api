import chalk from 'chalk';
import pool from '../database/database.connection.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { standardBatch } from '../utils/constants/queries.js';
import internalError from '../utils/functions/internalError.js';

export const listCostumers = async (req, res) => {
  const { cpf = '', offset = 0, limit = standardBatch, order = 'id', desc = false } = req.Params;

  console.log(chalk.cyan('GET /costumers'));

  try {
    const query = `
      SELECT * FROM costumers
      WHERE cpf LIKE $1
      ORDER BY ${order} ${desc === 'true' ? 'DESC' : 'ASC'}
      OFFSET $2
      LIMIT $3;
    `;

    const { rows: costumers } = await pool.query(query, [cpf + '%', offset, limit]);

    res.json(costumers);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const showCostumer = async (req, res) => {
  const { id } = req.Params;

  console.log(chalk.cyan(`POST /costumers/${id}`));

  try {
    const query = `
      SELECT * FROM costumers
      WHERE id = $1;
    `;

    const { rows: costumers } = await pool.query(query, [id]);

    if (!costumers.length) {
      return res.status(404).send('cliente não encontrado');
    }

    res.json(costumers[0]);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const addCostumer = async (req, res) => {
  const { cpf, phone, name, birthday } = req.Params;

  console.log(chalk.cyan('POST /costumers'));

  try {
    const query = `
      INSERT INTO costumers (name, phone, cpf, birthday) VALUES
      ($1, $2, $3, $4);
    `;

    await pool.query(query, [name, phone, cpf, birthday]);

    res.status(201).send();
  }
  catch (error) {
    if (error.code === valueAlreadyExistsError) {
      res.status(409).send('cpf já cadastrado');
    }

    internalError(error, res);
  }
};



export const updateCostumer = async (req, res) => {
  const { id, cpf, phone, name, birthday } = req.Params;

  console.log(chalk.cyan(`PUT /costumers/${id}`));

  const setClause = [
    cpf && `cpf='${cpf}'`,
    phone && `phone='${phone}'`,
    name && `name='${name}'`,
    birthday && `birthday='${birthday}'`
  ].filter(Boolean).join(',');

  if (setClause === '') {
    return res.status(422).send('mande algum parâmetro a ser alterado');
  }

  try {
    const query = `
      UPDATE costumers
      SET ${setClause}
      WHERE id=$1;
    `;

    const { rowCount } = await pool.query(query, [id]);

    if(!rowCount) {
      return res.status(404).send('cliente não encontrado');
    }

    res.send();
  }
  catch (error) {
    if (error.code === valueAlreadyExistsError) {
      return res.status(409).send('novo cpf já existe no sistema');
    }

    internalError(error, res);
  }
};
