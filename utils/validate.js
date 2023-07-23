/* eslint-disable no-trailing-spaces */
/* eslint-disable no-useless-escape */
const { celebrate, Joi } = require('celebrate');

const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const loginVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const createUserVal = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const updateUserVal = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

// const updateAvatarVal = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().regex(reg).required(),
//   }),
// });

// const createCardVal = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30).required(),
//     link: Joi.string().regex(reg).required(),
//   }),
// });

const getUserByIdVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

const createMovieVal = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(reg).required(),
    trailerLink: Joi.string().regex(reg).required(),
    thumbnail: Joi.string().regex(reg).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieByIdVal = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

// const dislikeCardVal = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().length(24).hex().required(),
//   }),
// });

// const likeCardVal = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().length(24).hex().required(),
//   }),
// });

module.exports = {
  loginVal,
  createUserVal,
  updateUserVal,
  getUserByIdVal,
  deleteMovieByIdVal,
  createMovieVal,
  // updateAvatarVal,
  // createCardVal,
  // dislikeCardVal,
  // likeCardVal,
};
