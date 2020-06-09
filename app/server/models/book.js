const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
	title: String,
	dlPath: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', bookSchema);

// const create = async (title, desc, dlpath, imgPath) => {
// 	let book = new bookModel({
// 		title: title,
// 		dlPath: dlpath,
// 		imgPath: imgPath,
// 	});
// 	return book
// 		.save()
// 		.catch((err) => {
// 			return err;
// 		})
// 		.then((data) => {
// 			return true;
// 		});
// };

// module.exports = { bookModel, create };
