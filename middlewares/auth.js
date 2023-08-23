const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET = 'secret' } = process.env;

function generateToken(payload) {
  return jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET : 'secret',
    { expiresIn: '3d' },
  );
}

function checkToken(token) {
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new UnauthorizedError('Необходима авторизация');
  }
}

function checkAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;
  try {
    payload = checkToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
}

module.exports = { generateToken, checkToken, checkAuth };
