const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movieControllers');
const { URL_REGEX } = require('../utils/consts');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEX),
    trailerLink: Joi.string().required().pattern(URL_REGEX),
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exxports = router;
