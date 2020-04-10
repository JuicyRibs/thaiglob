const postModel = require('../models/post');
const postMongoose = postModel.postModel;

const escapeRegex = require('../utils/regex-escape');

exports.create = async (req, res) => {
	var imgPath; /*TODO Implement Upload*/
	const result = await postModel.create(
		req.body.title,
		req.body.desc,
		req.body.body,
		imgPath,
		req.body.tag,
		req.body.author,
		req.body.type
	);
	if (result == true) {
		res.status(201).send('success');
	} else {
		res.status(400).send(result);
	}
};

exports.getNewsPage = async (req, res) => {
	const resPerPage = 9;
	const page = req.params.page || 1;
	try {
		var searchQuery = req.query.search,
			regex = new RegExp(escapeRegex(req.query.search), 'gi');
		const posts = await postMongoose
			.find({
				$and: [
					{ $or: [{ title: regex }, { tag: regex }] },
					{ type: 'news' },
				],
			})
			.skip(resPerPage * page - resPerPage)
			.limit(resPerPage);
		const numOfProducts = await postMongoose.count({
			$and: [
				{ $or: [{ title: regex }, { tag: regex }] },
				{ type: 'news' },
			],
		});
		res.render('news', {
			title: 'ThaiGlob - News',
			posts: posts,
			currentPage: page,
			pages: Math.ceil(numOfProducts / resPerPage),
			searchVal: searchQuery,
			numOfResults: numOfProducts,
		});
	} catch (err) {
		throw new Error(err);
	}
};

exports.getArticlesPage = async (req, res) => {
	const resPerPage = 9;
	const page = req.params.page || 1;
	try {
		var searchQuery = req.query.search,
			regex = new RegExp(escapeRegex(req.query.search), 'gi');
		const posts = await postMongoose
			.find({
				$and: [
					{ $or: [{ title: regex }, { tag: regex }] },
					{ type: 'articles' },
				],
			})
			.skip(resPerPage * page - resPerPage)
			.limit(resPerPage);
		const numOfProducts = await postMongoose.count({
			$and: [
				{ $or: [{ title: regex }, { tag: regex }] },
				{ type: 'articles' },
			],
		});
		res.render('articles', {
			title: 'ThaiGlob - Articles',
			posts: posts,
			currentPage: page,
			pages: Math.ceil(numOfProducts / resPerPage),
			searchVal: searchQuery,
			numOfResults: numOfProducts,
		});
	} catch (err) {
		throw new Error(err);
	}
};

exports.getEventsPage = async (req, res) => {
	const resPerPage = 9;
	const page = req.params.page || 1;
	try {
		var searchQuery = req.query.search,
			regex = new RegExp(escapeRegex(req.query.search), 'gi');
		const posts = await postMongoose
			.find({
				$and: [
					{ $or: [{ title: regex }, { tag: regex }] },
					{ type: 'events' },
				],
			})
			.skip(resPerPage * page - resPerPage)
			.limit(resPerPage);
		const numOfProducts = await postMongoose.count({
			$and: [
				{ $or: [{ title: regex }, { tag: regex }] },
				{ type: 'events' },
			],
		});
		res.render('events', {
			title: 'ThaiGlob - Events',
			posts: posts,
			currentPage: page,
			pages: Math.ceil(numOfProducts / resPerPage),
			searchVal: searchQuery,
			numOfResults: numOfProducts,
		});
	} catch (err) {
		throw new Error(err);
	}
};

exports.getPost = async (req, res) => {
	try {
		const id = req.params.id;
		const post = await postMongoose.findById(id);
		res.render('post', {
			title: 'ThaiGlob - ' + post.title,
			post: post,
		});
	} catch (err) {
		throw new Error(err);
	}
};

exports.getIndex = async (req, res) => {
	try {
		const posts = await postMongoose.find({}).limit(3);
		res.render('index', {
			title: 'ThaiGlob',
			posts: posts,
		});
	} catch (err) {
		throw new Error(err);
	}
};
