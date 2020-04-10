const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	desc: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
	tags: String,
	author: String,
	type: String,
});

const postModel = mongoose.model('post', postSchema);

const create = async (title, desc, body, imgPath, tags, author, type) => {
	let book = new postModel({
		title: title,
		desc: desc,
		body: body,
		imgPath: imgPath,
		tags: tags,
		author: author,
		type: type,
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

module.exports = { postModel, create };
