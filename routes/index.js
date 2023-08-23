const router = require('express').Router();
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');
const signUpAndSignInRoutes = require('./signUpAndSignInRoutes');
const signOutRoute = require('./signOutRoute');
const { checkAuth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.use('/', signUpAndSignInRoutes);
router.use(checkAuth);
router.use('/users/me', userRoutes);
router.use('/movies', movieRoutes);
router.use('/signout', signOutRoute);

router.use('/*', (req, res, next) => next(new NotFoundError('Указан некорректный путь в URL адресе')));

module.exports = router;
