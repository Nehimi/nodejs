# 🚀 Rate Limiting Quick Start Guide

## 📋 What You Need to Test

### **✅ Prerequisites**
1. **Node.js** installed (v16+)
2. **Server running** on `http://localhost:8888`
3. **MongoDB** connected (for user operations)

---

## 🛠️ Setup Instructions

### **1. Start Your Server**
```bash
# Navigate to project directory
cd backend-intro

# Start the server in development mode
npm run dev

# Or start in production mode
npm start
```

### **2. Verify Server is Running**
Open your browser and visit: `http://localhost:8888/api/v1/users`

You should see a JSON response (even if empty) indicating the server is running.

---

## 🧪 Testing Rate Limiting

### **Method 1: Automated Testing Script**

#### **Run the Test Script**
```bash
# Make sure you're in the project root
node test-rate-limiting.js
```

#### **What the Script Tests**
1. **General Rate Limit** - 100 requests per 15 minutes
2. **Auth Rate Limit** - 5 login attempts per 15 minutes  
3. **Registration Rate Limit** - 3 registrations per hour

#### **Expected Output**
```
🧪 Running: General Rate Limit Test
📤 Request 1/105: ✅ SUCCESS (200)
   📊 Remaining: 99/100
📤 Request 2/105: ✅ SUCCESS (200)
   📊 Remaining: 98/100
...
📤 Request 101/105: 🚫 RATE LIMITED (429)
🛑 Stopping test - Rate limit hit!
📈 Results: 100 successful, 1 rate limited
```

---

### **Method 2: Manual Testing with cURL**

#### **Test General Rate Limiting**
```bash
# Make 101 requests to test the 100-request limit
for i in {1..101}; do
  echo "Request $i:"
  curl -w "\nStatus: %{http_code}\nRate-Limit-Remaining: %{header_rate-limit-remaining}\n" \
       -s -o /dev/null \
       http://localhost:8888/api/v1/users
  echo "---"
done
```

#### **Test Auth Rate Limiting**
```bash
# Make 6 login attempts to test the 5-request limit
for i in {1..6}; do
  echo "Login attempt $i:"
  curl -w "\nStatus: %{http_code}\n" \
       -X POST \
       -H "Content-Type: application/json" \
       -d '{"email":"test@test.com","password":"wrongpassword"}' \
       http://localhost:8888/api/v1/auth/login
  echo "---"
done
```

#### **Test Registration Rate Limiting**
```bash
# Make 4 registration attempts to test the 3-request limit
for i in {1..4}; do
  echo "Registration attempt $i:"
  curl -w "\nStatus: %{http_code}\n" \
       -X POST \
       -H "Content-Type: application/json" \
       -d "{\"name\":\"Test User $i\",\"email\":\"test$i@test.com\",\"password\":\"password123\"}" \
       http://localhost:8888/api/v1/users/register
  echo "---"
done
```

---

### **Method 3: Browser Testing**

#### **1. Open Browser Dev Tools**
1. Open Chrome/Firefox
2. Press `F12` to open Dev Tools
3. Go to the **Network** tab

#### **2. Make Requests**
Open these URLs in your browser multiple times:

- `http://localhost:8888/api/v1/users` (General limit)
- `http://localhost:8888/api/v1/auth/me` (Protected route)

#### **3. Check Headers**
Look for these headers in the Network tab:
```
rate-limit-limit: 100
rate-limit-remaining: 95
rate-limit-reset: 1640995200
rate-limit-policy: 100;w=900
```

---

## 📊 Understanding Rate Limit Responses

### **✅ Successful Response**
```json
{
  "users": [],
  "message": "Users retrieved successfully"
}
```

**Headers:**
```
rate-limit-limit: 100
rate-limit-remaining: 99
rate-limit-reset: 1640995200
rate-limit-policy: 100;w=900
```

### **🚫 Rate Limited Response**
```json
{
  "error": "Too many requests from this IP, please try again after 15 minutes",
  "retryAfter": "15 minutes"
}
```

**Status Code:** `429 Too Many Requests`

---

## 🔍 Rate Limit Headers Explained

| Header | Meaning | Example |
|--------|---------|---------|
| `rate-limit-limit` | Max requests per window | `100` |
| `rate-limit-remaining` | Requests left in window | `95` |
| `rate-limit-reset` | When window resets (Unix timestamp) | `1640995200` |
| `rate-limit-policy` | Policy format | `100;w=900` |

---

## 🛡️ Rate Limit Configuration

### **Current Limits**

| Endpoint Type | Window | Max Requests | Purpose |
|---------------|--------|--------------|---------|
| **General** | 15 min | 100 | All requests |
| **Auth** | 15 min | 5 | Login/Logout |
| **Admin** | 1 hour | 50 | Admin operations |
| **Registration** | 1 hour | 3 | Account creation |
| **Password Reset** | 1 hour | 3 | Password recovery |
| **Public API** | 15 min | 200 | Public endpoints |
| **Upload** | 1 hour | 10 | File uploads |

---

## 🚨 Troubleshooting

### **❌ Common Issues**

#### **1. Server Not Running**
```bash
Error: connect ECONNREFUSED 127.0.0.1:8888
```
**Solution:** Start the server with `npm run dev`

#### **2. Rate Limit Not Working**
**Check:** 
- Server restarted after adding rate limiting?
- Correct middleware imported in `app.js`?

#### **3. Headers Not Showing**
**Solution:** Make sure `standardHeaders: true` is set in rate limiter config

#### **4. Test Script Fails**
```bash
Error: Cannot find module 'node-fetch'
```
**Solution:** Run `npm install node-fetch`

---

## 🎯 Testing Scenarios

### **Scenario 1: Normal Usage**
- Make 10 requests to `/api/v1/users`
- **Expected:** All succeed, remaining count decreases

### **Scenario 2: Rate Limit Hit**
- Make 101 requests to `/api/v1/users`
- **Expected:** First 100 succeed, 101st returns 429

### **Scenario 3: Auth Protection**
- Make 6 login attempts with wrong password
- **Expected:** First 5 return 401, 6th returns 429

### **Scenario 4: Registration Protection**
- Make 4 registration attempts
- **Expected:** First 3 succeed, 4th returns 429

---

## 📈 Monitoring Rate Limits

### **Check Current Status**
```bash
# Check rate limit headers
curl -I http://localhost:8888/api/v1/users
```

### **Monitor in Real-time**
```bash
# Watch rate limits decrease
watch -n 1 'curl -s -I http://localhost:8888/api/v1/users | grep rate-limit'
```

---

## 🚀 Next Steps

### **Advanced Testing**
1. **Load Testing** - Use tools like Apache Bench or Artillery
2. **Distributed Testing** - Test from multiple IPs
3. **Concurrent Testing** - Test simultaneous requests

### **Production Considerations**
1. **Redis Store** - For distributed rate limiting
2. **Custom Limits** - Based on user tiers
3. **Monitoring** - Track rate limit violations

---

## 🎉 Success!

Your rate limiting is working if:

✅ **Normal requests** succeed with rate limit headers  
✅ **Excessive requests** return 429 status code  
✅ **Rate limit headers** show decreasing counts  
✅ **Different endpoints** have different limits  
✅ **Error messages** are user-friendly  

**🛡️ Your API is now protected against abuse!**

---

*Last Updated: February 2026*
