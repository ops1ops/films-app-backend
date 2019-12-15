const router = require('express').Router();
const usersController = require('../controllers/users');

router.post('/signin', usersController.signIn);

module.exports = router;