const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	title: String,
	body: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);

// const create = async (title, body, imgPath) => {
// 	let event = new eventModel({
// 		title: title,
// 		body: body,
// 		imgPath: imgPath,
// 	});
// 	return event
// 		.save()
// 		.catch((err) => {
// 			return err;
// 		})
// 		.then((data) => {
// 			return true;
// 		});
// };

// module.exports = { eventModel, create };
