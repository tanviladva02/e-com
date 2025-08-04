import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Sample data for seeding
const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 159.99,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    category: "Electronics",
    stock: 50,
    featured: true,
  },
  {
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
    category: "Clothing",
    stock: 100,
    featured: false,
  },
  {
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitor, GPS, and smartphone connectivity.",
    price: 249.99,
    image: "https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg",
    category: "Electronics",
    stock: 25,
    featured: true,
  },
  {
    name: "Artisan Coffee Beans",
    description:
      "Premium single-origin coffee beans, freshly roasted with rich flavor notes.",
    price: 18.99,
    image: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg",
    category: "Food & Beverage",
    stock: 200,
    featured: false,
  },
  {
    name: "Minimalist Backpack",
    description:
      "Sleek and functional backpack perfect for work, travel, or daily use.",
    price: 79.99,
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg",
    category: "Accessories",
    stock: 35,
    featured: true,
  },
  {
    name: "Wireless Phone Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 34.99,
    image: "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg",
    category: "Electronics",
    stock: 75,
    featured: false,
  },
];

// Function to seed database
const seedDatabase = async () => {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (!adminExists) {
      // Create admin user
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Admin user created successfully");
    } else {
      console.log("✅ Admin user already exists");
    }

    // Check if regular user exists
    const userExists = await User.findOne({ email: "user@example.com" });

    if (!userExists) {
      // Create regular user
      await User.create({
        name: "Regular User",
        email: "user@example.com",
        password: "user123",
        role: "user",
      });
      console.log("✅ Regular user created successfully");
    } else {
      console.log("✅ Regular user already exists");
    }

    // Check if products exist
    const productsCount = await Product.countDocuments();

    if (productsCount === 0) {
      // Create sample products
      await Product.insertMany(sampleProducts);
      console.log("✅ Sample products created successfully");
    } else {
      console.log("✅ Sample products already exist");
    }

    console.log("🎉 Database is ready!");
    console.log("👑 Admin credentials: admin@example.com / admin123");
    console.log("👤 User credentials: user@example.com / user123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

// Connect to MongoDB and seed database
const initializeServer = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (error) {
    console.error("❌ Error initializing server:", error);
  }
};

// Initialize server
initializeServer();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
});
