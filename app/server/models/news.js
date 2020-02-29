const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
	title: String,
	desc: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
	tags: [String],
});

const newsModel = mongoose.model('news', newsSchema);

module.exports = newsModel;
