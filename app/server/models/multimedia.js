const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MultimediaSchema = new Schema({
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
});

module.exports = mongoose.model('Multimedia', MultimediaSchema);
