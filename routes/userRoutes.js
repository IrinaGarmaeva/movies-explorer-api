const router = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/userControllers');
const { updateUserInfoValidation } = require('../middlewares/validations');

router.get('/', getCurrentUser);
router.patch('/', updateUserInfoValidation, updateUserInfo);

module.exports = router;
