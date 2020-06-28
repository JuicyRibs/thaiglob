const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const researchSchema = new Schema({
	title: String,
	author: String,
	// institute: String,
	activeYear: String,
	// fundSource: String,
	status: String,
	dlPath: String,
});

module.exports = mongoose.model('Research', researchSchema);
