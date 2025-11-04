import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

import connectDB from "../lib/db.js";
import authRoutes from "../routes/auth.route.js";
import newsRoutes from "../routes/news.route.js";
import bookmarkRoutes from "../routes/bookmark.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    origin: ["https://cruz-dailypulse.netlify.app" , "http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  })
);

app.options('*', cors());

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});