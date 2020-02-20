const passport = require('../auth/passport-config');

exports.getLogin = (req, res) => {
	res.render('admin/login');
};
exports.postLogin = passport.authenticate('local', {
	successRedirect: '/admin',
	failureRedirect: '/login',
	failureFlash: true,
});
exports.postLogout = (req, res) => {
	req.session.destroy(err => {
		res.redirect('/');
	});
};
