# 🍽️ Restaurant Management System

A full-stack restaurant management application built with React and Node.js, featuring user authentication, menu management, and comprehensive testing suite.

## Demo
https://github.com/user-attachments/assets/c9411a91-77b4-4ec8-a925-f5c813d25e13

## 📋 Implemented Features

### ✅ Completed Features
- **User Authentication** - Registration, login, and JWT-based authentication
- **Menu Management** - Browse menu items with categories
- **Shopping Cart** - Add/remove items with quantity management
- **User Profile** - View and update user information
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Comprehensive Testing** - Unit, integration, and performance tests

### 🧪 Testing Suite (Implemented)

#### Unit Tests
- **Auth Tests** - User registration and login functionality
- **Profile Tests** - User profile management
- **Meal Tests** - Menu item operations

#### Integration Tests
- **Auth Integration** - Complete authentication flow testing
- **Meal Integration** - Menu management endpoints
- **Profile Integration** - User profile API endpoints

#### Performance Tests
**Load Test Results:**
- **Duration**: 192 seconds
- **Virtual Users**: 4,800 total
- **Successful Requests**: 7,313 out of 8,458
- **Response Time**: 
  - Average: 3,135.8ms
  - Median: 2,143.5ms
  - 95th percentile: 9,416.8ms
- **Throughput**: 48 requests/second
- **Error Rate**: 14.3% (mainly ETIMEDOUT errors under high load)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **CSS3** - Responsive styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - RESTful API framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens
- **Bcrypt** - Password hashing

### Testing Tools
- **Jest** - JavaScript testing framework
- **Artillery** - Performance testing
- **Supertest** - HTTP assertion library

## 📁 Project Structure

```
restaurant-management-system/
├── Frontend/
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── routes/         # Route definitions
│   │   └── assets/         # Images and styles
│   └── public/
├── Backend/
│   ├── controllers/        # Route controllers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   ├── services/           # Business logic
│   ├── tests/              # Test files
│   │   ├── unit/           # Unit tests
│   │   ├── integration/    # Integration tests
│   │   └── performance/    # Load tests
│   └── config/             # Database configuration
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/maiatef066/restaurant-management-system.git
cd restaurant-management-system
```

2. **Install Backend Dependencies**
```bash
cd Backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../Frontend
npm install
```

4. **Environment Variables**
Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant_db
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

5. **Start the Development Servers**

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Menu Management
- `GET /api/meals` - Get all menu items
- `GET /api/meals/:id` - Get specific menu item

### User Management
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

## 🧪 Running Tests

### Unit Tests
```bash
cd Backend
npm run test:unit
```

### Integration Tests
```bash
cd Backend
npm run test:integration
```

### Performance Tests
```bash
cd Backend
npm run test:performance
```

## 📊 Performance Test Analysis

The performance tests revealed:
- **Good Performance**: Under normal load (50-60 requests/second)
- **Response Times**: Average 3.1 seconds under load
- **Scalability**: Successfully handled 4,800 virtual users
- **Bottlenecks**: Database queries under high concurrent load
- **Error Handling**: 14.3% timeout errors under extreme load

## 🏗️ Architecture

### Backend Architecture
```
Express Server
├── Middleware Layer
│   ├── Authentication (JWT)
│   ├── Input Validation
│   └── Error Handling
├── Controller Layer
│   ├── Auth Controller
│   ├── Meal Controller
│   └── Profile Controller
├── Service Layer
│   ├── Auth Service
│   ├── Meal Service
│   └── Profile Service
└── Data Layer
    ├── User Model
    ├── Meal Model
    └── MongoDB Connection
```

### Frontend Architecture
```
React Application
├── Component Structure
│   ├── Header Components
│   ├── Main Components
│   └── Footer Components
├── State Management
│   ├── Cart Context
│   └── User Context
├── Routing
│   ├── Public Routes
│   └── Protected Routes
└── API Integration
    ├── Auth Service
    └── Meal Service
```

## 🎯 Key Skills Demonstrated

- **Full-Stack Development** - Complete end-to-end application
- **RESTful API Design** - Clean, scalable backend architecture
- **Authentication & Authorization** - JWT-based security
- **Database Design** - MongoDB schema design
- **Testing Strategy** - Unit, integration, and performance tests
- **Performance Optimization** - Load testing and bottleneck identification
- **Security Best Practices** - Input validation, password hashing, CORS

## 🛣️ Future Enhancements

- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Order management system
- [ ] Real-time notifications
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@mai atef elkheshen](https://github.com/maiatef066)
- LinkedIn: [mai-elkheshen](https://www.linkedin.com/in/mai-elkheshen-685b50258/)

---

⭐ If you found this project helpful, please give it a star!
