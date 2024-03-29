const {
  JWT_SECRET = 'dev-key',
} = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/un-authorized-err');

// проверка наличия токена и его верификация
module.exports = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация.'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
