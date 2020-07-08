const path = require('path');
const fs = require('fs');

const Article = require('../models/article');
const Event = require('../models/event');
const Research = require('../models/research');
const News = require('../models/news');
const Multimedia = require('../models/multimedia');
const Carousel = require('../models/carousel');
const multimedia = require('../models/multimedia');
const article = require('../models/article');

exports.getIndex = async (req, res) =>
	res.render('index', {
		title: 'ThaiGlob',
	});

exports.getAbout = async (req, res) =>
	res.render('about', {
		title: 'ThaiGlob - Who We Are',
	});

exports.getCorner = async (req, res) =>
	res.render('knowledge_corner', {
		title: 'ThaiGlob - Thailand Climate Changes',
	});

exports.getContact = async (req, res) =>
	res.render('contact', {
		title: 'ThaiGlob - Contact Us',
	});

exports.getIssues = async (req, res) =>
	res.render('issue', {
		title: 'ThaiGlob - Research Issues',
	});

exports.getFile = (req, res) => {
	const fileName = req.params.fileName;
	const filePath = path.resolve('server', 'uploads', fileName);

	try {
		if (fs.existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(`'/pictures/${fileName}': Error due to ${err}`);
	}
};

exports.postQuill = (req, res) => {
	res.json(req.files[0].filename);
};

exports.getCarousel = async (req, res) => {
	let data = [];

	let pinned = await Carousel.find({});

	pinned.forEach((element) => {
		switch (element.type) {
			case article:
				Article.findById(element.postId, function (err, article) {
					if (err) {
						console.log(err);
					}
					data.push({
						title: article.title,
						desc: article.desc,
						imgPath: article.imgPath,
						link: `/articles/${article._id}`,
					});
				});
				break;
			case event:
				Event.findById(element.postId, function (err, event) {
					if (err) {
						console.log(err);
					}
					data.push({
						title: event.title,
						desc: event.desc,
						imgPath: event.imgPath,
						link: `/events/${event._id}`,
					});
				});

				break;
			case multimedia:
				Multimedia.findById(element.postId, function (err, multimedia) {
					if (err) {
						console.log(err);
					}
					data.push({
						title: multimedia.title,
						desc: multimedia.desc,
						imgPath: multimedia.imgPath,
						link: `/media/${multimedia._id}`,
					});
				});
				break;
			case news:
				News.findById(element.postId, function (err, news) {
					if (err) {
						console.log(err);
					}
					data.push({
						title: news.title,
						desc: news.desc,
						imgPath: multimedia.imgPath,
						link: `/news/${news._id}`,
					});
				});
				break;
			default:
				break;
		}
	});
	res.json(data);
};
