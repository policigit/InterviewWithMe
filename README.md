# Interview Prep Web App

A comprehensive full-stack web application built with the MERN stack to help developers prepare for technical interviews. Practice coding problems, track progress, and master algorithms and data structures.

## 🚀 Features

- **Problem Library**: Extensive collection of coding problems categorized by difficulty and topic
- **Interactive Code Editor**: Built-in code editor with syntax highlighting and multiple language support
- **Progress Tracking**: Monitor your solving progress with detailed analytics and statistics
- **User Authentication**: Secure login/signup with JWT authentication
- **Bookmarks**: Save problems for later review
- **Solution Discussion**: View and discuss multiple approaches to problems
- **Mock Interviews**: Timed coding sessions to simulate real interview conditions
- **Topic-wise Practice**: Focus on specific areas like arrays, strings, trees, graphs, etc.

## 🛠️ Tech Stack

**Frontend:**
- React.js with Hooks
- Redux for state management
- Material-UI/Tailwind CSS for styling
- Axios for API calls
- React Router for navigation

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads (if applicable)

**Development Tools:**
- Nodemon for development
- Concurrently for running frontend and backend
- ESLint for code linting
- Prettier for code formatting

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

## ⚡ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/interview-prep-app.git
   cd interview-prep-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/interview-prep
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=30d
   ```

   Create a `.env` file in the client directory (if needed):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. **Start the application**
   
   **Option 1: Run both frontend and backend simultaneously**
   ```bash
   # From the root directory
   npm run dev
   ```

   **Option 2: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run server

   # Terminal 2 - Frontend
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Problems
- `GET /api/problems` - Get all problems with pagination
- `GET /api/problems/:id` - Get specific problem
- `POST /api/problems` - Create new problem (admin)
- `PUT /api/problems/:id` - Update problem (admin)
- `DELETE /api/problems/:id` - Delete problem (admin)

### User Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Update problem completion status
- `GET /api/progress/stats` - Get detailed statistics

## 🧪 Testing

Run the test suites:

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service

### Backend (Heroku/Railway)
1. Set environment variables on your hosting platform
2. Deploy the server directory
3. Ensure MongoDB connection is configured for production

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request



## 👨‍💻 Author

**Your Name**
- GitHub: https://github.com/policigit
- LinkedIn: https://www.linkedin.com/in/avinashsahulinkdin/
- Email: avinashofficial0725@gmail.com

## 🙏 Acknowledgments


- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI components inspiration from various open-source projects

## 📈 Future Enhancements

- [ ] Video solution explanations
- [ ] Collaborative coding sessions
- [ ] AI-powered difficulty recommendations
- [ ] Mobile app development
- [ ] Integration with popular IDEs
- [ ] Company-specific problem sets
- [ ] Interview scheduling system

---

⭐ Star this repository if it helped you prepare for your interviews!
