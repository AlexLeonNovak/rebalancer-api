require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3030;
const routes = require('./settings/routes');
const errorMiddleware = require('./middlewares/error.middleware');
const sequelize = require('./models').sequelize;
// const responseMiddleware = require('./middlewares/response.middleware');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
	credentials: true,
	origin: true
}));
// app.use(responseMiddleware);
app.use('/api', routes);
app.use(errorMiddleware);

const start = async () => {
	try {
		await sequelize.authenticate();
		app.listen(port, () => {
			console.log(`App starts on port ${port}`);
		})
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		console.log('Restart after 5 seconds...')
		setTimeout(start, 5000);
	}
}

start();
