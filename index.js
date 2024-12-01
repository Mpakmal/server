import express from "express";
import "dotenv/config";
import { db } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Pastikan `CLIENT_URL` di .env sudah didefinisikan
    credentials: true,
  })
);

// Middleware untuk parsing JSON dan cookie
app.use(express.json());
app.use(cookieParser());

// Middleware untuk debugging log setiap request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Endpoint Root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

// Endpoint Auth
app.use("/api/v1/auth", authRouter);

// Endpoint Users dengan log tambahan
app.use(
  "/api/v1/users",
  (req, res, next) => {
    console.log("[DEBUG] Request masuk ke /api/v1/users");
    next();
  },
  userRouter
);

// Middleware untuk menangani 404 (halaman tidak ditemukan)
app.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started, listening on port ${PORT}`);
});
