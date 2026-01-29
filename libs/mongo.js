import mongoose from "mongoose";

const connectMongo = async () => {
  console.log("ENV CHECK:", process.env.MONGODB);

  if (!process.env.MONGODB) {
    throw new Error("MONGODB URI IS MISSING");
  }

  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGODB);
  console.log("MongoDB connected");

};

export default connectMongo;
