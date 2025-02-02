import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Successfully connected to MongoDB ${conn.connection.host}`.bgRed.bgYellow
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
