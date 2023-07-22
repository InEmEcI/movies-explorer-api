const router = require('express').Router();

const {
  // getUsers,
  // getUserById,
  // updateAvatar,
  updateUser,
  getAuthUserInfo,
} = require('../controllers/users');

const {
  // updateAvatarVal,
  // getUserByIdVal,
  updateUserVal,
} = require('../utils/validate');

router.get('/users/me', getAuthUserInfo);

router.patch('/users/me', updateUserVal, updateUser);

// router.get('/users', getUsers);

// router.get('/users/:_id', getUserByIdVal, getUserById);

// router.patch('/users/me/avatar', updateAvatarVal, updateAvatar);

module.exports = router;
