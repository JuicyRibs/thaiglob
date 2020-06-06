const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
	title: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);

// const create = async (title, body, imgPath) => {
// 	let article = new articleModel({
// 		title: title,
// 		body: body,
// 		imgPath: imgPath,
// 	});
// 	return article
// 		.save()
// 		.catch((err) => {
// 			return err;
// 		})
// 		.then((data) => {
// 			return true;
// 		});
// };

// module.exports = { articleModel, create };
