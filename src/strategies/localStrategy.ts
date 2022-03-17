import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        // Check account exists
        const user = await User.findOne({ provider: "local", email }).select(
          "+password"
        );

        if (!user) {
          return cb(null, false);
        }

        // Compare passwords
        const isMatch = bcrypt.compare(password, user.password!);

        if (!isMatch) {
          return cb(null, false);
        }

        return cb(null, user);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
