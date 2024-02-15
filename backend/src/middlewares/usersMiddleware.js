const test = (req, res, next) => {
  console.log('passei no middleware');

  next();
};

export default {
  test,
};
