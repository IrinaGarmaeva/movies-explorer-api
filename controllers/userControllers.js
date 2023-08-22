const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

function getCurrentUser(req, res, next) {
  const userId = req.user._id;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь по указанному _id: ${userId} не найден`);
      }
      res.send(user);
    })
    .catch(next);
}

function updateUserInfo(req, res, next) {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(`Пользователь с указанным _id: ${req.user._id} не найден.`);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
}

module.exports = { getCurrentUser, updateUserInfo };
