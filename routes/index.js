const router = require('express').Router();

const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const NotFoundError = require('../errors/notFoundError');

router.use('/users/me', userRoutes);
router.use('/movies', movieRoutes);

router.use('/*', (req, res, next) => next(new NotFoundError('Указан некорректный путь в URL адресе')));

module.exports = router;
