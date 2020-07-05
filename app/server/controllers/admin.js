const Article = require('../models/article');
const Event = require('../models/event');

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

exports.getPublication = (req, res) => {
	res.render('admin/create/book');
};

exports.getNews = (req, res) => {
	res.render('admin/create/news');
};

exports.getResearch = (req, res) => {
	res.render('admin/create/research');
};
