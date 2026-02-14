import { Router } from "express";
import { protect, admin } from "../middleware/auth.middleware.js";
import { createAdmin, getAllUsersAdmin, updateUserRole, deleteUserAdmin, getSystemStats } from "../controllers/admin.controller.js";

const router = Router();

// Public route for initial admin setup
router.post("/create-admin", createAdmin);

// All other admin routes require authentication + admin role
router.use(protect); // Must be authenticated
router.use(admin);   // Must be admin

// Admin-only endpoints
router.get("/users", getAllUsersAdmin);           // Get all users
router.put("/users/:id/role", updateUserRole);    // Update user role
router.delete("/users/:id", deleteUserAdmin);     // Delete user
router.get("/stats", getSystemStats);             // Get system statistics

export default router;
