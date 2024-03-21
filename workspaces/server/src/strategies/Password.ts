import { User } from "@/classes/database/models";
import { compareSync } from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use("password", new LocalStrategy({
	session: false
}, async (username, password, done) => {
	const user = await User.findOne({ where: { username: username } });
	if(!user) { return done(new Error("No user with provided name found."), false); }
	if(!compareSync(password, user.password)) { return done(new Error("Incorrect password."), false); }

	return done(null, user);
}));