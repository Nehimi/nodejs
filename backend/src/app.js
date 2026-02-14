import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { generalLimiter, authLimiter, adminLimiter, publicApiLimiter } from "./middleware/rateLimit.middleware.js";

const app = express();

// Apply general rate limiting to all requests
app.use(generalLimiter);

app.use(express.json());

// Apply specific rate limiting to different route groups
app.use("/api/v1/users", publicApiLimiter, userRoutes);     // user endpoints with public API limits
app.use("/api/v1/auth", authLimiter, authRoutes);           // authentication endpoints with strict limits
app.use("/api/v1/admin", adminLimiter, adminRoutes);      // admin-only endpoints with admin limits

export default app;