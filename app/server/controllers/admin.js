exports.getIndex = (req, res) => {
	res.render('admin/index');
};

exports.getArticle = (req, res) => {
	res.render('admin/article');
};

exports.getEvent = (req, res) => {
	res.render('admin/event');
};

exports.getMultimedia = (req, res) => {
	res.render('admin/media');
};

exports.getPublication = (req, res) => {
	res.render('admin/book');
};

exports.getNews = (req, res) => {
	res.render('admin/news');
};

exports.getResearch = (req, res) => {
	res.render('admin/research');
};
