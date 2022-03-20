import { Router } from "express";
import authController from "../../controllers/auth";
import validator from "../../utils/validator";

const auth = Router();

auth.get("/login/success", authController.loginSuccess);
auth.get("/login/failed", authController.loginFailed);

// GOOGLE AUTH
auth.get("/google", authController.google);
auth.get("/google/callback", authController.googleCallback);

// GITHUB AUTH
auth.get("/github", authController.github);
auth.get("/github/callback", authController.githubCallback);

// FACEBOOK AUTH
auth.get("/facebook", authController.facebook);
auth.get("/facebook/callback", authController.facebookCallback);

// LOCAL AUTH
auth.post("/register", validator.register, authController.register);
auth.post("/login", validator.login, authController.login);

auth.post("/logout", authController.logout);

export = auth;
