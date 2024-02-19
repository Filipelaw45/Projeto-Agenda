import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersModel from '../models/usersModel.js';

// eslint-disable-next-line max-len
const generateToken = (userID, secretKey) => jwt.sign({ id: userID }, secretKey, { expiresIn: 86400 });

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await usersModel.getUser(username);
    if (!user) {
      return res.status(400).send({ message: 'Usuário ou senha inválidos' });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).send({ message: 'Usuário ou senha inválidos' });
    }
    const token = generateToken(user.ID_user, process.env.SECRET_JWT);
    return res.send({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Erro ao processar a solicitação' });
  }
};

export default {
  login,
};
