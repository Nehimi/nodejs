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
| `/api/v1/admin/create-admin` | POST | Create admin user | **Admin Only** |
| `/api/v1/admin/users` | GET | Get all users | **Admin Only** |
| `/api/v1/admin/users/:id/role` | PUT | Update user role | **Admin Only** |
| `/api/v1/admin/users/:id` | DELETE | Delete user | **Admin Only** |
| `/api/v1/admin/stats` | GET | Get system statistics | **Admin Only** |

### 🔐 Security Access Levels

#### **✅ Current Setup (Secure)**
- **All admin endpoints require authentication**
- **Only existing admins can create new admins**
- **Prevents unauthorized admin creation**

#### **⚠️ Previous Setup (Insecure)**
- **Public admin creation endpoint**
- **Anyone could create admin users**
- **Security risk for production**

### 🚀 How to Create First Admin

Since all admin endpoints now require admin access, you have **2 options**:

#### **Option 1: Manual Database Setup (Recommended)**
1. **Go to MongoDB Atlas** → Collections → users
2. **Insert first admin manually:**
```json
{
    "name": "Super Admin",
    "email": "admin@example.com",
    "password": "hashed_password_here", // Hash this first
    "role": "admin",
    "createdAt": "2026-02-14T07:00:00.000Z"
}
```

#### **Option 2: Temporary Public Endpoint (Development)**
Create a temporary public endpoint for initial setup, then remove it.

### 🎯 Admin Access Flow

#### **Step 1: Get Admin Access**
- **Method 1**: Manual database setup
- **Method 2**: Existing admin creates new admin

#### **Step 2: Login as Admin**
```http
POST http://localhost:8888/api/v1/auth/login
{
    "email": "admin@example.com",
    "password": "admin123"
}
```

#### **Step 3: Create More Admins**
```http
POST http://localhost:8888/api/v1/admin/create-admin
Authorization: Bearer ADMIN_TOKEN
{
    "name": "New Admin",
    "email": "newadmin@example.com",
    "password": "admin123"
}
```

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
