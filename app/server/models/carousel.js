const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
	type: String,
	postId: String,
});

module.exports = mongoose.model('Carousel', CarouselSchema);
