// db.js
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://aboodaldee:KYYq9AQ6glCEVErZ@cluster0.utxu1nj.mongodb.net/"
const DB_NAME =  "tours_booking";

mongoose.set("strictQuery", false);

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });
    console.log("Connected to MongoDB")
  } catch (err) {
    process.exit(1);
  }
}
