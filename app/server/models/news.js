const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
	title: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);

// const create = async (title, body, imgPath) => {
// 	let news = new newsModel({
// 		title: title,
// 		body: body,
// 		imgPath: imgPath,
// 	});
// 	return news
// 		.save()
// 		.catch((err) => {
// 			return err;
// 		})
// 		.then((data) => {
// 			return true;
// 		});
// };

// module.exports = { newsModel, create };
