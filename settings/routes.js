const Router = require('express').Router;
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

const indexController = require('../controllers/index.controller');
router.get('/', indexController.index);

const usersController = require('../controllers/users.controller');
router.get('/user', authMiddleware, usersController.getUsers);
router.get('/user/activate/:token', usersController.activate);
router.get('/user/refresh', usersController.refresh);
router.post('/user/register', usersController.register);
router.post('/user/login', usersController.login);
router.post('/user/logout', usersController.logout);


module.exports = router;
