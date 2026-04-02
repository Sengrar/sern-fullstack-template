import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import { protect } from "../middlewares/authenticate.middleware.js";

const router = Router();

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

// Routes
router.use("/auth", authRoutes);
router.use("/users", protect, userRoutes);

export default router;