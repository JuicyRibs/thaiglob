require('dotenv').config();

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('./auth/passport-config');
const flash = require('express-flash');
const session = require('express-session');

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true }, () => {})
	.then(() => {
		console.log(`Database connected successfully - ${new Date()}`);
	})
	.catch(err => console.log(err));
const app = express();

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(publicPath, '/views/');

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(cors());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bookRoutes = require('./routes/book');
const postRoutes = require('./routes/posts');
const researchRoutes = require('./routes/reserach');

app.use(authRoutes);
app.use('/admin', adminRoutes);

app.use(bookRoutes);
app.use(postRoutes);
app.use(researchRoutes);
app.use(indexRoutes);

app.listen(process.env.APP_PORT, () => {
	console.log(
		`Server is up on http://localhost:${
			process.env.APP_PORT
		} - ${new Date()}`
	);
});

module.exports = app;
