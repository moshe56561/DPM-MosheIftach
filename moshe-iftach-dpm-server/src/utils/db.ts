import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // or false, based on your preference

    // Get Mongo URI from environment variable
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.log("Mongo URI is not defined in .env file");
      return;
    }

    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(mongoURI);

    if (mongoose.connection.db)
      await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log("🚀 ~ connectDB ~ err:", err);
  }
};

export default connectDB;
