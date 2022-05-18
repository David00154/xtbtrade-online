const { Strategy: LocalStrategy } = require("passport-local");
const { prisma } = require("./prisma.js");
const supabase = require("./supabase.js");
module.exports.__passport__ = function (passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				// console.log(prisma)

				let { user, error } = await supabase.auth.signIn({
					email: email,
					password: password,
				});

				if (error) {
					return done(null, false, {
						message: error.message,
					});
				} else {
					const _user = await prisma.user.findUnique({
						where: {
							email,
						},
					});
					if (!_user) {
						return done(null, false, {
							message: "That email is not registered",
						});
					} else if (_user && _user.password !== password) {
						return done(null, false, {
							message: "Password incorrect",
						});
					}
					return done(null, _user);
				}
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		done(null, user);
	});
};
