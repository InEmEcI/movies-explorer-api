const router = require('express').Router();

const {
  createMovieVal,
  deleteMovieByIdVal,
} = require('../utils/validate');
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovieVal, createMovie);

router.delete('/movies/:_id', deleteMovieByIdVal, deleteMovieById);

module.exports = router;
