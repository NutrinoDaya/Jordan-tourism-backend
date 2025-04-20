// db.js
import mongoose from "mongoose";

const MONGO_URI= "mongodb+srv://grad_project_632:<db_password>@cluster0.wo9llcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const DB_NAME =  "tours_booking";

mongoose.set("strictQuery", false);

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DB_NAME,
    });
  } catch (err) {
    process.exit(1);
  }
}
