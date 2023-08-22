const bcrypt = require('bcrypt');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const { saltRounds } = require('../utils/consts');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send(user)) // delete send(user)
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

module.exports = { createUser };
