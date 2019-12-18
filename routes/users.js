const router = require('express').Router();
const usersController = require('../controllers/users');
const verifyJWT = require('../middlewares/verifyJWT');

router.post('/signin', usersController.signIn);
router.get('/user/:id', usersController.getUserById);

module.exports = router;