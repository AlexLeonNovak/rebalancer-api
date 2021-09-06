const ApiErrorException = require('../exceptions/api-error.exception');
const tokenService = require('../services/token.service');

module.exports = function (req, res, next) {
	try {
		const [type, token] = req.headers.authorization?.split(' ');
		if (type !== 'Bearer' || !token) {
			throw new Error();
		}

		const {refreshToken} = req.signedCookies;
		const userData = tokenService.validateAccessToken(token);

		if (!userData || !tokenService.validateRefreshToken(refreshToken)) {
			throw new Error();
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiErrorException.UnauthorizedError());
	}
}
