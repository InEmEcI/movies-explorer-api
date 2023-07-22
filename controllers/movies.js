/* eslint-disable consistent-return */
/* eslint-disable no-console */
const ERROR_CODE = require('../utils/errors/ErrorCode');
const NOT_FOUND_ERROR = require('../utils/errors/NotFoundError');
const FORBIDDEN_ERROR = require('../utils/errors/ForbiddenError');

const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const bodyMovie = { ...req.body, owner: req.user._id };
  Movie.create(bodyMovie)
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ERROR_CODE('Переданы некорректные данные'));
      }
      next(error);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NOT_FOUND_ERROR('Запрашиваемый фильм не найден');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new FORBIDDEN_ERROR('Нельзя удалить чужой фильм');
      }
      Movie.findByIdAndRemove(req.params._id)
        .then((user) => res.send(user))
        .catch((error) => {
          if (error.name === 'CastError') {
            throw new ERROR_CODE('ID неверный');
          }
          return next(error);
        });
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
