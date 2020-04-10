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

const getPinned = async () => {
	return await bookModel.find({ pinned: true }, (err, pinnedBooks) => {
		if (err) return null;
		return pinnedBooks;
	});
};

const create = async (title, desc, dlpath, imgPath, pinned = false) => {
	let book = new bookModel({
		title: title,
		desc: desc,
		dlPath: dlpath,
		imgPath: imgPath,
		pinned: pinned,
	});
	return book
		.save()
		.catch(err => {
			return err;
		})
		.then(data => {
			return true;
		});
};

module.exports = { bookModel, getPinned, create };
