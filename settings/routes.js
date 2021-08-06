const Router = require('express').Router;
const router = new Router();

const indexController = require('../controllers/index.controller');
router.get('/', indexController.index);

const usersController = require('../controllers/users.controller');
router.get('/user', usersController.getUsers);
router.get('/user/activate/:token', usersController.activate);
router.post('/user/register', usersController.register);
router.post('/user/login', usersController.login);

// router.

module.exports = router;
