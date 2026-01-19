#Company Registration & Verification Module

A modern, full-stack application for company registration and verification built with React, Firebase, Express, and PostgreSQL.

## 🎨 Features

- ✅ Beautiful, responsive UI with animations
- ✅ Firebase authentication (email/password)
- ✅ Multi-step company registration form
- ✅ User dashboard with company management
- ✅ Redux state management
- ✅ Protected routes
- ✅ Toast notifications
- ✅ Fully responsive design

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Material-UI (@mui/material)
- Redux Toolkit
- React Query (@tanstack/react-query)
- Framer Motion (animations)
- Firebase SDK
- Axios

### Backend
- Node.js 20 LTS
- Express.js
- PostgreSQL 15
- Firebase Admin SDK
- JWT authentication
- Cloudinary (file uploads)

## 📋 Prerequisites

- Node.js 20.x LTS
- PostgreSQL 15
- Firebase project
- Cloudinary account (optional)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bluestock.git
cd bluestock
```

### 2. Database Setup

```bash
# Create database
createdb company_db

# Import schema (if provided)
psql -d company_db -f company_db.sql

# Verify tables
psql -d company_db -c "\dt"
```

### 3. Backend Setup

```bash
cd backend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on http://localhost:5001
```

### 4. Frontend Setup

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
# App runs on http://localhost:5173
```

### 5. Environment Variables

**Backend (.env)**
```properties
PORT=5001
NODE_ENV=development
JWT_SECRET=your_super_secret_key_here_min_32_chars
JWT_EXPIRES_IN_DAYS=90
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=company_db

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_email@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (.env)**
```properties
VITE_API_BASE_URL=http://localhost:5001

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 Project Structure

```
bluestock/
├── .github/
│   └── copilot-instructions.md
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing/
│   │   │   ├── Auth/
│   │   │   ├── Company/
│   │   │   └── Dashboard/
│   │   ├── components/
│   │   ├── store/
│   │   ├── api/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── README.md
```

## 🎯 Usage

### 1. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 2. Access the Application

- Landing Page: http://localhost:5173
- Backend API: http://localhost:5001

### 3. Test the Flow

1. Click "Register" on landing page
2. Create a new account with Firebase
3. Fill company registration form (3 steps)
4. View company info on dashboard
5. Edit company details
6. Logout and login again

## 🔐 Security Features

- Firebase authentication
- JWT token-based API auth (90-day validity)
- Protected routes
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Helmet security headers

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify-email` - Verify email
- `POST /api/auth/verify-mobile` - Verify mobile OTP

### Company (Protected)
- `POST /api/company/register` - Register company
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile
- `POST /api/company/upload-logo` - Upload logo
- `POST /api/company/upload-banner` - Upload banner

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
npm run test
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support, email support@bluestock.in or open an issue on GitHub.

## 🎊 Acknowledgments

- Built with modern React patterns
- Material-UI for beautiful components
- Firebase for authentication
- PostgreSQL for reliable data storage
- Inspired by professional registration systems

---

**Built with ❤️ by the Bluestock Team**
