import { Router } from "express";
import { registerUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { registrationLimiter, uploadLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

// CREATE - Register new user with strict rate limiting
router.post("/register", registrationLimiter, registerUser);

// READ - Get all users
router.get("/", getAllUsers);

// READ - Get user by ID
router.get("/:id", getUserById);

// UPDATE - Update user by ID
router.put("/:id", updateUser);

// DELETE - Delete user by ID
router.delete("/:id", deleteUser);

// File upload with rate limiting (example endpoint)
router.post("/upload", uploadLimiter, (req, res) => {
  // File upload logic would go here
  res.status(501).json({ message: "File upload not implemented yet" });
});

export default router;
