import usersModel from '../models/usersModel.js';

const getAll = async (_req, res) => {
  const users = await usersModel.getAll();
  return res.status(200).json(users);
};

const createUser = async (req, res) => {
  const createdUser = await usersModel.createUser(req.body);
  return res.status(201).json(createdUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await usersModel.deleteUser(id);
  return res.status(204).json();
};

export default {
  getAll,
  createUser,
  deleteUser,
};
