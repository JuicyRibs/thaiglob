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
		imgPath: req.files[0]['filename'],
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
		res.send(event);
	});
};

exports.updateById = function (req, res) {
	Event.findById(req.params.id, function (err, event) {
		if (err) {
			return next(err);
		}
		event.title = req.body.title;
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
		event.body = req.body.body;
		event.save(function (err, event) {
			if (err) {
				return next(err);
			}
			res.send('/admin/');
		});
	});
};

exports.delete = function (req, res) {
	Event.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.send('/admin/');
	});
};

exports.getIndex = function (req, res) {
	res.render('events', {
		title: 'ThaiGlob - Events',
	});
};
