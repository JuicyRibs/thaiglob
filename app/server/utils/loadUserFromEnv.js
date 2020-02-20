const bcrypt = require('bcrypt');
require('dotenv').config();

const getAdmin = async () => {
	try {
		const hashedPassword = await bcrypt.hash(
			process.env.ADMIN_PASSWORD,
			10
		);
		const admin = {
			username: process.env.ADMIN_USERNAME,
			password: hashedPassword,
		};
		return admin;
	} catch {
		console.log('Error getting admin');
	}
};

exports.getAdmin = getAdmin;
