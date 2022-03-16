import { connect } from "mongoose";

const MongoDB =
  (process.env.MONGODB_URI as string) || (process.env.DEV_DB_URI as string);

const connectDB = async () => {
  try {
    await connect(MongoDB);
    console.log("MongoDB connected");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export default connectDB;
