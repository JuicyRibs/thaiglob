exports.isAuthenticated = (req, res, next) => {
	return req.isAuthenticated() ? next() : res.redirect('/login');
};
exports.isNotAuthenticated = (req, res, next) => {
	return req.isAuthenticated() ? res.redirect('/admin') : next();
};
