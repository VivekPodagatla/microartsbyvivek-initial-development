const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const router = express.Router()


// ================= HELPERS =================

const normalizePhone = (phone = "") => {
  return phone.replace(/\D/g, "")
}


// ================= REGISTER =================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
    } = req.body
    console.log("REGISTER DATA:", {
      hasName: Boolean(name),
      hasEmail: Boolean(email),
      hasPhone: Boolean(phone),
      phoneValue: phone,
      hasPassword: Boolean(password),
    })


    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, phone number and password are required",
      })
    }


    // Clean user input
    const cleanName = name.trim()

    const cleanEmail = email
      .trim()
      .toLowerCase()

    const cleanPhone =
      normalizePhone(phone)


    // Validate name
    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid name",
      })
    }


    // Validate email
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailPattern.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address",
      })
    }


    // Validate phone
    if (
      cleanPhone.length < 7 ||
      cleanPhone.length > 15
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid phone number",
      })
    }


    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      })
    }


    // Check email
    const existingEmail =
      await User.findOne({
        email: cleanEmail,
      })

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message:
          "An account already exists with this email",
      })
    }


    // Check phone
    const existingPhone =
      await User.findOne({
        phone: cleanPhone,
      })

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message:
          "An account already exists with this phone number",
      })
    }


    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      )


    
    console.log("ABOUT TO CREATE USER:", {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      passwordExists: Boolean(hashedPassword),
    })
    // Create customer account
    const user =
      await User.create({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        password:
          hashedPassword,
      })


    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )


    // Registration successful
    res.status(201).json({
      success: true,

      message:
        "User registered successfully",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    })

  } catch (error) {

    console.error(
      "Registration error:",
      error
    )


    // Handle MongoDB duplicate values
    if (error.code === 11000) {

      if (
        error.keyPattern?.email
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "An account already exists with this email",
          })
      }


      if (
        error.keyPattern?.phone
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "An account already exists with this phone number",
          })
      }
    }


    res.status(500).json({
      success: false,
      message:
        "Server error",
    })
  }
})


// ================= LOGIN =================

router.post("/login", async (req, res) => {
  try {
    const {
      identifier,
      password,
    } = req.body


    if (
      !identifier ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email or phone number and password are required",
      })
    }


    const cleanIdentifier =
      identifier.trim()

    let user


    // ================= LOGIN USING EMAIL =================

    if (
      cleanIdentifier.includes("@")
    ) {
      const cleanEmail =
        cleanIdentifier
          .toLowerCase()

      user = await User.findOne({
        email: cleanEmail,
      })
    }


    // ================= LOGIN USING PHONE =================

    else {
      const cleanPhone =
        normalizePhone(
          cleanIdentifier
        )


      if (
        cleanPhone.length < 10 ||
        cleanPhone.length > 15
      ) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid email, phone number or password",
          })
      }


      // First try exact match
      user = await User.findOne({
        phone: cleanPhone,
      })


      // If exact match was not found,
      // try the final 10 digits
      if (!user) {
        const last10Digits =
          cleanPhone.slice(-10)

        const matchingUsers =
          await User.find({
            phone: {
              $regex:
                `${last10Digits}$`,
            },
          })


        if (
          matchingUsers.length === 1
        ) {
          user =
            matchingUsers[0]
        }


        if (
          matchingUsers.length > 1
        ) {
          return res
            .status(409)
            .json({
              success: false,
              message:
                "More than one account uses this phone number. Please enter your full phone number with country code.",
            })
        }
      }
    }


    // ================= USER NOT FOUND =================

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email, phone number or password",
      })
    }


    // ================= CHECK PASSWORD =================

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      )


    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email, phone number or password",
      })
    }


    // ================= CREATE TOKEN =================

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    )


    // ================= LOGIN SUCCESS =================

    res.json({
      success: true,

      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone:
          user.phone || "",
        role: user.role,
      },
    })

  } catch (error) {
    console.error(
      "Login error:",
      error
    )

    res.status(500).json({
      success: false,
      message:
        "Server error",
    })
  }
})


module.exports = router