import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import express from "express";
import { admin, profile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", profile);
router.get("/admin", authorizeRoles("admin"), admin)

export default router;