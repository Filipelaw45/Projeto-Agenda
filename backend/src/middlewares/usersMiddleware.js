import usersModel from '../models/usersModel.js';
/* eslint-disable consistent-return */
const validateUserInput = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordMinLength = 6;

    if (!username.match(usernameRegex)) {
      return res.status(400).json({ message: 'Username deve conter apenas letras e numeros' });
    }

    if (password.length < passwordMinLength) {
      return res.status(400).json({ message: 'Senha deve possuir no minimo 6 caracteres' });
    }

    const existingUser = await usersModel.getUser(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username já está em uso' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default validateUserInput;
