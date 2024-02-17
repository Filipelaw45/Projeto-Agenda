import bcrypt from 'bcrypt';
import usersModel from '../models/usersModel.js';

const getUsers = async (_req, res) => {
  const users = await usersModel.getUsers();
  return res.status(200).json(users);
};

const getUserById = async (id) => {
  const user = await usersModel.getUserById(id);
  return user;
};

const createUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const createdUser = await usersModel.createUser(req.body);
  return res.status(201).json(createdUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await usersModel.deleteUser(id);
  return res.status(204).json();
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  await usersModel.updateUser(id, req.body);
  return res.status(204).json();
};

export default {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
