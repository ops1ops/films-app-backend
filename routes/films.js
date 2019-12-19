const router = require('express').Router();
const verifyJWT = require('../middlewares/verifyJWT');
const filmsController = require('../controllers/films');

router.get('/films', filmsController.getAllFilms);
router.get('/film/:id', filmsController.getFilmById);
router.post('/film/:id/rating', verifyJWT, filmsController.rateFilm);
router.get('/search', filmsController.search);
router.put('/film/:id/watchlist', verifyJWT, filmsController.addToWatchlist);
router.delete('/film/:id/watchlist', verifyJWT, filmsController.deleteFromWatchList);

module.exports = router;
