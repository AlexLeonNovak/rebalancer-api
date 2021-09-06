const {Router} = require('express');

const router = new Router();
const authController = require('../../controllers/auth.controller');
const {
	validationMiddleware,
	controllerWrapperMiddleware
} = require('../../middlewares');

const {User} = require('../../models');

router.post('/register',
	validationMiddleware(User.registerJoiSchema),
	controllerWrapperMiddleware(authController.register)
);

router.post('/login',
	controllerWrapperMiddleware(authController.login)
);
router.post('/logout',
	controllerWrapperMiddleware(authController.logout)
);

router.get('/activate/:token',
	controllerWrapperMiddleware(authController.activate)
);

router.get('/refresh',
	controllerWrapperMiddleware(authController.refresh)
);


module.exports = router;
