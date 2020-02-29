const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: String,
	desc: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
	tags: [String],
});

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
