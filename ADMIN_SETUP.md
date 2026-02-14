# Admin User Setup Guide

## Method 1: Create Admin via Registration + Database Update

### Step 1: Register User
```http
POST http://localhost:8888/api/v1/users/register
Content-Type: application/json

{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123"
}
```

### Step 2: Update Role in MongoDB Atlas
1. Go to MongoDB Atlas → Collections → users
2. Find your user (admin@example.com)
3. Edit document → Change "role": "user" to "role": "admin"
4. Save changes

### Step 3: Login as Admin
```http
POST http://localhost:8888/api/v1/auth/login
Content-Type: application/json

{
    "email": "admin@example.com",
    "password": "admin123"
}
```

## Method 2: Use Existing Admin (From Server Logs)

From your server logs, you have:
- Admin ID: 698f78d0f7324e78371102fd
- Role: admin

Try logging in with existing admin credentials.

## Method 3: Create Admin via API (Future Enhancement)

You could add an admin creation endpoint:
```javascript
// In admin.controller.js
export const createAdmin = async (req, res) => {
    const user = new User({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
    });
    await user.save();
    res.json({ success: true, data: user });
};
```

## Testing Admin Access

Once you have admin token, test admin endpoints:

### 🎯 Complete Admin Endpoints

| Endpoint | Method | Purpose | Access Level |
|----------|--------|---------|-------------|
| `/api/v1/admin/create-admin` | POST | Create admin user | Public |
| `/api/v1/admin/users` | GET | Get all users | Admin Only |
| `/api/v1/admin/users/:id/role` | PUT | Update user role | Admin Only |
| `/api/v1/admin/users/:id` | DELETE | Delete user | Admin Only |
| `/api/v1/admin/stats` | GET | Get system statistics | Admin Only |

### Example Requests:

**Create Admin:**
```http
POST http://localhost:8888/api/v1/admin/create-admin
Content-Type: application/json

{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123"
}
```

**Get All Users:**
```http
GET http://localhost:8888/api/v1/admin/users
Authorization: Bearer YOUR_ADMIN_TOKEN
```

**Update User Role:**
```http
PUT http://localhost:8888/api/v1/admin/users/USER_ID/role
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
    "role": "admin"
}
```

**Get System Stats:**
```http
GET http://localhost:8888/api/v1/admin/stats
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Expected Response:
```json
{
    "success": true,
    "message": "All users retrieved successfully",
    "count": 2,
    "data": [...]
}
```
