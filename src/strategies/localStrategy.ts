import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../models/User";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      console.log(req);

      try {
        // const existingUser = await User.findOne({ googleId: profile.id });
        // if (existingUser) {
        //   cb(null, existingUser);
        // }
        // const newUser = new User<IUser>({
        //   googleId: profile.id,
        //   username: profile.displayName,
        //   email: profile._json.email!,
        //   avatar: profile._json.picture!,
        // });
        // await newUser.save();
        // cb(null, newUser);
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
