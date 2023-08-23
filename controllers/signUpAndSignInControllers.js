const bcrypt = require('bcrypt');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const { saltRounds } = require('../utils/consts');
const { generateToken } = require('../middlewares/auth');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(`Пользователь с электронным адресом: ${email} уже зарегистрирован`));
      }

      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      }

      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 3,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(next);
}

module.exports = { createUser, login };
