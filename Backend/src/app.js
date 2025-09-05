const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const {errorHandler} = require("./errors/responseHandler");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.URL, credentials: true,    }));
app.use(express.json());
app.use(cookieParser()); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const router = require("./routes");
app.use("/api", router);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
