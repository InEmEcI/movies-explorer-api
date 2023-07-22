/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const ERROR_CODE = require('../utils/errors/ErrorCode');
const NOT_FOUND_ERROR = require('../utils/errors/NotFoundError');
const CONFLICTING_REQUEST_ERROR = require('../utils/errors/ConflictingRequestError');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const newInfo = user.toObject();
      delete newInfo.password;
      res.status(201).send(newInfo);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ERROR_CODE('Переданы некорректные данные'));
      }
      if (error.code === 11000) {
        return next(
          new CONFLICTING_REQUEST_ERROR('Такой пользователь уже существует'),
        );
      }
      return next(error);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch(next);
};

const getAuthUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NOT_FOUND_ERROR('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const idUser = req.user._id;

  User.findOne({ email })
    .then((user) => {
      if (user && String(user._id) !== idUser) {
        return next(new CONFLICTING_REQUEST_ERROR('Такой пользователь уже зарегистрирован'));
      }
    })
    .then(User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    )
      .then((userInfo) => {
        if (!userInfo) {
          return next(new ERROR_CODE('Запрашиваемый пользователь не найден'));
        }
        res.send(userInfo);
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          return next(new ERROR_CODE('Переданы некорректные данные'));
        }
        return next(error);
      }));
};

module.exports = {
  createUser,
  updateUser,
  login,
  getAuthUserInfo,
};
