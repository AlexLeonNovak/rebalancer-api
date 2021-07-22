const Router = require('express').Router;
const router = new Router();

const indexController = require('./../Controller/indexController');
const usersController = require('./../Controller/usersController');

router.get('/', indexController.index);
router.get('/users', usersController.users);

module.exports = router;
