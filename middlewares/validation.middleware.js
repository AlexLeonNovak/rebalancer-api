const ErrorException = require('../exceptions/api-error.exception');

module.exports = (schema) => async (req, res, next) => {
	try {
		await schema.validateAsync(req.body, {abortEarly: false});
		return next();
	} catch (e) {
		const errors = e.details.map(err => ({
			...err,
			message: err.message.replace(/"/g, "")
		}))
		next(ErrorException.BadRequest('Validation error', errors))
	}
}
