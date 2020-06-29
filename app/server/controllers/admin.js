exports.getIndex = (req, res) => {
	res.render('admin/index');
};

exports.getArticle = (req, res) => {
	res.render('admin/create/article');
};

exports.getEvent = (req, res) => {
	res.render('admin/create/event');
};

exports.getMultimedia = (req, res) => {
	res.render('admin/create/media');
};

exports.getPublication = (req, res) => {
	res.render('admin/create/book');
};

exports.getNews = (req, res) => {
	res.render('admin/create/news');
};

exports.getResearch = (req, res) => {
	res.render('admin/create/research');
};
