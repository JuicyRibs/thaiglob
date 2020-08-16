const path = require('path');
const fs = require('fs');
const moment = require('moment');

const Multimedia = require('../models/multimedia');

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let multimedia = new Multimedia({
		title: req.body.title,
		body: req.body.body,
		imgPath: req.files[0] ? req.files[0]['filename'] : null,
		tag: req.body.tag.split(','),
		date: moment(req.body.date, 'DD-MM-YYYY').add(9, 'hours').toDate(),
		desc: req.body.desc,
		author: req.body.author,
	});
	multimedia.save(function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

/*
    req.body =  {
        query: 'query',
        sortParams: '-date',
        skip: amountToSkip,
        limit: amountToFetch
        }
*/
exports.showByQuery = async function (req, res) {
	let result = await Multimedia.find({
		$or: [
			{ title: { $regex: req.body.query, $options: 'i' } },
			{ body: { $regex: req.body.query, $options: 'i' } },
			{ tag: { $regex: req.body.query, $options: 'i' } },
			{ desc: { $regex: req.body.query, $options: 'i' } },
			{ author: { $regex: req.body.query, $options: 'i' } },
		],
	})
		.sort(req.body.sortParams)
		.skip(parseInt(req.body.skip))
		.limit(parseInt(req.body.limit));
	res.json(result);
};

exports.showById = function (req, res) {
	Multimedia.findById(req.params.id, function (err, multimedia) {
		if (err) {
			return next(err);
		}
		res.render('post', {
			title: 'ThaiGlob - Multimedia',
			data: multimedia,
			type: 'media',
		});
	});
};

exports.jsonById = function (req, res) {
	Multimedia.findById(req.params.id, function (err, data) {
		if (err) {
			return err;
		}
		res.json(data);
	});
};

exports.updateById = function (req, res) {
	Multimedia.findById(req.params.id, function (err, multimedia) {
		if (err) {
			return next(err);
		}
		multimedia.title = req.body.title;
		multimedia.body = req.body.body;
		// if there is new file remove old one
		if (req.files[0]) {
			let oldFile = multimedia.imgPath;
			multimedia.imgPath = req.files[0]['filename'];
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
		multimedia.tag = req.body.tag.split(',');
		multimedia.date = moment(req.body.date, 'DD-MM-YYYY').toDate();
		multimedia.desc = req.body.desc;
		multimedia.author = req.body.author;
		multimedia.save(function (err, multimedia) {
			if (err) {
				return next(err);
			}
			res.status(200).end();
		});
	});
};

exports.delete = function (req, res) {
	Multimedia.findById(req.params.id, function (err, multimedia) {
		if (err) {
			return next(err);
		}
		const filePath = path.resolve('server', 'uploads', multimedia.imgPath);
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
	Multimedia.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

exports.getIndex = function (req, res) {
	res.render('media', {
		title: 'ThaiGlob - Multimedia',
		search: req.query.search,
	});
};
