const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
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

module.exports = mongoose.model('Event', EventSchema);
