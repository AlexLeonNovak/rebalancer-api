'use strict';

const response = require('./../response');

exports.users = (req, res) => {
	const users = [
		{
			id: 1,
			name: 'Alex'
		},
		{
			id: 2,
			name: 'John'
		}
	]

	response.status(users, res);
}
