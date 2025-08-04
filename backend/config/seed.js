import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Product from "../models/Product.js";
import connectDB from "./database.js";

dotenv.config();

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

const adminUser = {
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // // Clear existing data
    // await User.deleteMany({});
    // await Product.deleteMany({});

    // Create admin user
    await User.create(adminUser);
    console.log("Admin user created");

    // Create sample products
    await Product.insertMany(sampleProducts);
    console.log("Sample products created");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
