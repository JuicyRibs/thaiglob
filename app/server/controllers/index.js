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

var moment = require('moment'); // require
moment().format(); 

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
