const Router = require('express').Router;
const router = new Router();

const indexController = require('../controllers/indexController');
const usersController = require('../controllers/users.controller');

router.get('/', indexController.index);
router.get('/user', usersController.getUsers);
router.post('/user/register', usersController.register);

module.exports = router;
