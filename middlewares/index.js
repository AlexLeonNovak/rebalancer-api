const authMiddleware = require('./auth.middleware');
const errorMiddleware = require('./error.middleware');
const responseMethodsMiddleware = require('./response-methods.middleware');
const controllerWrapperMiddleware = require('./controller-wrapper.middleware');
const validationMiddleware = require('./validation.middleware');

module.exports = {
	authMiddleware,
	errorMiddleware,
	responseMethodsMiddleware,
	controllerWrapperMiddleware,
	validationMiddleware
}
