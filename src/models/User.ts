import { Schema, model } from "mongoose";
import { DateTime } from "luxon";

export interface IUser {
  _id?: string;
  provider?: "google" | "github" | "facebook" | "local";
  googleId?: string;
  githubId?: string;
  facebookId?: string;
  username: string;
  email: string;
  password?: string;
  avatar: string;
  date?: DateTime;
}

const UserSchema = new Schema<IUser>({
  provider: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  facebookId: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, select: false },
  avatar: { type: String, required: true },
  date: { type: Date, default: DateTime.now },
});

export default model("User", UserSchema);
