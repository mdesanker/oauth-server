import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import User, { IUser } from "../models/User";

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK as string,
    },
    async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      console.log(profile);

      try {
        const existingUser = await User.findOne({ githubId: profile.id });
        if (existingUser) {
          cb(null, existingUser);
        }
        const newUser = new User<IUser>({
          githubId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile._json.avatar_url!,
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
