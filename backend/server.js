import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import tutorialRoutes from "./routes/tutorialRoutes.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/adminRoutes.js";
import professorRoutes from "./routes/professorRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import studentTestRoutes from "./routes/studentTestRoutes.js";
import promoteStudentRoutes from "./routes/promoteStudent.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const {
  MONGO_URI = "mongodb+srv://vigljku_db_user:wYS5YNCbFSpu8G2k@mernauth.ysoggzy.mongodb.net/mern_auth?retryWrites=true&w=majority&appName=mernauth",
  PORT = 5000,
} = process.env;

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo error:", err));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tutorials", tutorialRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/professors", professorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/student-tests", studentTestRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin/users", promoteStudentRoutes);
// Health check
app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime(), ts: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));