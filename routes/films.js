const router = require('express').Router();
const filmsController = require('../controllers/films');

router.get('/films', filmsController.getAllFilms);
router.get('/film/:id', filmsController.getFilmById);
router.post('/film/:id', filmsController.rateFilm);

module.exports = router;
