import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import connectDB from "./config.ts/mongoConfig";

import authRouter from "./routes/api/auth";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Oauth2.0 Server");
});

app.use("/auth", authRouter);

const PORT = (process.env.PORT as string) || (process.env.DEV_PORT as string);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
