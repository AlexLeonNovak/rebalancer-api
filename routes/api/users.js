const {Router} = require('express');

const router = new Router();
const usersController = require('../../controllers/users.controller');
const {authMiddleware, controllerWrapperMiddleware} = require('../../middlewares');

router.get('/',
	authMiddleware,
	controllerWrapperMiddleware(usersController.getUsers)
);


module.exports = router;
