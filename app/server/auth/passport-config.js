const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'username',
		},
		async (username, password, done) => {
			const admin = await require('../utils/loadUserFromEnv').getAdmin();
			if (username !== admin.username) {
				return done(null, false, { message: 'Cannot find username' });
			}
			try {
				if (await bcrypt.compare(password, admin.password)) {
					return done(null, admin);
				} else {
					return done(null, false, { message: 'Password Incorrect' });
				}
			} catch (e) {
				return done(e);
			}
		}
	)
);
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((id, done) => {
	done(null, id);
});

module.exports = passport;
