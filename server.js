const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3030;
const routes = require('./settings/routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/api', routes)

app.listen(port, () => {
	console.log(`App starts on port ${port}`);
})
console.log(process.env.NODE_ENV)
