# Node.js Backend Tutorial

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

---

**Happy Coding! 🎉**