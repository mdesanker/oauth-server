import { Schema, model } from "mongoose";
import { DateTime } from "luxon";

export interface IUser {
  _id?: string;
  googleId?: string;
  username: string;
  email: string;
  avatar: string;
  date?: DateTime;
}

const UserSchema = new Schema<IUser>({
  googleId: { type: String },
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  date: { type: Date, default: DateTime.now },
});

export default model("User", UserSchema);
