module.exports = (req, res, next) => {
	// if (error) {
	// 	next(error);
	// }
	// const _end = res.end;
	const _json = res.json;
	res.json = data => {
		console.log('res before', data);
		if (data?.isSuccess === undefined) {
			data = {
				isSuccess: true,
				body: data
			}
		}
		// return next(body);
		console.log('res ', data);
		_json.call(res, data);
		// next();
	}
	next && next();
}
