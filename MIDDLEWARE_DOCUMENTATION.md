# Middleware Documentation

## 🔐 Authentication Middleware Guide

### 📋 What is Middleware?

**Middleware is like a gatekeeper** - functions that run between the incoming request and the final response. They can modify the request, response, or end the request-response cycle.

### 🎯 Your Authentication Middleware

#### **File Location**: `backend/src/middleware/auth.middleware.js`

#### **Purpose**: 
- Authenticate users via JWT tokens
- Verify user identity and role
- Protect sensitive endpoints
- Provide user context to controllers

---

## 🛡️ Middleware Functions

### 1. `protect` Middleware

#### **Description**: 
Authenticates users and sets user context for protected routes.

#### **Usage**:
```javascript
import { protect } from "../middleware/auth.middleware.js";

router.get("/profile", protect, getUserProfile);
router.post("/update", protect, updateUser);
```

#### **How It Works**:

```javascript
export const protect = async (req, res, next) => {
    let token;

    // Step 1: Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Step 2: Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token'
        });
    }

    // Step 3: Verify token and get user
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Step 4: Get user from database to include role
        const user = await User.findById(decoded.id).select('id role');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Step 5: Set user in request object
        req.user = { 
            id: user._id, 
            role: user.role 
        };

        // Step 6: Continue to next middleware or controller
        next();
    } catch (error) {
        // Step 7: Handle authentication errors
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
};
```

---

### 2. `admin` Middleware

#### **Description**:
Restricts access to users with admin role only.

#### **Usage**:
```javascript
import { protect, admin } from "../middleware/auth.middleware.js";

router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
```

#### **How It Works**:

```javascript
export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, continue
    } else {
        return res.status(403).json({
            success: false,
            message: 'Not authorized as admin'
        });
    }
};
```

---

## 🔄 Request Flow with Middleware

### **Complete Authentication Flow**:

```
1. Client Request → 2. protect Middleware → 3. admin Middleware → 4. Controller → 5. Response
                      ↓                      ↓                    ↓
                 Extract Token           Check Role           Execute
                      ↓                      ↓                    ↓
                 Verify JWT             Verify Admin          Business Logic
                      ↓                      ↓                    ↓
                 Get User               Allow/Deny           Send Response
                      ↓                      ↓                    ↓
                 Set req.user             next()               ↓
                      ↓                      ↓                    ↓
                 next() → Continue     → Continue            → Client
```

---

## 🎯 Middleware in Your Routes

### **Authentication Examples**:

#### **Public Routes** (No middleware):
```javascript
router.post("/login", loginUser);        // Anyone can login
router.post("/register", registerUser);   // Anyone can register
```

#### **Protected Routes** (Authentication required):
```javascript
router.get("/me", protect, getMe);     // Must be logged in
router.put("/profile", protect, updateProfile); // Must be logged in
```

#### **Admin Routes** (Admin only):
```javascript
router.get("/admin/users", protect, admin, getAllUsers);     // Admin only
router.put("/admin/users/:id/role", protect, admin, updateRole); // Admin only
router.delete("/admin/users/:id", protect, admin, deleteUser);   // Admin only
```

---

## 🛡️ Security Features

### **What Middleware Protects**:

| Security Layer | What It Does | How It Helps |
|----------------|---------------|---------------|
| **Token Validation** | Verifies JWT signature | Prevents token tampering |
| **User Existence** | Checks if user exists | Prevents deleted user access |
| **Role Verification** | Checks user role | Enables role-based access |
| **Environment Validation** | Checks JWT_SECRET | Prevents misconfiguration |
| **Error Handling** | Returns proper HTTP codes | Consistent API responses |

### **HTTP Status Codes**:

| Status | When Used | Meaning |
|---------|-------------|---------|
| **200** | Successful authentication | User is verified |
| **401** | No token/invalid token | Authentication failed |
| **403** | Insufficient permissions | User not admin |
| **500** | Server error | Internal server problem |

---

## 🔧 Request Object Enhancement

### **Before Middleware**:
```javascript
req = {
    headers: { authorization: "Bearer token..." },
    body: { ... },
    params: { ... },
    query: { ... }
}
```

### **After Middleware**:
```javascript
req = {
    headers: { authorization: "Bearer token..." },
    body: { ... },
    params: { ... },
    query: { ... },
    user: {               // ← Added by middleware
        id: "user_id_here",
        role: "user"      // ← Role for access control
    }
}
```

---

## 🚀 Best Practices

### **✅ Do's**:
- Use `protect` for any route requiring authentication
- Use `admin` for admin-only routes
- Always check `req.user` in controllers
- Return consistent error responses
- Validate environment variables

### **❌ Don'ts**:
- Skip authentication for sensitive routes
- Hardcode secrets in middleware
- Assume `req.user` exists without `protect`
- Return different error formats
- Forget to call `next()`

---

## 🎯 Testing Middleware

### **Test Scenarios**:

#### **1. No Token**:
```http
GET /api/v1/auth/me
Expected: 401 - "Not authorized, no token"
```

#### **2. Invalid Token**:
```http
GET /api/v1/auth/me
Authorization: Bearer invalid_token
Expected: 401 - "Not authorized, token failed"
```

#### **3. Valid Token (User)**:
```http
GET /api/v1/admin/users
Authorization: Bearer user_token
Expected: 403 - "Not authorized as admin"
```

#### **4. Valid Token (Admin)**:
```http
GET /api/v1/admin/users
Authorization: Bearer admin_token
Expected: 200 - User data returned
```

---

## 📊 Performance Considerations

### **Database Queries**:
- Each `protect` call makes 1 database query
- Consider caching user data for high-traffic apps
- Use `.select()` to limit returned fields

### **JWT Verification**:
- JWT verification is CPU-intensive but fast
- Consider token refresh strategies for long sessions
- Use appropriate expiration times

---

## 🔍 Debugging Middleware

### **Common Issues**:

#### **1. Token Not Found**:
```javascript
// Check Authorization header format
console.log(req.headers.authorization);
// Should be: "Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### **2. JWT Verification Failed**:
```javascript
// Check JWT_SECRET matches
console.log(process.env.JWT_SECRET);
// Ensure same secret used for signing
```

#### **3. User Not Found**:
```javascript
// Check database connection
// Verify user ID exists in database
```

---

## 🎯 Summary

### **Your Middleware Stack**:

1. **`protect`** - Authentication gatekeeper
   - Extracts and verifies JWT tokens
   - Sets user context in request
   - Handles authentication errors

2. **`admin`** - Role-based access control
   - Checks user role
   - Restricts admin functionality
   - Provides authorization layer

### **Security Benefits**:
✅ **Prevents unauthorized access**  
✅ **Enables role-based permissions**  
✅ **Consistent error handling**  
✅ **Production-ready security**  

**Your middleware provides enterprise-level authentication and authorization!** 🛡️

---

*Last Updated: February 14, 2026*
