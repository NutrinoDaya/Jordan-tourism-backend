// index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./router/auth.js";
import tourRoute from "./router/tours.js";
import userRoute from "./router/users.js";
import reviewRoute from "./router/review.js";
import bookingRoute from "./router/bookings.js";
import searchRoute from "./router/Search.js";
import contactRoute from "./router/contact.js";
import blogRoute from "./router/blog.js";
import commentRoute from "./router/comment.js";
import { connectDB } from "./models/db.js";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const corsOptions = {
  origin: true,
  credentials: true,
};

// ✅ Set body size limit to handle large payloads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/comment", commentRoute);

// Call connectDB before starting the server
app.listen(port, async () => {
  await connectDB();
});
