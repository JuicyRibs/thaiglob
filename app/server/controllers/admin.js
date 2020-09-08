const Article = require('../models/article');
const Event = require('../models/event');
const Research = require('../models/research');
const News = require('../models/news');
const Multimedia = require('../models/multimedia');
const Book = require('../models/book');

exports.getIndex = (req, res) => {
	res.render('admin/index');
};

exports.getArticle = (req, res) => {
	res.render('admin/create/article');
};
exports.editArticle = (req, res) => {
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			return next(err);
		}
		res.render('admin/edit/article', {
			data: article,
		});
	});
};

exports.getEvent = (req, res) => {
	res.render('admin/create/event');
};
exports.editEvent = (req, res) => {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return next(err);
		}
		res.render('admin/edit/event', {
			data: event,
		});
	});
};

exports.getMultimedia = (req, res) => {
	res.render('admin/create/media');
};
exports.editMultimedia = (req, res) => {
	Multimedia.findById(req.params.id, function (err, media) {
		if (err) {
			return next(err);
		}
		res.render('admin/edit/media', {
			data: media,
		});
	});
};

exports.getPublication = (req, res) => {
	res.render('admin/create/book');
};
exports.editPublication = (req, res) => {
	Book.findById(req.params.id, function (err, book) {
		if (err) {
			return next(err);
		}
		res.render('admin/edit/book', {
			data: book,
		});
	});
};

exports.getNews = (req, res) => {
	res.render('admin/create/news');
};
exports.editNews = (req, res) => {
	News.findById(req.params.id, function (err, media) {
		if (err) {
			return next(err);
		}
		res.render('admin/edit/news', {
			data: media,
		});
	});
};

exports.getResearch = (req, res) => {
	res.render('admin/create/research');
};
exports.editResearch = (req, res) => {
	Research.findById(req.params.id, function (err, research) {
		if (err) {
			return next(err);
		}
		res.render('admin/edit/research', {
			data: research,
		});
	});
};

exports.getCarousel = (req, res) => {
	res.render('admin/create/carousel');
};
