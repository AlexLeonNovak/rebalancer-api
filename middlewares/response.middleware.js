module.exports = (error, req, res, next) => {
	if (error) {
		next(error);
	}
	const json = res.json;
	res.json = data => {
		const body = {
			isSuccess: true,
			body: data
		}
		console.log(body)
		json.apply(res, body);
	}
	next();
}
