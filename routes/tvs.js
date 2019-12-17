const router = require('express').Router();
const tvsControlles = require('../controllers/tvs');

router.get('/tvs', tvsControlles.getAllTVs);
router.get('/tv/:id', tvsControlles.getTVById);

module.exports = router;
