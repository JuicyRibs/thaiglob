const path = require('path');
const fs = require('fs');

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
		imgPath: req.files[0]['filename'] ? req.files[0]['filename'] : null,
		tag: req.body.tag,
		date: req.body.date,
		desc: req.body.desc,
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
		});
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
		if (req.files) {
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
		multimedia.tag = req.body.tag;
		multimedia.date = req.body.date;
		multimedia.desc = req.body.desc;
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
	});
};
