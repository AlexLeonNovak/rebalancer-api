const ApiErrorException = require('../exceptions/api-error.exception');
const tokenService = require('../services/token.service');

module.exports = function (req, res, next) {
	try {
		console.log(req.cookies);
		console.log(req.signedCookies);
		const {authorization} = req.headers;
		if (!authorization) {
			return next(ApiErrorException.UnauthorizedError());
		}

		const [, token] = authorization.split(' ')
		if (!token) {
			return next(ApiErrorException.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken(token);
		if (!userData) {
			return next(ApiErrorException.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiErrorException.UnauthorizedError());
	}
}
