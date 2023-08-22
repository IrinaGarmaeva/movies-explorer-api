const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getCurrentuser, updateUserInfo } = require('../controllers/userControllers');
const { EMAIL_REGEX } = require('../utils/consts');

router.get('/', getCurrentuser);
router.patch('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(EMAIL_REGEX),
  }),
}), updateUserInfo);

module.exports = router;
