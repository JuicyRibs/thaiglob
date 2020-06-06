const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const multimediaSchema = new Schema({
	title: String,
	desc: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

const multimediaModel = mongoose.model('multimedia', multimediaSchema);

const create = async (title, desc, body, imgPath) => {
	let multimedia = new multimediaModel({
		title: title,
		desc: desc,
		body: body,
		imgPath: imgPath,
	});
	return multimedia
		.save()
		.catch((err) => {
			return err;
		})
		.then((data) => {
			return true;
		});
};

module.exports = { multimediaModel, create };
