const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarouselSchema = new Schema({
	header: String,
	subHeader: String,
	desc: String,
	ctaText: String,
	ctaLink: String,
	imgPath: String,
	date: { type: Date, default: Date.now },
	type: { type: Number, default: 0 },
});

module.exports = mongoose.model('Carousel', CarouselSchema);
