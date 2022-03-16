import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieSession from "cookie-session";
import passport from "passport";

import connectDB from "./config.ts/mongoConfig";
import authRouter from "./routes/api/auth";
import "./strategies/googleStrategy";

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
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY as string],
    maxAge: 1000 * 60 * 60 * 6,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

const PORT = (process.env.PORT as string) || (process.env.DEV_PORT as string);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
