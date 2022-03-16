import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User, { IUser } from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);

      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          cb(null, existingUser);
        }

        const newUser = new User<IUser>({
          googleId: profile.id,
          username: profile.displayName,
          email: profile._json.email!,
          avatar: profile._json.picture!,
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

passport.deserializeUser(async (id, done) => {
  try {
    const user = User.findById(id);
    done(null, user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
});
