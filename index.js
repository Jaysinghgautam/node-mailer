 import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routes Imports
import sendMail from "./routes/emailSend.js";
import adminRouter from "./routes/adminRoute.js";
import imageRouter from "./routes/gallaryRoute.js";

dotenv.config();

const app = express();

// Database & Cloudinary Connections
connectDB();
connectCloudinary();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jaysinghgautam.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.use("/api/email", sendMail);
app.use("/api/admin", adminRouter);
app.use("/api/gallery", imageRouter); // Postman URL will be: http://localhost:3000/api/gallery/addimage

app.get("/", (req, res) => {
  res.send("Welcome to Nature Harvest API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});