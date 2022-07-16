import JwtStrategy, { ExtractJwt } from "passport-jwt";

// Model of the collection 'users'
import { User } from "../../db/models/index.mjs";
import parseCookies from "../utils/getCookies.js";

const cookieExtractor = function (req) {
  let token = null;
  if (req && req?.headers?.cookie) token = parseCookies(req)?.authorization;
  return token;
};

const cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) token = req.cookies['authorization'];
  return token;
};

// Configuration for jwt-strategy in 'passport'
const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN || "secret"
};

export default function (passport) {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (_id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });

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
