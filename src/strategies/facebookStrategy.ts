import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User, { IUser } from "../models/User";

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK as string,
      profileFields: ["id", "emails", "displayName", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile: any, cb) => {
      console.log(profile);

      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          cb(null, existingUser);
        }
        const newUser = new User<IUser>({
          facebookId: profile.id,
          username: profile.displayName,
          email: profile._json.email,
          avatar: profile.photos ? profile.photos[0].value! : "",
        });
        await newUser.save();
        cb(null, newUser);
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
