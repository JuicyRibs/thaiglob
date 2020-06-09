const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MultimediaSchema = new Schema({
	title: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Multimedia', MultimediaSchema);

// const create = async (title, body, imgPath) => {
// 	let multimedia = new multimediaModel({
// 		title: title,
// 		body: body,
// 		imgPath: imgPath,
// 	});
// 	return multimedia
// 		.save()
// 		.catch((err) => {
// 			return err;
// 		})
// 		.then((data) => {
// 			return true;
// 		});
// };

// module.exports = { multimediaModel, create };
