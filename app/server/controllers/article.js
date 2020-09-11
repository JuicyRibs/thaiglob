const path = require('path');
const fs = require('fs');
var moment = require('moment');

const Article = require('../models/article');

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let article = new Article({
		title: req.body.title,
		body: req.body.body,
		imgPath: req.files[0] ? req.files[0]['filename'] : null,
		tag: req.body.tag.split(','),
		date: moment(req.body.date, 'DD-MM-YYYY').add(9, 'hours').toDate(),
		desc: req.body.desc,
		author: req.body.author,
	});
	article.save(function (err) {
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
	let result = await Article.find({
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
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			throw err;
		}
		res.render('post', {
			title: 'ThaiGlob - Articles and Infographics',
			data: article,
			type: 'articles',
		});
	});
};

exports.jsonById = function (req, res, next) {
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			throw err;
		}
		res.json(article);
	});
};

exports.updateById = function (req, res) {
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			throw err;
		}
		article.title = req.body.title;
		article.body = req.body.body;
		// if there is new file remove old file
		if (req.files[0]) {
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
		article.tag = req.body.tag.split(',');
		article.date = moment(req.body.date, 'DD-MM-YYYY').toDate();
		article.desc = req.body.desc;
		article.author = req.body.author;
		article.save(function (err, article) {
			if (err) {
				console.log(err);
			}
			res.status(200).end();
		});
	});
};

exports.delete = function (req, res) {
	Article.findById(req.params.id, function (err, article) {
		if (err) {
			throw err;
		}
		const filePath = path.resolve('server', 'uploads', article.imgPath);
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
	Article.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			throw err;
		}
		res.status(200).end();
	});
};

exports.getIndex = function (req, res) {
	res.render('articles', {
		title: 'ThaiGlob - Articles',
		search: req.query.search,
	});
};
