/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const UNAUTHORIZED_ERROR = require('../utils/errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UNAUTHORIZED_ERROR('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
    );
  } catch (err) {
    return next(new UNAUTHORIZED_ERROR('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
