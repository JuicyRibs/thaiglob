const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: String,
	desc: String,
	dlPath: String,
	imgPath: String,
	pinned: Boolean,
});

const bookModel = mongoose.model('book', bookSchema);

module.exports = bookModel;
