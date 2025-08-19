# 🎓 Memberbry

A modern online course management platform with complete authentication system and video integration.

![Memberbry Login Preview](Login%20Preview.png)

## 🚀 Overview

Memberbry is a full-stack application that allows you to create and manage online courses, featuring video upload capabilities, JWT authentication, and external video API integration. The platform provides a modern and intuitive interface for educators to create and organize their lessons.

## ✨ Features

- 🔐 **Complete Authentication System**
  - User registration and login
  - JWT authentication
  - Private route protection
  - Secure password hashing with bcrypt

- 📚 **Course Management**
  - Lesson creation and editing
  - Video uploads
  - Content organization
  - Administrative dashboard

- 🎥 **Video Integration**
  - Video uploads with Uppy.js
  - External API integration (Panda Video)
  - OAuth2 token management

- 👤 **User Profile**
  - Custom profile image
  - Custom banner
  - Account settings

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Axios** - HTTP client
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **Vue.js 3** - Progressive framework
- **Vue Router** - SPA routing
- **Pinia** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Accessible components
- **Heroicons** - SVG icons
- **Uppy.js** - Modern file uploader
- **Axios** - HTTP client
- **JWT Decode** - Token decoding

## 📁 Project Structure

```
memberbry/
├── backend/
│   ├── models/
│   │   └── User.js          # User model
│   ├── index.js             # Main server
│   ├── pandaApi.js          # External API integration
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # Vue components
    │   ├── views/           # Application pages
    │   ├── router/          # Route configuration
    │   ├── store/           # State management
    │   └── services/        # HTTP services
    ├── public/
    └── package.json
```

## 🚀 Getting Started

Follow these step-by-step instructions to run the application locally:

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- **npm** or **yarn** package manager

### 🔧 Backend Setup

1. **Clone the repository and navigate to the backend folder:**
```bash
git clone <your-repository-url>
cd memberbry/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the backend root directory:
```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
SECRET=your_jwt_secret_key
```

4. **Start the backend server:**
```bash
npm start
```

✅ **Backend will be running at:** `http://localhost:4567`

### 🎨 Frontend Setup

1. **Navigate to the frontend folder:**
```bash
cd ../frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run serve
```

✅ **Frontend will be available at:** `http://localhost:8080`

### 🎯 Quick Start (Both servers)

You can run both servers simultaneously by opening two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend && npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run serve
```

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Users
- `GET /users/:id` - Get user (private)
- `PUT /users/:id/token` - Update integration token
- `PUT /users/:id/lessons` - Add lesson (private)

## 🎨 User Interface

The application features a modern interface built with:
- **Tailwind CSS** for styling
- **Headless UI** for accessible components
- **Heroicons** for consistent icons
- **Responsive design** for all devices

## 🔧 Deployment Configuration

### Frontend (Netlify)
The project is already configured for Netlify deployment with:
- Configured `netlify.toml` file
- SPA redirects (`_redirects`)

### Backend
Set up environment variables in your preferred hosting provider.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## 👨‍💻 Developer

Built with ❤️ to facilitate online course creation and management.

---

⭐ If this project was helpful to you, please consider giving it a star!
