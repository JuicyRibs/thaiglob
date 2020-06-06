const path = require('path');
const fs = require('fs');

exports.getIndex = async (req, res) =>
	res.render('index', {
		title: 'ThaiGlob',
	});

exports.getResearches = async (req, res) =>
	res.render('research', {
		title: 'ThaiGlob - Researches',
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

// exports.getPost = async (req, res) =>
// 	res.render('post', {
// 		title: 'ThaiGlob - Contact Us',
// 	});

exports.getMedia = async (req, res) =>
	res.render('media', {
		title: 'ThaiGlob - Media',
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
