import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.js';

// eslint-disable-next-line max-len
const generateToken = (userID) => jwt.sign({ id: userID }, process.env.SECRET_JWT, { expiresIn: 86400 });

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await usersModel.getUser(username);

  if (!user) {
    return res.status(400).send({ message: 'Usuário ou senha inválidos' });
  }

  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(400).send({ message: 'Usuário ou senha inválidos' });
  }

  const token = generateToken(user.ID_user);

  return res.send({ token });
};

export default {
  login,
};
