const mongoose = require("mongoose")

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Artwork = mongoose.model("Artwork", artworkSchema)

module.exports = Artwork