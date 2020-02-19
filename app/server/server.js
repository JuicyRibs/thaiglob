require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true })
	.then(() => {
		console.log(
			`Database connected successfully ${
				process.env.DB_URI
			} - ${new Date()}`
		);
	})
	.catch(err => console.log(err));

const app = express();
const initPassport = require('./middlewares/passport-config');
initPassport(passport);

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(publicPath, '/views/');

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(cors());
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());

app.disable('x-powered-by');

const indexRoutes = require('./routes/index');

app.use(indexRoutes);

app.listen(process.env.APP_PORT, () => {
	console.log(
		`Server is up on http://localhost:${
			process.env.APP_PORT
		} - ${new Date()}`
	);
});

module.exports = app;
