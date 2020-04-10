exports.getIndex = async (req, res) =>
	res.render('index', {
		title: 'ThaiGlob',
	});

exports.getResearches = async (req, res) =>
	res.render('research', {
		title: 'ThaiGlob - Researches',
	});

exports.getAbout = async (req, res) =>
	res.render('about', {
		title: 'ThaiGlob - Who We Are',
	});

exports.getUpdates = async (req, res) =>
	res.render('updates', {
		title: 'ThaiGlob - Thailand Climate Changes',
	});

exports.getContact = async (req, res) =>
	res.render('contact', {
		title: 'ThaiGlob - Contact Us',
	});

// exports.getPost = async (req, res) =>
// 	res.render('post', {
// 		title: 'ThaiGlob - Contact Us',
// 	});

exports.getMedia = async (req, res) =>
	res.render('media', {
		title: 'ThaiGlob - Media',
	});
