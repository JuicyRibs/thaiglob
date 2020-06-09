const path = require('path');
const fs = require('fs');

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
		imgPath: req.files[0]['filename'],
	});
	news.save(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/admin/');
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
exports.showByQuery = function (req, res) {
	News.find({
		$or: [
			{ title: { $regex: req.body.query, $options: 'i' } },
			{ body: { $regex: req.body.query, $options: 'i' } },
		],
	})
		.sort(req.body.sortParams)
		.skip(req.body.skip)
		.limit(req.body.limit);
};

exports.showById = function (req, res) {
	News.findById(req.params.id, function (err, news) {
		if (err) {
			return next(err);
		}
		res.send(news);
	});
};

exports.updateById = function (req, res) {
	News.findById(req.params.id, function (err, news) {
		if (err) {
			return next(err);
		}
		news.title = req.body.title;
		// if there is new file remove old one
		if (req.files) {
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
		news.body = req.body.body;
		news.save(function (err, news) {
			if (err) {
				return next(err);
			}
			res.send('/admin/');
		});
	});
};

exports.delete = function (req, res) {
	News.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.send('/admin/');
	});
};

exports.getIndex = function (req, res) {
	res.render('news', {
		title: 'ThaiGlob - News',
	});
};
