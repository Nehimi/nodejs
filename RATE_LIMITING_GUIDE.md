# 🛡️ Rate Limiting Implementation Guide

## 📊 Overview

Rate limiting is a crucial security feature that protects your API from abuse, DDoS attacks, and ensures fair usage among all users.

## 🎯 What We Implemented

### **🔧 Rate Limiting Middleware**

#### **1. General Rate Limiter**
```javascript
// Applied to all requests
windowMs: 15 minutes
max: 100 requests per IP
Purpose: Basic protection for all endpoints
```

#### **2. Authentication Rate Limiter**
```javascript
// Applied to auth endpoints
windowMs: 15 minutes  
max: 5 requests per IP
Purpose: Prevent brute force attacks
```

#### **3. Admin Rate Limiter**
```javascript
// Applied to admin endpoints
windowMs: 1 hour
max: 50 requests per IP
Purpose: Protect sensitive admin operations
```

#### **4. Registration Rate Limiter**
```javascript
// Applied to user registration
windowMs: 1 hour
max: 3 requests per IP
Purpose: Prevent spam account creation
```

#### **5. Password Reset Rate Limiter**
```javascript
// Applied to password reset
windowMs: 1 hour
max: 3 requests per IP
Purpose: Prevent password reset abuse
```

#### **6. Public API Rate Limiter**
```javascript
// Applied to public user endpoints
windowMs: 15 minutes
max: 200 requests per IP
Purpose: Higher limits for public APIs
```

#### **7. Upload Rate Limiter**
```javascript
// Applied to file upload endpoints
windowMs: 1 hour
max: 10 requests per IP
Purpose: Prevent server resource abuse
```

#### **8. Hybrid Rate Limiter**
```javascript
// Different limits for authenticated vs unauthenticated users
Authenticated: 200 requests per 15 minutes
Unauthenticated: 50 requests per 15 minutes
Purpose: Reward authenticated users with higher limits
```

---

## 🚀 Implementation Details

### **📁 File Structure**
```
backend/src/
├── middleware/
│   └── rateLimit.middleware.js    # Rate limiting configurations
├── routes/
│   ├── auth.routes.js            # Auth endpoints with auth limiter
│   ├── user.routes.js            # User endpoints with public limiter
│   └── admin.routes.js           # Admin endpoints with admin limiter
└── app.js                        # Global rate limiter application
```

### **🔧 Middleware Application**

#### **Global Application (app.js)**
```javascript
// Applied to ALL requests
app.use(generalLimiter);

// Applied to specific route groups
app.use("/api/v1/users", publicApiLimiter, userRoutes);
app.use("/api/v1/auth", authLimiter, authRoutes);
app.use("/api/v1/admin", adminLimiter, adminRoutes);
```

#### **Route-Specific Application**
```javascript
// For sensitive operations
router.post("/register", registrationLimiter, registerUser);
router.post("/reset-password", passwordResetLimiter, resetPassword);

// For file uploads
router.post("/upload", uploadLimiter, uploadFile);
```

---

## 📊 Rate Limiting Strategy

### **🎯 Protection Levels**

| Level | Window | Max Requests | Use Case |
|-------|--------|--------------|----------|
| **General** | 15 min | 100 | All requests |
| **Auth** | 15 min | 5 | Login/Signup |
| **Admin** | 1 hour | 50 | Admin operations |
| **Public API** | 15 min | 200 | Public endpoints |
| **Upload** | 1 hour | 10 | File uploads |
| **Registration** | 1 hour | 3 | Account creation |

### **🔍 Attack Prevention**

#### **1. Brute Force Attacks**
- **Auth limiter**: 5 attempts per 15 minutes
- **Password reset limiter**: 3 attempts per hour
- **Registration limiter**: 3 accounts per hour

#### **2. DDoS Protection**
- **General limiter**: 100 requests per 15 minutes
- **Public API limiter**: 200 requests per 15 minutes

#### **3. Resource Abuse**
- **Upload limiter**: 10 uploads per hour
- **Admin limiter**: 50 admin operations per hour

---

## 🛠️ Advanced Features

### **🎛️ Custom Rate Limiters**

#### **Dynamic Rate Limiting**
```javascript
export const createCustomLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: message,
      retryAfter: `${Math.ceil(windowMs / 60000)} minutes`
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};
```

#### **Conditional Rate Limiting**
```javascript
export const conditionalLimiter = (limiter, skipCondition) => {
  return (req, res, next) => {
    if (skipCondition(req)) {
      return next();
    }
    return limiter(req, res, next);
  };
};
```

#### **User-Based Rate Limiting**
```javascript
keyGenerator: (req) => {
  return req.user ? `user:${req.user.id}` : `ip:${req.ip}`;
},
max: (req) => {
  return req.user ? 200 : 50;
},
```

---

## 📈 Response Headers

### **🔍 Rate Limit Headers**
When rate limiting is active, these headers are included:

```http
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1640995200
RateLimit-Policy: 100;w=900
```

### **🚫 Rate Limit Exceeded Response**
```json
{
  "error": "Too many requests from this IP, please try again after 15 minutes",
  "retryAfter": "15 minutes"
}
```

