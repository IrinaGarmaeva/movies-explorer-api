const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

function getMovies(req, res, next) {
  return Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки.',
          ),
        );
      }
      return next(err);
    });
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(`Фильм с указанным _id: ${movieId} не найден`);
      }

      if (String(movie.owner) !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }

      return Movie.findByIdAndRemove(movieId)
        .then((data) => res.send(data))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при удалении фильма.',
          ),
        );
      }
      return next(err);
    });
}
module.exports = { getMovies, createMovie, deleteMovie };
