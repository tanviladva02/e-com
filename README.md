# Full-Stack E-commerce Application

A complete e-commerce web application built with Node.js/Express backend and React frontend, featuring JWT authentication, MongoDB database, and comprehensive cart management.

## 🚀 Features

### Backend
- **Authentication**: JWT-based signup/login/logout with bcrypt password hashing
- **Product Management**: Full CRUD operations for products
- **Cart System**: User-specific cart with add/remove/update functionality
- **Admin Panel**: Role-based access control for product management
- **Database**: MongoDB with Mongoose ODM
- **Security**: Protected routes and admin-only endpoints

### Frontend  
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Authentication**: Login/register forms with form validation
- **Product Catalog**: Browse products with search and category filtering
- **Shopping Cart**: Real-time cart updates with quantity management
- **Admin Dashboard**: Product management interface for administrators
- **Protected Routes**: Client-side route protection based on user roles

## 📁 Project Structure

```
/
├── backend/              # Node.js/Express API
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Authentication middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── config/          # Database config & seeding
│   └── server.js        # Express server
├── frontend/            # React application (current directory)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context providers
│   │   ├── services/    # API service layer
│   │   └── App.tsx      # Main app component
│   └── ...
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

6. (Optional) Seed sample data:
   ```bash
   npm run seed
   ```

### Frontend Setup

1. In the project root (frontend directory):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/profile` - Get user profile (protected)

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart Endpoints
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart` - Update cart item quantity (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear entire cart (protected)

## 🔐 Demo Accounts

After running the seed script, you can use these demo accounts:

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean interface with intuitive navigation
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Optimized images and efficient API calls

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Role-based access control
- Input validation and sanitization
- CORS configuration

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Update MONGODB_URI to your production database
3. Deploy using your preferred hosting service (Heroku, DigitalOcean, etc.)

### Frontend Deployment  
1. Update API base URL in `src/services/api.ts`
2. Build the application: `npm run build`
3. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💻 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

### Frontend
- React 18
- TypeScript
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React (icons)
- Vite (build tool)

---

Built with ❤️ using modern web technologies# e-com
# e-com
# e-com
