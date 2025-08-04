# E-commerce Backend API

A Node.js/Express.js backend API for an e-commerce application with MongoDB and JWT authentication.

## Features

- User authentication (register, login, JWT tokens)
- Product CRUD operations
- Shopping cart management
- Admin role-based access control
- Password hashing with bcrypt
- MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Navigate to the backend directory:
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

4. Update the `.env` file with your MongoDB connection string and JWT secret:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

## Running the Application

1. Start the server:
   ```bash
   npm run dev
   ```

2. The API will be available at `http://localhost:5000`

## Seeding Sample Data

To add sample products and admin user:

```bash
npm run seed
```

This creates:
- Admin user: `admin@example.com` / `admin123`
- 6 sample products with different categories

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart` - Update cart item (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart/clear` - Clear entire cart (protected)

## Project Structure

```
backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── seed.js          # Database seeding script
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── cartController.js
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── models/
│   ├── User.js
│   └── Product.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── cart.js
├── .env.example
├── server.js
└── package.json
```

## Testing

Use tools like Postman or curl to test the API endpoints. Make sure to include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```