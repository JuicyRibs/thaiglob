const path = require('path');
const fs = require('fs');

const Research = require('../models/research');

exports.showAll = async function (req, res) {
	let result = await Research.find({})
		.sort(req.body.sortParams)
		.skip(parseInt(req.body.skip))
		.limit(parseInt(req.body.limit));
	res.json(result);
};

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let research = new Research({
		title: req.body.title,
		author: req.body.author,
		institute: req.body.institute,
		activeYear: req.body.activeYear,
		fundSource: req.body.fundSource,
		status: req.body.status,
		dlPath: req.files[0] ? req.files[0]['filename'] : null,
	});
	research.save(function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

exports.updateById = function (req, res) {
	Research.findById(req.params.id, function (err, research) {
		if (err) {
			return next(err);
		}
		research.title = req.body.title;
		research.author = req.body.author;
		research.institute = req.body.institute;
		research.activeYear = req.body.activeYear;
		research.fundSource = req.body.fundSource;
		research.status = req.body.status;
		// if there is new file remove old file
		if (req.files) {
			let oldFile = research.imgPath;
			research.imgPath = req.files[0]['filename'];
			const filePath = path.resolve('server', 'uploads', oldFile);
			try {
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath, function (err) {
						if (err) {
							console.error(err);
						}
						console.log('File has been Deleted');
					});
				}
			} catch (error) {
				console.log(error);
			}
		}
		research.save(function (err, research) {
			if (err) {
				return next(err);
			}
			res.status(200).end();
		});
	});
};

exports.delete = function (req, res) {
	Research.findById(req.params.id, function (err, research) {
		if (err) {
			return next(err);
		}
		const filePath = path.resolve('server', 'uploads', research.imgPath);
		try {
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath, function (err) {
					if (err) {
						console.error(err);
					}
					console.log('File has been Deleted');
				});
			}
		} catch (error) {
			console.log(error);
		}
	});
	Research.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

exports.getIndex = async function (req, res) {
	const researches = await Research.find({});
	res.render('research', {
		title: 'ThaiGlob - Researches',
		researches: researches,
	});
};
