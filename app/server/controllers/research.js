const researchModel = require('../models/research');
const reseachMongoose = researchModel.researchModel;

exports.create = async (req, res) => {
	var dlPath; /*TODO Implement Upload*/
	const result = await researchModel.create(
		req.body.title,
		req.body.author,
		req.body.institute,
		req.body.activeYear,
		req.body.fundSource,
		req.body.status,
		dlPath
	);
	if (result == true) {
		res.status(201).send('success');
	} else {
		res.status(400).send(result);
	}
};

exports.getResearchPage = async (req, res) => {
	const researches = await reseachMongoose.find({});
	res.render('research', {
		title: 'ThaiGlob - Researches',
		researches: researches,
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
