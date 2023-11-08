import { ConnectOptions, connect } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string | undefined = process.env.MONGO_URL;
    const options: ConnectOptions = {
      autoIndex: true,
    };
    if (mongoURI) {
      await connect(mongoURI, options);
      console.log("MongoDB Connected...");
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
