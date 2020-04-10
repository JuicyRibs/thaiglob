const bookModel = require('../models/book');
const bookMongoose = bookModel.bookModel;

const escapeRegex = require('../utils/regex-escape');

exports.create = async (req, res) => {
	var dlPath; /*TODO Implement Upload*/
	var imgPath; /*TODO Implement Upload*/
	const result = await bookModel.create(
		req.body.title,
		req.body.desc,
		dlPath,
		imgPath,
		req.body.pinned
	);
	if (result == true) {
		res.status(201).send('success');
	} else {
		res.status(400).send(result);
	}
};

exports.getPinned = async (req, res) => {
	const books = await bookModel.getPinned();
	if (books == null) {
		res.status(204);
		res.json(null);
	}
	res.json(books);
};

exports.getBooksPage = async (req, res, next) => {
	const resPerPage = 9;
	const page = req.params.page || 1;
	try {
		var searchQuery = req.query.search,
			regex = new RegExp(escapeRegex(req.query.search), 'gi');
		const books = await bookMongoose
			.find({ title: regex })
			.skip(resPerPage * page - resPerPage)
			.limit(resPerPage);
		const numOfProducts = await bookMongoose.count({ title: regex });
		const pinnedBooks = await bookModel.getPinned();
		res.render('book', {
			title: 'ThaiGlob - Publications',
			books: books,
			pinnedBooks: pinnedBooks,
			currentPage: page,
			pages: Math.ceil(numOfProducts / resPerPage),
			searchVal: searchQuery,
			numOfResults: numOfProducts,
		});
	} catch (err) {
		throw new Error(err);
	}
};
