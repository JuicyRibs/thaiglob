const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const researchSchema = new Schema({
	title: String,
	author: String,
	institute: String,
	activeYear: String,
	fundSource: String,
	status: String,
	dlPath: String,
});

const researchModel = mongoose.model('research', researchSchema);

const create = async (
	title,
	author,
	institute,
	activeYear,
	fundSource,
	status,
	dlPath
) => {
	let research = new researchModel({
		title: title,
		author: author,
		institute: institute,
		activeYear: activeYear,
		fundSource: fundSource,
		status: status,
		dlPath: dlPath,
	});
	return research
		.save()
		.catch(err => {
			return err;
		})
		.then(data => {
			return true;
		});
};

module.exports = { researchModel, create };
