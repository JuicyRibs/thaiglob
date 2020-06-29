const path = require('path');
const fs = require('fs');

const Event = require('../models/event');

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let event = new Event({
		title: req.body.title,
		body: req.body.body,
		imgPath: req.files[0]['filename'] ? req.files[0]['filename'] : null,
		tag: req.body.tag,
		date: req.body.date,
		desc: req.body.desc,
	});
	event.save(function (err) {
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
	let result = await Event.find({
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
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return next(err);
		}
		res.send('post', {
			title: 'ThaiGlob - Events',
			data: event,
		});
	});
};

exports.jsonById = function (req, res) {
	Event.findById(req.params.id, function (err, data) {
		if (err) {
			return next(err);
		}
		res.json(data);
	});
};

exports.updateById = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return next(err);
		}
		event.title = req.body.title;
		event.body = req.body.body;
		// if there is new file remove old one
		if (req.files) {
			let oldFile = event.imgPath;
			event.imgPath = req.files[0]['filename'];
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
		event.tag = req.body.tag;
		event.date = req.body.date;
		event.desc = req.body.desc;
		event.save(function (err, event) {
			if (err) {
				return next(err);
			}
			res.status(200).end();
		});
	});
};

exports.delete = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return next(err);
		}
		const filePath = path.resolve('server', 'uploads', event.imgPath);
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
	Event.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

exports.getIndex = function (req, res) {
	res.render('events', {
		title: 'ThaiGlob - Events',
	});
};
