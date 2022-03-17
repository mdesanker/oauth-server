import { Request, Response, NextFunction } from "express";
import passport from "passport";

const CLIENT_URL =
  (process.env.CLIENT_URL as string) || (process.env.DEV_CLIENT_URL as string);

// GENERAL
const loginSuccess = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.status(200).json({
      user: req.user,
    });
  } else {
    return res.status(401).json({ msg: "Authentication failed" });
  }
};

const loginFailed = (req: Request, res: Response) => {
  res.status(401).json({ msg: "Authentication failed" });
};

// GOOGLE
const google = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req: Request, res: Response, next: NextFunction) => {
    res.redirect(CLIENT_URL);
  },
];

// GITHUB
const github = passport.authenticate("github", { scope: ["user:email"] });

const githubCallback = [
  passport.authenticate("github", {
    failureRedirect: "/login/failed",
  }),
  (req: Request, res: Response, next: NextFunction) => {
    res.redirect(CLIENT_URL);
  },
];

// LOGOUT
const logout = (req: Request, res: Response) => {
  req.logOut();
  res.redirect(CLIENT_URL);
};

export default {
  loginSuccess,
  loginFailed,
  google,
  googleCallback,
  github,
  githubCallback,
  logout,
};
