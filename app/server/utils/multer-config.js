const path = require('path');
const multer = require('multer');

const storageForuploadFile = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(__dirname, '../uploads/'));
	},
	filename: (req, file, callback) => {
		callback(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

const fileFilter = (req, file, callback) => {
	const fileExtension = path.extname(file.originalname).toLowerCase();
	if (
		fileExtension == '.jpg' ||
		fileExtension == '.jpeg' ||
		fileExtension == '.png' ||
		fileExtension == '.pdf' ||
		fileExtension == '.doc' ||
		fileExtension == '.docx'
	) {
		callback(null, true);
	} else {
		callback(new Error(`Not supported file extension: ${fileExtension}`));
	}
};
const uploadFile = multer({
	storage: storageForuploadFile,
	fileFilter: fileFilter,
}).array('files', 2);

module.exports = {
	uploadFile,
};
