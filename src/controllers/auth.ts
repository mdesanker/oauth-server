import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { check, validationResult } from "express-validator";
import faker from "@faker-js/faker";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

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

// FACEBOOK
const facebook = passport.authenticate("facebook", { scope: ["email"] });

const facebookCallback = [
  passport.authenticate("facebook", {
    failureRedirect: "/login/failed",
  }),
  (req: Request, res: Response, next: NextFunction) => {
    res.redirect(CLIENT_URL);
  },
];

// LOCAL
const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    // Check email available
    const existingUser = await User.findOne({ provider: "local", email });

    if (existingUser) {
      return res
        .status(409)
        .json({ errors: [{ msg: "Email already in use" }] });
    }

    // Create new user
    const user = new User<IUser>({
      provider: "local",
      username,
      email,
      password,
      avatar: faker.image.animals(),
    });

    // Hash password
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    const document = user.toObject();
    delete document.password;
    res.status(201).json(document);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).send("Server error");
    }
  }
};

const login = [
  passport.authenticate("local", {
    failureRedirect: "/login/failed",
  }),
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ user: req.user });
  },
];

// LOGOUT
const logout = (req: Request, res: Response) => {
  req.logOut();
  res.redirect(CLIENT_URL);
};

const test = (req: Request, res: Response) => {
  res.status(200).json({ msg: "received" });
};

export default {
  loginSuccess,
  loginFailed,
  google,
  googleCallback,
  github,
  githubCallback,
  facebook,
  facebookCallback,
  register,
  login,
  logout,
  test,
};
