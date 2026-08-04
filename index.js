import express from "express";
import sendMail from "./routes/emailSend.js";
import transporter from "./config/nodemailer.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors(
   {
    origin: "http://localhost:5173", // Replace
    methods: ["GET", "POST"],
    credentials: true,
   }
));
app.use(express.json());
app.use("/api", sendMail);

app.get("/", (req, res) => {
  res.send("Welcome to the Email Sending API");
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});