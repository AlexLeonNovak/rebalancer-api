'use strict';

exports.status = (values, res) => {
	console.log(values);
	const data = {
		status: 200,
		values
	}

	res.json(data);
	res.end();
}


