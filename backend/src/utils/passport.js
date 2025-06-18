import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
const configurePassport = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, //1 day
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, callback) => {
        try {
          const email = profile.emails[0].value.toLowerCase();
          let user = await User.findOne({ email });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: email,
              picture: profile.photos[0].value,
              isGoogleUser: true,
            });
          }

          callback(null, user);
        } catch (error) {
          callback(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default configurePassport;
