import { User } from "@/classes/database/models";
import config from "@/config";
import { JWTPayload } from "@/types/api/Auth/JWTPayload";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

passport.use("jwt", new JWTStrategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.JWT_SECRET
}, async (payload: JWTPayload, done) => {
	const user = await User.findOne({ where: { username: payload.user.username } });
	if(!user) { return done(new Error("No user with provided name found."), false); }

	return done(null, user);
}));