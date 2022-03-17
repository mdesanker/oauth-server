import { Router } from "express";
import authController from "../../controllers/auth";

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

// FACEBOOK AUTH
auth.post("/register", authController.register);
auth.get("/local/callback", authController.localCallback);

auth.post("/logout", authController.logout);

export = auth;
