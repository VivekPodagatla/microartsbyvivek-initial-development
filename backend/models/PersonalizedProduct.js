const mongoose = require("mongoose")

const personalizedProductSchema = new mongoose.Schema(
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
      trim: true,
    },

    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    pricePerLetter: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  "PersonalizedProduct",
  personalizedProductSchema
)