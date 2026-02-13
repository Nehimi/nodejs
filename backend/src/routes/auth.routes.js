import { Router } from "express";
import { loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Public routes
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes (require authentication)
router.get("/me", protect, getMe);

export default router;