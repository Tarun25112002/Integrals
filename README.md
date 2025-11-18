# 🎓 Integrals - Online Learning Platform

A full-stack e-learning platform built with the MERN stack, enabling educators to create and sell courses while students can browse, purchase, and learn from a wide variety of courses.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.1.1-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### For Students

- 🔍 **Browse Courses** - Explore a wide variety of courses with advanced filtering
- 🎥 **Video Learning** - Watch high-quality video lectures with YouTube integration
- 💳 **Secure Payments** - Purchase courses securely via Stripe
- 📊 **Progress Tracking** - Track your learning progress across courses
- ⭐ **Course Ratings** - Rate and review courses
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎯 **Course Previews** - Watch free preview lectures before purchasing

### For Educators

- 📚 **Course Creation** - Create comprehensive courses with chapters and lectures
- 🖼️ **Media Upload** - Upload course thumbnails via Cloudinary
- 💰 **Revenue Tracking** - Monitor earnings from course sales
- 👥 **Student Management** - View enrolled students and their progress
- 📈 **Dashboard Analytics** - Track course performance and engagement
- ✏️ **Course Management** - Edit and update course content anytime

### Platform Features

- 🔐 **Authentication** - Secure user authentication with Clerk
- 🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Vite and React 19
- 🔄 **Real-time Updates** - Instant feedback with toast notifications
- 🎬 **Smooth Animations** - Enhanced UX with GSAP animations
- 🌐 **RESTful API** - Well-structured backend API

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **React Router DOM 7.9.1** - Client-side routing
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Vite 7.1.2** - Build tool and dev server
- **Axios** - HTTP client
- **GSAP** - Animation library
- **Clerk React** - Authentication
- **React Toastify** - Toast notifications
- **React YouTube** - YouTube video player
- **Quill** - Rich text editor

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Clerk Express** - Authentication middleware
- **Stripe** - Payment processing
- **Cloudinary** - Image hosting and management
- **Multer** - File upload handling

### DevOps & Tools

- **Git** - Version control
- **npm** - Package manager
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 🏗️ Architecture

```
┌─────────────────┐
│   React Client  │
│   (Port 5173)   │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Express Server │
│   (Port 5000)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│ MongoDB│  │Clerk │
│        │  │Auth  │
└────────┘  └──────┘
    │
┌───▼──────┐
│ Cloudinary│
│  Stripe   │
└───────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- Clerk account
- Cloudinary account
- Stripe account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/integrals.git
   cd integrals
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

4. **Set up environment variables**

   Create `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
   CLOUDINARY_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   CURRENCY=USD
   PORT=5000
   ```

   Create `client/.env`:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_CURRENCY=$
   VITE_BACKEND_URL=http://localhost:5000
   ```

5. **Start the development servers**

   Terminal 1 - Backend:

   ```bash
   cd server
   npm start
   ```

   Terminal 2 - Frontend:

   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔐 Environment Variables

### Server Environment Variables

| Variable                 | Description                  | Required |
| ------------------------ | ---------------------------- | -------- |
| `MONGODB_URI`            | MongoDB connection string    | ✅       |
| `CLERK_PUBLISHABLE_KEY`  | Clerk publishable key        | ✅       |
| `CLERK_SECRET_KEY`       | Clerk secret key             | ✅       |
| `CLERK_WEBHOOK_SECRET`   | Clerk webhook secret         | ✅       |
| `CLOUDINARY_NAME`        | Cloudinary cloud name        | ✅       |
| `CLOUDINARY_API_KEY`     | Cloudinary API key           | ✅       |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret        | ✅       |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key       | ✅       |
| `STRIPE_SECRET_KEY`      | Stripe secret key            | ✅       |
| `STRIPE_WEBHOOK_SECRET`  | Stripe webhook secret        | ✅       |
| `CURRENCY`               | Default currency (e.g., USD) | ✅       |
| `PORT`                   | Server port (default: 5000)  | ❌       |

### Client Environment Variables

| Variable                     | Description               | Required |
| ---------------------------- | ------------------------- | -------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key     | ✅       |
| `VITE_CURRENCY`              | Currency symbol (e.g., $) | ✅       |
| `VITE_BACKEND_URL`           | Backend API URL           | ✅       |

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

Most endpoints require authentication via Clerk. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Endpoints

#### Course Routes

**Get All Courses**

```http
GET /api/course/all
```

Returns all published courses with educator information.

**Get Course by ID**

```http
GET /api/course/:id
```

Returns detailed course information including content structure.

#### User Routes

**Get User Data**

```http
GET /api/user/data
Authorization: Bearer <token>
```

Returns authenticated user's profile data.

**Get Enrolled Courses**

```http
GET /api/user/enrolled-courses
Authorization: Bearer <token>
```

Returns list of courses the user is enrolled in.

**Purchase Course**

```http
POST /api/user/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here"
}
```

Creates a Stripe checkout session for course purchase.

**Add Course Rating**

```http
POST /api/user/add-rating
Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here",
  "rating": 5
}
```

Adds or updates a course rating (1-5 stars).

#### Educator Routes

**Update Role to Educator**

```http
GET /api/educator/update-role
Authorization: Bearer <token>
```

Updates user role to educator.

**Add Course**

```http
POST /api/educator/add-course
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "courseData": "JSON_string_of_course_data",
  "image": "course_thumbnail_file"
}
```

Creates a new course with thumbnail upload.

