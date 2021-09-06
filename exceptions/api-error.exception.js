module.exports = class ApiErrorException extends Error {
	status;
	errors;
	isSuccess;

	constructor(status, message, errors) {
		super(message);
		this.status = status;
		this.errors = errors;
		this.isSuccess = false;
	}

	static UnauthorizedError() {
		return new this(401, 'User not authorized');
	}

	static BadRequest(message, errors = []) {
		return new this(400, message, errors);
	}

	static NotFound() {
		return new this(404, 'Not found');
	}
}
