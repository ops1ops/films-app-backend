const router = require('express').Router();
const actorsController = require('../controllers/actors');

router.get('/actors', actorsController.getAllActors);
router.get('/actor/:id', actorsController.getActorById);

module.exports = router;