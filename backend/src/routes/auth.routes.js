import { Router } from "express";
import { loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authLimiter, passwordResetLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

// Public routes with specific rate limiting
router.post("/login", authLimiter, loginUser);
router.post("/logout", authLimiter, logoutUser);

// Protected routes (require authentication)
router.get("/me", protect, getMe);

// Password reset with strict rate limiting
router.post("/reset-password", passwordResetLimiter, (req, res) => {
  // Password reset logic would go here
  res.status(501).json({ message: "Password reset not implemented yet" });
});

export default router;