**Get Educator Courses**

```http
GET /api/educator/courses
Authorization: Bearer <token>
```

Returns all courses created by the educator.

**Get Dashboard Data**

```http
GET /api/educator/dashboard
Authorization: Bearer <token>
```

Returns educator dashboard analytics.

**Get Enrolled Students**

```http
GET /api/educator/enrolled-students
Authorization: Bearer <token>
```

Returns list of students enrolled in educator's courses.

### Webhook Endpoints

**Clerk Webhook**

```http
POST /clerk
Content-Type: application/json
```

Handles Clerk authentication events.

**Stripe Webhook**

```http
POST /stripe
Content-Type: application/json
```

Handles Stripe payment events.

## 🚢 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend Deployment (Render/Railway/Heroku)

1. Push your code to GitHub
2. Create new web service
3. Set environment variables
4. Deploy

**Important:** Make sure to set all environment variables in your hosting platform's dashboard. See `PRODUCTION_SETUP.md` for detailed instructions.

### Database Setup

1. Create MongoDB Atlas cluster
2. Whitelist your deployment IP addresses
3. Create database user
4. Get connection string
5. Add to environment variables

### Webhook Configuration

**Clerk Webhooks:**

1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/clerk`
3. Subscribe to `user.created` and `user.updated` events
4. Copy webhook secret to environment variables

**Stripe Webhooks:**

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/stripe`
3. Subscribe to `checkout.session.completed` event
4. Copy webhook secret to environment variables

## 📁 Project Structure

```
integrals/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, icons, etc.
│   │   ├── components/    # Reusable components
│   │   │   ├── student/   # Student-facing components
│   │   │   └── educator/  # Educator-facing components
│   │   ├── context/       # React Context providers
│   │   ├── pages/         # Page components
│   │   │   ├── student/   # Student pages
│   │   │   └── educator/  # Educator pages
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend Express application
│   ├── configs/           # Configuration files
│   │   ├── cloudinary.js  # Cloudinary setup
│   │   ├── mongodb.js     # MongoDB connection
│   │   └── multer.js      # File upload config
│   ├── controllers/       # Route controllers
│   │   ├── courseController.js
│   │   ├── educatorController.js
│   │   ├── userController.js
│   │   └── webhooks.js
│   ├── middlewares/       # Custom middleware
│   │   └── authMiddleware.js
│   ├── models/            # Mongoose models
│   │   ├── Course.js
│   │   ├── User.js
│   │   ├── Purchase.js
│   │   └── CourseProgress.js
│   ├── routes/            # API routes
│   │   ├── courseRoutes.js
│   │   ├── educatorRoutes.js
│   │   └── userRoutes.js
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies
│   └── server.js          # Entry point
│
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── API_CONNECTIONS.md     # API documentation
├── PAYMENT_SETUP.md       # Payment setup guide
└── PRODUCTION_SETUP.md    # Production deployment guide
```

## 🔒 Security Best Practices

- ✅ All sensitive data stored in environment variables
- ✅ JWT-based authentication with Clerk
- ✅ CORS configured for specific origins
- ✅ Input validation on all endpoints
- ✅ Secure payment processing with Stripe
- ✅ File upload restrictions (size, type)
- ✅ MongoDB injection prevention with Mongoose
- ✅ HTTPS enforced in production

## 🧪 Testing

### Manual Testing

1. **User Registration/Login**

   - Sign up as new user
   - Login with existing credentials
   - Update role to educator

2. **Course Browsing**

   - View all courses
   - Filter courses
   - View course details
   - Watch preview videos

3. **Course Purchase**

   - Add course to cart
   - Complete Stripe checkout
   - Verify enrollment

4. **Educator Features**
   - Create new course
   - Upload thumbnail
   - Add chapters and lectures
   - View dashboard analytics

### Test Cards (Stripe)

**Successful Payment:**

```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

**Declined Payment:**

```
Card: 4000 0000 0000 0002
```

## 🐛 Troubleshooting

### Common Issues

**Issue: Frontend not connecting to backend**

- Verify `VITE_BACKEND_URL` in client/.env
- Check if backend server is running
- Verify CORS configuration

**Issue: Cloudinary upload failing**

- Verify Cloudinary credentials in .env
- Check file size limits
- Ensure file is an image

**Issue: Payment not working**

- Verify Stripe keys are correct
- Check webhook configuration
- Test with Stripe test cards

**Issue: Authentication errors**

- Verify Clerk keys are correct
- Check if user is logged in
- Verify JWT token is being sent

## 📈 Performance Optimization

- ✅ Code splitting with React lazy loading
- ✅ Image optimization with Cloudinary
- ✅ Database indexing on frequently queried fields
- ✅ Caching strategies for static content
- ✅ Minification and bundling with Vite
- ✅ GSAP animations for smooth UX

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ESLint for code linting
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Clerk for authentication
- Stripe for payment processing
- Cloudinary for image management
- MongoDB Atlas for database hosting
- All open-source contributors

## 📞 Support

For support, email support@integrals.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Add course certificates
- [ ] Implement course discussions/forums
- [ ] Add live streaming for lectures
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Course recommendations AI
- [ ] Peer-to-peer learning features

## 📊 Stats

- **Total Courses:** Dynamic
- **Active Users:** Growing
- **Course Categories:** Multiple
- **Average Rating:** 4.5/5

---

Made with ❤️ by the Integrals Team
