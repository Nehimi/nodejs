import jwt from "jsonwebtoken";

// Authentication Middleware
export const protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

        // Set user in request object
        req.user = { id: decoded.id };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
};

// Optional: Admin middleware (for future use)
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