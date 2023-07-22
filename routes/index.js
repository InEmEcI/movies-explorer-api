const router = require('express').Router();

const { loginVal, createUserVal } = require('../utils/validate');

const NOT_FOUND_ERROR = require('../utils/errors/NotFoundError');

const auth = require('../middlewares/auth');

const movieRoutes = require('./movies');
const userRoutes = require('./users');

const { login, createUser } = require('../controllers/users');

router.post('/signin', loginVal, login);
router.post('/signup', createUserVal, createUser);

router.use(auth);

router.use(userRoutes);
router.use(movieRoutes);

router.use('/', (req, res, next) => {
  next(new NOT_FOUND_ERROR('Страница не найдена'));
});

module.exports = router;
