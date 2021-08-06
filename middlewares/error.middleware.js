const ApiErrorException = require('../exceptions/api-error.exception');

module.exports = (error, req, res, next) => {
	console.log(error);
	if (error instanceof ApiErrorException) {
		return res.status(error.status).json({
			isSuccess: false,
			message: error.message,
			errors: error.errors
		})
	}
	return res.status(500).json({
		isSuccess: false,
		message: 'Unexpected error'
	})
}
