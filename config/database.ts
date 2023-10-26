import { ConnectOptions, connect } from "mongoose";

import * as config from "./default.json";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string = config.mongoURI;
    const options: ConnectOptions = {
      autoIndex: true,
    };
    await connect(mongoURI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
