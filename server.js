require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');
const ApiErrorException = require('./exceptions/api-error.exception')
const sequelize = require('./models').sequelize;
const {responseMethodsMiddleware, errorMiddleware} = require('./middlewares');

const app = express();
const port = process.env.PORT || 3030;

app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: 10000}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
	credentials: true,
	origin: true
}));
app.use(responseMethodsMiddleware);
app.use('/', routes);
app.use((_, __, next) =>
	next(ApiErrorException.NotFound())
);
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