---

## 🧪 Testing Rate Limiting

### **🔬 Test Scenarios**

#### **1. Basic Rate Limit Test**
```bash
# Make 101 requests to test general limiter
for i in {1..101}; do
  curl -X GET http://localhost:8888/api/v1/users
done
```

#### **2. Auth Rate Limit Test**
```bash
# Make 6 login attempts to test auth limiter
for i in {1..6}; do
  curl -X POST http://localhost:8888/api/v1/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
done
```

#### **3. Admin Rate Limit Test**
```bash
# Make 51 admin requests to test admin limiter
for i in {1..51}; do
  curl -X GET http://localhost:8888/api/v1/admin/users \
    -H "Authorization: Bearer YOUR_TOKEN"
done
```

---

## 🔧 Configuration Options

### **⚙️ Rate Limit Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `windowMs` | Number | Time window in milliseconds |
| `max` | Number/Function | Max requests per window |
| `message` | String/Object | Response when limit exceeded |
| `standardHeaders` | Boolean | Include RateLimit-* headers |
| `legacyHeaders` | Boolean | Include X-RateLimit-* headers |
| `keyGenerator` | Function | Custom key generation |
| `skip` | Function | Skip rate limiting condition |
| `onLimitReached` | Function | Callback when limit reached |

### **🎨 Custom Messages**

#### **JSON Response**
```javascript
message: {
  error: "Rate limit exceeded",
  retryAfter: "15 minutes",
  limit: 100,
  windowMs: 900000
}
```

#### **HTML Response**
```javascript
message: "<h1>Rate Limit Exceeded</h1><p>Please try again later</p>"
```

---

## 🚀 Production Considerations

### **🔧 Environment Configuration**

#### **Development Environment**
```javascript
// More lenient limits for development
const devLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // Much higher limit
  message: "Dev rate limit exceeded"
});
```

#### **Production Environment**
```javascript
// Strict limits for production
const prodLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Strict limit
  message: "Rate limit exceeded"
});
```

### **📊 Monitoring and Logging**

#### **Rate Limit Events**
```javascript
onLimitReached: (req, res, options) => {
  console.log(`Rate limit exceeded for IP: ${req.ip}`);
  // Log to monitoring service
}
```

#### **Custom Logging**
```javascript
const rateLimitLogger = (req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    if (res.statusCode === 429) {
      console.log(`Rate limit hit: ${req.ip} - ${req.path}`);
    }
    originalSend.call(this, data);
  };
  next();
};
```

---

## 🛡️ Security Best Practices

### **🔒 Security Recommendations**

#### **1. Layered Protection**
```javascript
// Multiple layers of rate limiting
app.use(generalLimiter);           // Global protection
app.use("/api/v1/auth", authLimiter); // Auth-specific protection
```

#### **2. IP-Based vs User-Based**
```javascript
// Use IP for unauthenticated users
keyGenerator: (req) => req.ip,

// Use user ID for authenticated users  
keyGenerator: (req) => req.user ? req.user.id : req.ip,
```

#### **3. Different Limits for Different Operations**
```javascript
// Stricter limits for sensitive operations
app.post("/reset-password", passwordResetLimiter);
app.post("/register", registrationLimiter);
```

---

## 📊 Performance Impact

### **⚡ Memory Usage**
- **Redis Store**: For distributed systems
- **Memory Store**: For single-server applications
- **Custom Store**: For specific requirements

### **🔄 Rate Limit Storage**

#### **Memory Store (Default)**
```javascript
// Good for single server
const limiter = rateLimit({
  store: new MemoryStore({
    checkPeriod: 900000 // 15 minutes
  })
});
```

#### **Redis Store (Distributed)**
```javascript
// Good for multiple servers
import RedisStore from 'rate-limit-redis';
import Redis from 'redis';

const client = Redis.createClient();

const limiter = rateLimit({
  store: new RedisStore({
    client: client,
    prefix: 'rl:'
  })
});
```

---

## 🚀 Next Steps

### **📈 Advanced Features to Add**

1. **Redis Integration** - For distributed rate limiting
2. **Dynamic Limits** - Based on user tier/subscription
3. **Burst Protection** - Allow short bursts within limits
4. **Geographic Rate Limiting** - Different limits per region
5. **API Key Rate Limiting** - For API key-based authentication

### **🔧 Monitoring Integration**

1. **Prometheus Metrics** - Export rate limit metrics
2. **Grafana Dashboards** - Visualize rate limiting
3. **Alert Systems** - Notify on rate limit breaches
4. **Analytics** - Track rate limit patterns

---

## 🎯 Summary

Your API now has comprehensive rate limiting protection:

✅ **General protection** for all requests  
✅ **Strict limits** for authentication endpoints  
✅ **Admin protection** for sensitive operations  
✅ **Public API limits** for fair usage  
✅ **Upload protection** for resource management  
✅ **Customizable limits** for different scenarios  
✅ **User-based limits** for authenticated users  
✅ **Production-ready** configuration  

**Your API is now protected against abuse and ready for production!** 🛡️

---

*Last Updated: February 2026*
