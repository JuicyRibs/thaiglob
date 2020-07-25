const path = require('path');
const fs = require('fs');

const Carousel = require('../models/carousel');

exports.create = function (req, res) {
	if (!req.files) {
		res.status(500).send({
			error: 'SERVER ERROR: CANNOT CREATE FILE',
		});
	}
	let carousel = new Carousel({
		header: req.body.header,
		subHeader: req.body.subHeader,
		desc: req.body.desc,
		ctaText: req.body.ctaText,
		ctaLink: req.body.ctaLink,
		imgPath: req.files[0]['filename'] ? req.files[0]['filename'] : null,
		type: req.body.type,
	});
	carousel.save(function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};

exports.showAll = async function (req, res) {
	let result = await Carousel.find({});
	res.json(result);
};

exports.delete = function (req, res) {
	Carousel.findById(req.params.id, function (err, carousel) {
		if (err) {
			return next(err);
		}
		const filePath = path.resolve('server', 'uploads', carousel.imgPath);
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
	Carousel.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			return next(err);
		}
		res.status(200).end();
	});
};
