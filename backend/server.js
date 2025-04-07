import express from "express";
import db from "./db.js";
import dotenv from "dotenv";
import multer from "multer";
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import prisonerRoutes from "./routes/under-trail-prisoner-routes.js";
import judgeRoutes from "./routes/judge-routes.js";
import lawyerRoutes from "./routes/lawyer-routes.js";
import faceRecognitionRoutes from "./routes/faceRecognition-routes.js";
import userRoutes from "./routes/user-routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json()); // ✅ Replaces bodyParser.json()
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Use Routers
app.use("/judge", judgeRoutes);
app.use("/lawyer", lawyerRoutes);
app.use("/prisoner", prisonerRoutes);
app.use("/face", faceRecognitionRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
