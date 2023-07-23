const router = require('express').Router();

const {
  updateUser,
  getAuthUserInfo,
} = require('../controllers/users');

const {
  updateUserVal,
} = require('../utils/validate');

router.get('/users/me', getAuthUserInfo);

router.patch('/users/me', updateUserVal, updateUser);

module.exports = router;
