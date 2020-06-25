const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: String,
	dlPath: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);
