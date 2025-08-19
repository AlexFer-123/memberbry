# 🎯 Memberbry Backend

A robust Node.js backend API built with Express.js following the MVC (Model-View-Controller) architecture pattern for the Memberbry online course management platform.

## 🏗️ Architecture Overview

This backend follows the **MVC pattern** with additional layers for better separation of concerns:

- **Models**: Data structure and database schemas
- **Views**: JSON responses (API responses)  
- **Controllers**: Business logic and request handling
- **Services**: External API integrations and complex operations
- **Middlewares**: Authentication, validation, and request processing
- **Routes**: API endpoint definitions and routing
- **Config**: Database and application configuration

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic (register, login)
│   └── userController.js    # User management (profile, lessons, integrations)
├── middlewares/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User schema with Mongoose
├── routes/
│   ├── index.js            # Main router with health check
│   ├── authRoutes.js       # Authentication endpoints
│   └── userRoutes.js       # User management endpoints
├── services/
│   └── pandaService.js     # Panda Video API integration
├── .env                    # Environment variables (not in repo)
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## ✨ Key Features

### 🔐 **Authentication System**
- **JWT-based authentication** with secure token generation
- **Password hashing** using bcrypt with salt rounds
- **Protected routes** with middleware validation
- **Token expiration** (24h) for security

### 👤 **User Management**
- **User registration** with validation
- **Profile management** with custom images
- **Integration tokens** for external services
- **Lesson management** per user

### 🎥 **External Integrations**
- **Panda Video API** OAuth2 integration
- **Token management** for video services
- **Error handling** for external API failures

### 🛡️ **Security & Validation**
- **Input validation** on all endpoints
- **SQL injection protection** via Mongoose ODM
- **CORS enabled** for cross-origin requests
- **Environment variables** for sensitive data

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the backend root:
```env
# Database
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password

# JWT
SECRET=your_jwt_secret_key

# Panda Video API
CLIENT_ID_PANDA=your_panda_client_id
CLIENT_SECRET_PANDA=your_panda_client_secret
```

4. **Start the server:**
```bash
# Development with nodemon
npm run dev

# Production
npm start
```

The server will be running at `http://localhost:4567`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | User login | Public |

### Users
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/users/:id` | Get user profile | Private |
| PUT | `/users/:id/token` | Update integration token | Public |
| PUT | `/users/:id/lessons` | Add lesson to user | Private |

### Health Check
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | API health status | Public |

## 🎯 MVC Architecture Benefits

### **Models (Data Layer)**
- **Centralized data structure** with Mongoose schemas
- **Validation at database level** 
- **Consistent data types** and constraints
- **Automatic timestamps** and indexing

### **Controllers (Business Logic)**
- **Clean separation** of concerns
- **Reusable business logic**
- **Consistent error handling**
- **Input validation** before processing

### **Services (External Integrations)**
- **Isolated API integrations**
- **Reusable service methods**
- **Error handling** for external failures
- **Configuration management**

### **Middlewares (Cross-cutting Concerns)**
- **Authentication verification**
- **Request preprocessing**
- **Error handling**
- **Logging and monitoring**

### **Routes (API Definition)**
- **Clear endpoint organization**
- **Middleware application**
- **RESTful design patterns**
- **Documentation-friendly structure**

## 🔧 Configuration

### Environment Variables
The application uses the following environment variables:

- `DB_USER`: MongoDB username
- `DB_PASS`: MongoDB password  
- `SECRET`: JWT secret key
- `CLIENT_ID_PANDA`: Panda Video client ID
- `CLIENT_SECRET_PANDA`: Panda Video client secret
- `PORT`: Server port (default: 4567)

### Database Configuration
- **MongoDB Atlas** cloud database
- **Connection pooling** enabled
- **Auto-reconnection** on failure
- **Graceful shutdown** handling

## 🚦 Error Handling

The API implements comprehensive error handling:

- **Validation errors**: 400 Bad Request
- **Authentication errors**: 401 Unauthorized  
- **Authorization errors**: 403 Forbidden
- **Not found errors**: 404 Not Found
- **Server errors**: 500 Internal Server Error

All errors return consistent JSON responses:
```json
{
  "msg": "Error description",
  "error": "Detailed error message"
}
```

## 🔍 Code Quality

### **Best Practices Implemented:**
- ✅ **Separation of concerns** (MVC pattern)
- ✅ **DRY principle** (Don't Repeat Yourself)
- ✅ **Error handling** throughout the application
- ✅ **Input validation** on all endpoints
- ✅ **Security best practices** (JWT, bcrypt, CORS)
- ✅ **Environment-based configuration**
- ✅ **Consistent code structure**
- ✅ **Clear naming conventions**

### **Performance Optimizations:**
- ✅ **Database indexing** on frequently queried fields
- ✅ **Connection pooling** for database
- ✅ **Async/await** for non-blocking operations
- ✅ **Selective field projection** (excluding passwords)

## 🧪 Testing

To test the API endpoints, you can use:
- **Postman** collection
- **cURL** commands
- **REST Client** extensions

Example request:
```bash
curl -X POST http://localhost:4567/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

## 🚀 Deployment

### Production Considerations:
- Set `NODE_ENV=production`
- Use process managers (PM2, Forever)
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Monitor with logging services
- Implement rate limiting
- Use database replicas

### Recommended Hosting:
- **Heroku** (easy deployment)
- **DigitalOcean** (droplets)
- **AWS EC2** (scalable)
- **Railway** (modern platform)

## 📈 Future Improvements

- [ ] Add comprehensive test suite (Jest)
- [ ] Implement API documentation (Swagger)
- [ ] Add request rate limiting
- [ ] Implement caching (Redis)
- [ ] Add email verification
- [ ] Implement role-based permissions
- [ ] Add API versioning
- [ ] Implement file upload handling
- [ ] Add comprehensive logging
- [ ] Performance monitoring

## 🤝 Contributing

1. Follow the established MVC structure
2. Add proper error handling
3. Include input validation
4. Write clear commit messages
5. Test all endpoints before submitting

---

Built with ❤️ using Node.js, Express.js, and MongoDB following MVC architecture principles.