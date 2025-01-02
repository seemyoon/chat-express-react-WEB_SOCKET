import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { configs } from "./config";

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user as Express.User);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: configs.GOOGLE_CLIENT_ID,
      clientSecret: configs.GOOGLE_CLIENT_SECRET,
      callbackURL: configs.CALLBACK_URL_TEST,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

export default passport;
