# Node.js Backend Tutorial


## steps to write code
mern-backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── controllers/
│   │   └── userController.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── app.js
│   │
│   └── server.js
│
├── .env
├── package.json
└── README.md


A comprehensive introduction to backend development using Node.js, Express, and MongoDB Atlas.

## 🚀 Features

- RESTful API with Express.js
- MongoDB Atlas database integration
- Environment variable configuration
- Professional project structure
- Git version control ready

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- MongoDB Atlas account (free tier available)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nehimi/nodejs.git
   cd nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=3000
   ```
   
   To get your MongoDB connection string:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your database password

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
The server will restart automatically on file changes.

### Production Mode
```bash
npm start
```

## 📁 Project Structure

```
nodejs/
├── .gitignore          # Git ignore file
├── .env                # Environment variables (not tracked by Git)
├── index.js            # Main application entry point
├── package.json        # Project dependencies and scripts
└── readme.md           # This file
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (currently placeholder)

## 🌐 API Endpoints

- `GET /` - Welcome message and API status

## 📚 What You'll Learn

- Setting up a Node.js backend project
- Connecting to MongoDB Atlas
- Using environment variables for security
- Creating RESTful API endpoints
- Professional project organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Useful Links

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 📚 Node.js vs Express.js

### 🟢 Node.js

**What it is:**
👉 A JavaScript runtime

**What it does:**
- Runs JavaScript outside the browser
- Gives access to system things (files, ports, network)
- Can create servers but with a lot of code

**Example (pure Node.js server):**
```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello from Node.js");
});

server.listen(3000);
```

### 🔵 Express.js

**What it is:**
👉 A web framework built on top of Node.js

**What it does:**
- Makes backend work easy and fast
- Handles routes, APIs, middleware
- Perfect for REST APIs

**Example (Express.js server):**
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Express");
});

app.listen(3000);
```

### 📊 Key Difference Table

| Feature | Node.js | Express.js |
|---------|---------|------------|
| Type | Runtime | Framework |
| Can run JS? | ✅ Yes | ❌ No (needs Node) |
| API creation | Harder | Easy |
| Routing | Manual | Built-in |
| Middleware | ❌ | ✅ |
| Used alone? | Yes | No |

### 🧠 Simple way to remember

Node.js is the engine 🚗  
Express.js is the steering wheel 🕹️

You can't use Express without Node, but you can use Node without Express (just harder).

### 🏗️ In real projects (MERN stack)

- **Node.js** → runs the backend
- **Express.js** → builds APIs  
- **MongoDB** → database
- **React** → frontend

---

## 🔄 Request Flow Journey

Understanding how requests travel through your Node.js/Express application is crucial for backend development.

### 📡 Complete Request Lifecycle

```
Client Request → Router → Controller → Model → Database → Response
```

### 🗺️ Step-by-Step Journey

#### 1. **Client Initiates Request**
```javascript
// Frontend (React/Angular/Vanilla JS)
fetch('/api/users/123')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### 2. **Express Router Receives Request**
```javascript
// routes/user.routes.js
router.get('/:id', userController.getUserById);
```
- Router matches URL pattern `/users/:id`
- Extracts route parameters (`req.params.id = "123"`)
- Forwards to appropriate controller

#### 3. **Controller Processes Business Logic**
```javascript
// controllers/user.controller.js
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
```

#### 4. **Model Interacts with Database**
```javascript
// models/user.model.js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

#### 5. **Database Operations**
```javascript
// MongoDB Query Execution
// Database processes: db.users.findOne({ _id: ObjectId("123") })
```

#### 6. **Response Travels Back**
```
Database → Model → Controller → Router → Client Response
```

### 🎯 Request Flow with Middleware

```
Request → Middleware 1 → Middleware 2 → Router → Controller → Response
                ↓              ↓              ↓
            (Logging)    (Authentication)   (Validation)
```

#### Example with Middleware:
```javascript
// Middleware 1: Request Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date()}`);
  next();
});

// Middleware 2: Authentication
app.use('/api', authMiddleware);

// Middleware 3: Validation
app.use('/api/users', validateUser);
```

### 📊 Request Flow Diagram

```
┌─────────┐    ┌──────────┐    ┌─────────────┐    ┌──────────┐
│ Client  │───▶│ Router   │───▶│ Controller  │───▶│ Database │
│ (React) │    │ (Match   │    │ (Business   │    │ (MongoDB)│
│         │    │  Route)  │    │  Logic)     │    │         │
└─────────┘    └──────────┘    └─────────────┘    └──────────┘
       ▲                                    │
       │                                    ▼
┌─────────┐    ┌──────────┐    ┌─────────────┐
│ Response │◀───│ Router   │◀───│ Controller  │
│ (JSON)   │    │ (Format  │    │ (Process    │
│         │    │  Output) │    │  Data)      │
└─────────┘    └──────────┘    └─────────────┘
```

### 🚨 Error Handling Flow

```javascript
// Error travels back through the chain
Database Error → Model → Controller → Error Middleware → Client
```

#### Error Handling Middleware:
```javascript
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error : {}
  });
});
```

### ⚡ Performance Considerations

- **Async/Await**: Prevents blocking the event loop
- **Database Indexing**: Speeds up query performance
- **Caching**: Reduces database load
- **Pagination**: Limits response size

### 🧠 Best Practices

1. **Keep controllers thin** - Move business logic to services
2. **Validate input early** - Use middleware for validation
3. **Handle errors gracefully** - Always try-catch async operations
4. **Use proper HTTP status codes** - 200, 201, 400, 404, 500
5. **Log requests** - Debug and monitor application health

---

**Happy Coding! 🎉**