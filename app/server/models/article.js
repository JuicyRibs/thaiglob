const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
	tag: [
		{
			type: String,
		},
	],
	desc: String,
	author: String,
});

module.exports = mongoose.model('Article', ArticleSchema);
