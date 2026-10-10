const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const artworkRoutes = require("./routes/artworkRoutes")
const customRequestRoutes = require("./routes/customRequestRoutes")
const personalizedProductRoutes = require("./routes/personalizedProductRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()
// ================= RATE LIMITING =================

const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,

  standardHeaders: "draft-7",
  legacyHeaders: false,

  message: {
    message:
      "Too many requests. Please try again later.",
  },
})

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
)
app.use(express.json())
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
)

// Authentication routes
app.use(
  "/api/auth",
  publicApiLimiter,
  authRoutes
)

app.use("/api/users", userRoutes)

app.use("/api/artworks", artworkRoutes)

app.use(
  "/api/custom-requests",
  publicApiLimiter,
  customRequestRoutes
)

app.use(
  "/api/personalized-products",
  personalizedProductRoutes
)

app.use(
  "/api/orders",
  publicApiLimiter,
  orderRoutes
)
// Test route
app.get("/", (req, res) => {
  res.json({
    message: "MicroArts API is running",
  })
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MicroArts backend is working",
  })
})

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully")

    app.listen(PORT, () => {
      console.log(
        `MicroArts backend running on http://localhost:${PORT}`
      )
    })
  })
  .catch((error) => {
    console.error("MongoDB connection failed:")
    console.error(error.message)
  })