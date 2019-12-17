const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT');
const filmsController = require('../controllers/films');

router.get('/films', filmsController.getAllFilms);
router.get('/film/:id', filmsController.getFilmById);
router.post('/film/:id/rating', verifyJWT, filmsController.rateFilm);

module.exports = router;
