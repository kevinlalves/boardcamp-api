import chalk from 'chalk';
import db from '../database/database.connection.js';
import { addQuery, listQuery, showQuery, updateQuery } from '../queries/customers.queries.js';
import { valueAlreadyExistsError } from '../utils/constants/postgres.js';
import { standardBatch } from '../utils/constants/queries.js';
import internalError from '../utils/functions/internalError.js';

export const listCustomers = async (req, res) => {
  console.log(chalk.cyan('GET /customers'));
  const { cpf = '', offset = 0, limit = standardBatch, order = 'id', desc = false } = req.Params;

  try {
    const { rows: customers } = await db.query(listQuery({ order, desc }), [cpf + '%', offset, limit]);

    res.json(customers);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const showCustomer = async (req, res) => {
  console.log(chalk.cyan(`POST /customers/${id}`));
  const { id } = req.Params;

  try {
    const { rows: customers } = await db.query(showQuery(), [id]);

    if (!customers.length) {
      return res.status(404).send('cliente não encontrado');
    }

    res.json(customers[0]);
  }
  catch (error) {
    internalError(error, res);
  }
};

export const addCustomer = async (req, res) => {
  console.log(chalk.cyan('POST /customers'));
  const { cpf, phone, name, birthday } = req.Params;

  try {
    await db.query(addQuery(), [name, phone, cpf, birthday]);

    res.status(201).send();
  }
  catch (error) {
    if (error.code === valueAlreadyExistsError) {
      return res.status(409).send('cpf já cadastrado');
    }

    internalError(error, res);
  }
};



export const updateCustomer = async (req, res) => {
  console.log(chalk.cyan(`PUT /customers/${id}`));
  const { id, cpf, phone, name, birthday } = req.Params;

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
    const { rowCount } = await db.query(updateQuery(setClause), [id]);

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
