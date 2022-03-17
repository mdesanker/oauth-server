import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import passport from "passport";

import connectDB from "./config.ts/mongoConfig";
import authRouter from "./routes/api/auth";
import "./strategies/googleStrategy";
import "./strategies/githubStrategy";

const app = express();

connectDB();

app.use(
  cors({
    origin: [/\localhost/],
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_KEY as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const PORT = (process.env.PORT as string) || (process.env.DEV_PORT as string);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
