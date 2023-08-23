const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movieControllers');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);
router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
