import JwtStrategy, { ExtractJwt } from "passport-jwt";

// Model of the collection 'users'
import { User } from "../../db/models/index.mjs";

// Configuration for jwt-strategy in 'passport'
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN || "secret"
};

export default function (passport) {
  passport.use(
    // Create jwt-strategy in 'passport'
    new JwtStrategy.Strategy(options, async (payload, done) => {
      try {
        // Search document in collection 'users' with id
        const user = await User.findById(
          payload._id
        ).select("email role");

        if (user) {
          // Callback with user
          done(null, user);
        } else {
          // Callback with false
          done(null, false);
        }
      } catch (e) {
        console.log(e.message);
      }
    })
  );
};
