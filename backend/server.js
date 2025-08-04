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

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🔥 E-Commerce Backend LIVE!");
});
app.get("/api/health", (_, res) => {
  res.json({ message: "Server is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Seed logic
const sampleProducts = [
  /* your sample products... */
];

const seedDatabase = async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      console.log("✅ Admin created");
    }

    const userExists = await User.findOne({ email: "user@example.com" });
    if (!userExists) {
      await User.create({
        name: "Regular User",
        email: "user@example.com",
        password: "user123",
        role: "user",
      });
      console.log("✅ User created");
    }

    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      await Product.insertMany(sampleProducts);
      console.log("✅ Products seeded");
    }
  } catch (err) {
    console.error("❌ Seed error:", err);
  }
};

// START SERVER
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
