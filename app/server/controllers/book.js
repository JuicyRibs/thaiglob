const BookModel = require('../models/book');

const escapeRegex = require('../utils/regex-escape');

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
		res.redirect('/admin/');
	});
};

exports.getIndex = async (req, res, next) => {
	// const resPerPage = 9;
	// const page = req.params.page || 1;
	// try {
	// 	var searchQuery = req.query.search,
	// 		regex = new RegExp(escapeRegex(req.query.search), 'gi');
	// 	const books = await bookMongoose
	// 		.find({ title: regex })
	// 		.skip(resPerPage * page - resPerPage)
	// 		.limit(resPerPage);
	// 	const numOfProducts = await bookMongoose.count({ title: regex });
	// 	const pinnedBooks = await bookModel.getPinned();
	// 	res.render('book', {
	// 		title: 'ThaiGlob - Publications',
	// 		books: books,
	// 		pinnedBooks: pinnedBooks,
	// 		currentPage: page,
	// 		pages: Math.ceil(numOfProducts / resPerPage),
	// 		searchVal: searchQuery,
	// 		numOfResults: numOfProducts,
	// 	});
	// } catch (err) {
	// 	throw new Error(err);
	// }
	res.render('book', {
		title: 'ThaiGlob - Publication',
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
	let result = await BookModel.find({
		$or: [{ title: { $regex: req.body.query, $options: 'i' } }],
	})
		.sort(req.body.sortParams)
		.skip(parseInt(req.body.skip))
		.limit(parseInt(req.body.limit));
	res.json(result);
};
