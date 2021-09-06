const {HttpCode} = require('../helpers/constants');

const responseBody = (code, data = null) => ({
	status: 'success',
	code,
	...(data ? {data} : {})
})
module.exports =  (req, res, next) => {
	res.Created = (data = null) => res.status(HttpCode.CREATED).json(responseBody(HttpCode.CREATED, data));
	res.OK = (data = null) => res.status(HttpCode.OK).json(responseBody(HttpCode.OK, data));
	res.NoContent = () => res.status(HttpCode.NO_CONTENT).json();

	next();
}
