const path = require('path');
const fs = require('fs');

const Article = require('../models/article');
const escapeRegex = require('../utils/regex-escape');

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let article = new Article({
		title: req.body.title,
		body: req.body.body,
		imgPath: req.files[0]['filename'],
	});
	article.save(function (err) {
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
	let query = new RegExp(escapeRegex(req.body.query), 'gi');
	Article.find({
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
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			return next(err);
		}
		res.send(article);
	});
};

exports.updateById = function (req, res) {
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			return next(err);
		}
		article.title = req.body.title;
		// if there is new file remove old one
		if (req.files) {
			let oldFile = article.imgPath;
			article.imgPath = req.files[0]['filename'];
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
		article.body = req.body.body;
		article.save(function (err, product) {
			if (err) {
				return next(err);
			}
			res.send('/admin/');
		});
	});
};

exports.delete = function (req, res) {
	Article.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.send('/admin/');
	});
};
