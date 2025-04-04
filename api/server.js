import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
 import userRoute from "./routes/user.route.js";
 import gigRoute from "./routes/gig.route.js";
 import orderRoute from "./routes/order.route.js";
 import conversationRoute from "./routes/conversation.route.js";
 import messageRoute from "./routes/message.route.js";
 import reviewRoute from "./routes/review.route.js";
 import authRoute from "./routes/auth.route.js";
 import cookieParser from "cookie-parser";
 import cors from "cors";
 import path from "path"

  const app = express();
 dotenv.config();
 mongoose.set("strictQuery", true);

 const connect = async () => {
  try {
    const uri = process.env.MONGO_URI; // Accessing the MONGO_URI from the .env file
    if (!uri) {
      throw new Error('Mongo URI is not defined in the environment variables');
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((err, req, res, next) => {
 const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
