const ApiErrorException = require('../exceptions/api-error.exception');

module.exports = (error, req, res) => {
	console.log(error);
	if (error instanceof ApiErrorException) {
		return res.status(error.status).json({
			status: 'error',
			code: error.status,
			message: error.message,
			errors: error.errors
		})
	}
	return res.status(500).json({
		status: 'fail',
		code: 500,
		message: 'Unexpected error'
	})
}
