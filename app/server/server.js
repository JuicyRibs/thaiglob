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
	.connect(
		process.env.DB_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		() => {}
	)
	.then(() => {
		console.log(`Database connected successfully - ${new Date()}`);
	})
	.catch((err) => console.log(err));
const app = express();

const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(publicPath, '/views/');

app.set('view engine', 'ejs');
app.set('views', viewPath);

app.use(cors());
app.use(express.static(publicPath));
app.use(express.json({ limit: 1048576000 }));
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

const appRoutes = require('./routes/app');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bookRoutes = require('./routes/book');
const articleRoutes = require('./routes/article');
const multimediaRoutes = require('./routes/multimedia');
const eventsRoutes = require('./routes/events');
const newsRoutes = require('./routes/news');
const researchRoutes = require('./routes/research');

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use('/articles', articleRoutes);
app.use('/media', multimediaRoutes);
app.use('/events', eventsRoutes);
app.use('/news', newsRoutes);
app.use('/media', multimediaRoutes);
app.use('/publication', bookRoutes);
app.use('/research', researchRoutes);
app.use(appRoutes);

app.listen(process.env.APP_PORT, () => {
	console.log(
		`Server is up on http://localhost:${
			process.env.APP_PORT
		} - ${new Date()}`
	);
});

module.exports = app;
