const express = require("express")
const Artwork = require("../models/Artwork")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

// Get all artworks
router.get("/", async (req, res) => {
  try {
    const artworks = await Artwork.find().sort({
      createdAt: -1,
    })

    res.json({
      success: true,
      artworks,
    })
  } catch (error) {
    console.error("Get artworks error:", error.message)

    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get featured artworks
router.get("/featured", async (req, res) => {
  try {
    const artworks = await Artwork.find({
      featured: true,
    }).sort({
      createdAt: -1,
    })

    res.json({
      success: true,
      artworks,
    })
  } catch (error) {
    console.error("Get featured artworks error:", error.message)

    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Get one artwork by ID
router.get("/:id", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id)

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      })
    }

    res.json({
      success: true,
      artwork,
    })
  } catch (error) {
    console.error("Get artwork error:", error.message)

    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// Create a new artwork
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      size,
      category,
      featured,
    } = req.body

    if (
      !title ||
      !description ||
      !image ||
      !size ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All artwork fields are required",
      })
    }

    const artwork = await Artwork.create({
      title,
      description,
      image,
      size,
      category,
      featured,
    })

    res.status(201).json({
      success: true,
      message: "Artwork created successfully",
      artwork,
    })
  } catch (error) {
    console.error("Create artwork error:", error.message)

    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

module.exports = router