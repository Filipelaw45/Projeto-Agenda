// eslint-disable-next-line consistent-return
const validateUserSingUp = (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({ message: 'Nome e numeros são requeridos' });
    }

    if (typeof name !== 'string' || typeof phoneNumber !== 'string') {
      return res.status(400).json({ message: 'Nome e número de telefone devem ser strings' });
    }

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({ message: 'O nome deve ter entre 3 e 50 caracteres' });
    }

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneNumber.match(phoneRegex)) {
      return res.status(400).json({ message: 'Formato de número de telefone inválido. Deve ter 10 ou 11 dígitos' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default validateUserSingUp;
