const router = require('express').Router();
const { createUser, login } = require('../controllers/signUpAndSignInControllers');
const { signUpValidation, loginValidation } = require('../middlewares/validations');

router.post('/signup', signUpValidation, createUser);

router.post('/signin', loginValidation, login);

module.exports = router;
