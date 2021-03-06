const path = require('path');
const fs = require('fs');
const moment = require('moment');

const News = require('../models/news');

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let news = new News({
		title: req.body.title,
		body: req.body.body,
		imgPath: req.files[0] ? req.files[0]['filename'] : null,
		tag: req.body.tag.split(','),
		date: moment(req.body.date, 'DD-MM-YYYY').add(9, 'hours').toDate(),
		desc: req.body.desc,
		author: req.body.author,
	});
	news.save(function (err) {
		if (err) {
			throw err;
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
	let result = await News.find({
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
	News.findById(req.params.id, function (err, news) {
		if (err) {
			throw err;
		}
		res.render('post', {
			title: 'ThaiGlob - News',
			data: news,
			type: 'news',
		});
	});
};

exports.jsonById = function (req, res, next) {
	News.findById(req.params.id, function (err, data) {
		if (err) {
			throw err;
		}
		res.json(data);
	});
};

exports.updateById = function (req, res) {
	News.findById(req.params.id, function (err, news) {
		if (err) {
			throw err;
		}
		news.title = req.body.title;
		news.body = req.body.body;
		// if there is new file remove old one
		if (req.files[0]) {
			let oldFile = news.imgPath;
			news.imgPath = req.files[0]['filename'];
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
		news.tag = req.body.tag.split(',');
		news.date = moment(req.body.date, 'DD-MM-YYYY').toDate();
		news.desc = req.body.desc;
		news.author = req.body.author;
		news.save(function (err, news) {
			if (err) {
				throw err;
			}
			res.status(200).end();
		});
	});
};

exports.delete = function (req, res) {
	News.findById(req.params.id, function (err, news) {
		if (err) {
			throw err;
		}
		const filePath = path.resolve('server', 'uploads', news.imgPath);
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
	News.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			throw err;
		}
		res.status(200).end();
	});
};

exports.getIndex = function (req, res) {
	res.render('news', {
		title: 'ThaiGlob - News',
		search: req.query.search,
	});
};
