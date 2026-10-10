const express = require("express")
const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

// Get logged-in user's profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Profile error:", error.message)

    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router