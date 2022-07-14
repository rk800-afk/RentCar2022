const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

// Model of the collection 'users'
const { User } = require("../../db/models");

// Configuration for jwt-strategy in 'passport'
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN || "secret"
};

module.exports = (passport) => {
  passport.use(
    // Create jwt-strategy in 'passport'
    new JwtStrategy(options, async (payload, done) => {
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
