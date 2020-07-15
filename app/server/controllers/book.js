const Book = require('../models/book');
const fs = require('fs');
var moment = require('moment');

exports.create = async (req, res) => {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let book = new Book({
		title: req.body.title,
		imgPath: req.files[0]['filename'],
		dlPath: req.files[1]['filename'],
		date: moment(req.body.date, 'DD-MM-YYYY').toDate(),
	});
	book.save(function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

exports.getIndex = async (req, res, next) => {
	res.render('book', {
		title: 'ThaiGlob - Publication',
	});
};
exports.showByQuery = async function (req, res) {
	let result = await Book.find({
		$or: [{ title: { $regex: req.body.query, $options: 'i' } }],
	})
		.sort(req.body.sortParams)
		.skip(parseInt(req.body.skip))
		.limit(parseInt(req.body.limit));
	res.json(result);
};

exports.delete = function (req, res) {
	Book.findById(req.params.id, function (err, book) {
		if (err) {
			return next(err);
		}
		const imgPath = path.resolve('server', 'uploads', book.imgPath);
		const dlPath = path.resolve('server', 'uploads', book.dlPath);
		try {
			if (fs.existsSync(imgPath)) {
				fs.unlinkSync(imgPath, function (err) {
					if (err) {
						console.error(err);
					}
					console.log('File has been Deleted');
				});
			}
			if (fs.existsSync(dlPath)) {
				fs.unlinkSync(dlPath, function (err) {
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
			return next(err);
		}
		res.status(200).end();
	});
};
