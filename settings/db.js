const sequelize = require('sequelize');


const conn = sequelize.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root'
})

conn.connect(error => {
	if (error) {
		console.log('Error connect to DB ', error)
	} else {
		console.log('Database connected');
	}
})

module.exports = conn;
