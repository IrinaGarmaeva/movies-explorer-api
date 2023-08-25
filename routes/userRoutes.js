const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/userControllers');
const { updateUserInfoValidation } = require('../middlewares/validations');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
