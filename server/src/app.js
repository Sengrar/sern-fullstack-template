import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import { limiter } from "./middlewares/ratelimiter.js";
import morganMiddleware from "./middlewares/morgan.middleware.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

/**
 * 🔹 Security Middlewares
 */
app.use(helmet());

/**
 * 🔹 CORS Configuration
 */
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

/**
 * 🔹 Body Parsers
 */
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

/**
 * 🔹 Cookie Parser
 */
app.use(cookieParser());

/**
 * 🔹 Logging (Morgan --> Winston)
 */
if (process.env.NODE_ENV === "development") {
  app.use(morganMiddleware);
}

/**
 * 🔹 Compression (Performance)
 */
app.use(compression());

app.set("trust proxy", 1);

/**
 * 🔹 Health Check Route
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

/**
 * 🔹 API Routes
 */

// app.use("/api/v1", limiter);
app.use("/api/v1", limiter, routes);

/**
 * 🔹 404 Handler (Route Not Found)
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * 🔹 Global Error Handler
 */
app.use(errorMiddleware);

export default app;