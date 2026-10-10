const express = require("express")
const CustomRequest = require("../models/CustomRequest")
const authMiddleware = require("../middleware/authMiddleware")
const artistMiddleware = require("../middleware/artistMiddleware")

const router = express.Router()
router.get(
  "/",
  authMiddleware,
  artistMiddleware,
  async (req, res) => {
    try {
      const requests = await CustomRequest.find()
        .populate("artworkId")
        .sort({ createdAt: -1 })

      res.json(requests)
    } catch (error) {
      console.error("Get custom requests error:", error)

      res.status(500).json({
        message: "Failed to fetch custom requests",
      })
    }
  }
)


router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      requestDetails,
      artworkId,
    } = req.body

    if (
      !fullName ||
      !phone ||
      !email ||
      !requestDetails ||
      !artworkId
    ) {
      return res.status(400).json({
        message: "All fields are required",
      })
    }

    const customRequest = await CustomRequest.create({
      fullName,
      phone,
      email,
      requestDetails,
      artworkId,
    })

    res.status(201).json({
      message: "Custom art request submitted successfully",
      request: customRequest,
    })
  } catch (error) {
    console.error("Custom request error:", error)

    res.status(500).json({
      message: "Failed to submit custom art request",
    })
  }
})

router.patch(
  "/:id/status",
  authMiddleware,
  artistMiddleware,
  async (req, res) => {
    try {
      const { status } = req.body

      const allowedStatuses = [
        "Pending",
        "In Progress",
        "Completed",
        "Cancelled",
      ]

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid status",
        })
      }

      const request = await CustomRequest.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      ).populate("artworkId")

      if (!request) {
        return res.status(404).json({
          message: "Custom request not found",
        })
      }

      res.json({
        message: "Request status updated successfully",
        request,
      })
    } catch (error) {
      console.error("Update custom request error:", error)

      res.status(500).json({
        message: "Failed to update request status",
      })
    }
  }
)

module.exports = router