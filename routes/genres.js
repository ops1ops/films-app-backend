const router = require('express').Router();
const genresController = require('../controllers/genres');

router.get('/genres', genresController.getAllGenres);
router.get('/genre/:id', genresController.getFilmsByGenreId);

module.exports = router;