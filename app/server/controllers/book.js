const BookModel = require('../models/book');

exports.create = async (req, res) => {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let book = new BookModel({
		title: req.body.title,
		imgPath: req.files[0]['filename'],
		dlPath: req.files[1]['filename'],
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
	let result = await BookModel.find({
		$or: [{ title: { $regex: req.body.query, $options: 'i' } }],
	})
		.sort(req.body.sortParams)
		.skip(parseInt(req.body.skip))
		.limit(parseInt(req.body.limit));
	res.json(result);
};
