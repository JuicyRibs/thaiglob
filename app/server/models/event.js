const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	title: String,
	desc: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
	tags: [String],
});

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;
