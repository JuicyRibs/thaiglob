const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
	title: String,
	desc: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

const newsModel = mongoose.model('news', newsSchema);

const create = async (title, desc, body, imgPath) => {
	let news = new newsModel({
		title: title,
		desc: desc,
		body: body,
		imgPath: imgPath,
	});
	return news
		.save()
		.catch((err) => {
			return err;
		})
		.then((data) => {
			return true;
		});
};

module.exports = { newsModel, create };
