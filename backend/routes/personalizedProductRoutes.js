const express = require("express")
const PersonalizedProduct = require("../models/PersonalizedProduct")
const authMiddleware = require("../middleware/authMiddleware")
const artistMiddleware = require("../middleware/artistMiddleware")
const upload = require("../middleware/uploadMiddleware")

const router = express.Router()

// =====================================================
// PUBLIC - GET ACTIVE PERSONALIZED PRODUCTS
// =====================================================

router.get("/", async (req, res) => {
  try {
    const products = await PersonalizedProduct.find({
      active: true,
    }).sort({
      createdAt: -1,
    })

    res.json(products)
  } catch (error) {
    console.error(
      "Get personalized products error:",
      error
    )

    res.status(500).json({
      message: "Failed to fetch personalized products",
    })
  }
})


// =====================================================
// ARTIST - GET ALL PERSONALIZED PRODUCTS
// Includes active and inactive products
// =====================================================

router.get(
  "/artist/all",
  authMiddleware,
  artistMiddleware,
  async (req, res) => {
    try {
      const products =
        await PersonalizedProduct.find().sort({
          createdAt: -1,
        })

      res.json(products)
    } catch (error) {
      console.error(
        "Get artist products error:",
        error
      )

      res.status(500).json({
        message: "Failed to fetch personalized products",
      })
    }
  }
)


// =====================================================
// ARTIST - ADD NEW PERSONALIZED PRODUCT
// =====================================================

router.post(
  "/",
  authMiddleware,
  artistMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        basePrice,
        pricePerLetter,
        minimumPrice,
        active,
      } = req.body

      if (
        !title ||
        !description ||
        basePrice === undefined
      ) {
        return res.status(400).json({
          message:
            "Title, description and base price are required",
        })
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Product image is required",
        })
      }

      const imageUrl =
        `/uploads/products/${req.file.filename}`

      const product =
        await PersonalizedProduct.create({
          title,
          description,
          image: imageUrl,
          basePrice: Number(basePrice),
          pricePerLetter: Number(
            pricePerLetter || 0
          ),
          minimumPrice: Number(
            minimumPrice || 0
          ),
          active:
            active === undefined
              ? true
              : active === "true",
        })

      res.status(201).json({
        message:
          "Personalized product created successfully",
        product,
      })
    } catch (error) {
      console.error(
        "Create personalized product error:",
        error
      )

      res.status(500).json({
        message:
          "Failed to create personalized product",
      })
    }
  }
)


// =====================================================
// ARTIST - EDIT / UPDATE PERSONALIZED PRODUCT
// =====================================================

router.patch(
  "/:id",
  authMiddleware,
  artistMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const product =
        await PersonalizedProduct.findById(
          req.params.id
        )

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        })
      }

      if (req.body.title !== undefined) {
        product.title = req.body.title
      }

      if (req.body.description !== undefined) {
        product.description =
          req.body.description
      }

      if (req.body.basePrice !== undefined) {
        product.basePrice = Number(
          req.body.basePrice
        )
      }

      if (
        req.body.pricePerLetter !== undefined
      ) {
        product.pricePerLetter = Number(
          req.body.pricePerLetter
        )
      }

      if (
        req.body.minimumPrice !== undefined
      ) {
        product.minimumPrice = Number(
          req.body.minimumPrice
        )
      }

      if (req.body.active !== undefined) {
        product.active =
          req.body.active === "true"
      }

      // Replace image only when a new image is uploaded
      if (req.file) {
        product.image =
          `/uploads/products/${req.file.filename}`
      }

      await product.save()

      res.json({
        message:
          "Personalized product updated successfully",
        product,
      })
    } catch (error) {
      console.error(
        "Update personalized product error:",
        error
      )

      res.status(500).json({
        message:
          "Failed to update personalized product",
      })
    }
  }
)

// =====================================================
// ARTIST - DELETE PERSONALIZED PRODUCT
// =====================================================

router.delete(
  "/:id",
  authMiddleware,
  artistMiddleware,
  async (req, res) => {
    try {
      const product =
        await PersonalizedProduct.findByIdAndDelete(
          req.params.id
        )

      if (!product) {
        return res.status(404).json({
          message:
            "Personalized product not found",
        })
      }

      res.json({
        message:
          "Personalized product deleted successfully",
      })
    } catch (error) {
      console.error(
        "Delete personalized product error:",
        error
      )

      res.status(500).json({
        message:
          "Failed to delete personalized product",
      })
    }
  }
)


module.exports = router