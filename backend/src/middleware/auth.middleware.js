import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Authentication Middleware
export const protect = async (req, res, next) => {
    let token;
 // Extract token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];//Bearer" የሚለውን ቃል ትቶ ከፊት ለፊቱ ያለውን እውነተኛውን የቶከን ኮድ ብቻ ነጥሎ ይወስዳል።
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }

    try {
        // Verify token (no fallback - fail fast if secret missing)
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database to include role
        const user = await User.findById(decoded.id).select('id role');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Set user in request object with role
        req.user = { 
            id: user._id, 
            role: user.role 
        };

        const clientIP = req.ip;
        console.log(`User ${user._id} (${user.role}) authenticated from IP: ${clientIP}`);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
};

// Admin middleware (for admin-only routes)
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Not authorized as admin'
        });
    }
};