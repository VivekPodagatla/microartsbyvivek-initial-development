import { useState, useEffect } from "react"
import "./App.css"
const API_URL =
  import.meta.env.VITE_API_URL
const getImageUrl = (image) => {
  if (!image) {
    return ""
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image
  }

  return `${API_URL}${image}`
}

function App() {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/artworks`
        )

        const data = await response.json()

        if (!response.ok) {
          console.error(
            "Failed to load artworks:",
            data.message
          )
          return
        }

        setArtworks(data.artworks)
      } catch (error) {
        console.error(
          "Artwork loading error:",
          error
        )
      }
    }

    loadArtworks()
  }, [])

  useEffect(() => {
    const loadPersonalizedProducts = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/personalized-products`
        )

        const data = await response.json()

        if (!response.ok) {
          console.error(
            "Failed to load personalized products:",
            data.message
          )
          return
        }

        setPersonalizedProducts(data)
      } catch (error) {
        console.error(
          "Personalized products loading error:",
          error
        )
      }
    }

  loadPersonalizedProducts()
}, [])

  const [selectedArtwork, setSelectedArtwork] =
    useState(null)

  const [customRequestArtwork, setCustomRequestArtwork] = useState(null)

  const [showRequestForm, setShowRequestForm] =
    useState(false)

  const [requestSubmitted, setRequestSubmitted] =
    useState(false)

  const [showPersonalized, setShowPersonalized] =
    useState(false)

  const [showProduct, setShowProduct] =
    useState(false)

  const [customText, setCustomText] =
    useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  

  // ================= AUTH PROFILE =================

  useEffect(() => {
    const token =
      localStorage.getItem("authToken")

    if (!token) {
      return
    }

    const loadUserProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/users/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          localStorage.removeItem(
            "authToken"
          )

          setAuthToken(null)
          setIsLoggedIn(false)
          setUser(null)

          return
        }

        setUser(data.user)
        setIsLoggedIn(true)
        setAuthToken(token)
      } catch (error) {
        console.error(
          "Profile loading error:",
          error
        )
      }
    }

    loadUserProfile()
  }, [])

  // ================= CART =================

  const [cart, setCart] = useState([])
  const [showCart, setShowCart] =
    useState(false)

  // ================= CHECKOUT =================

  const [showCheckout, setShowCheckout] =
    useState(false)

  const [checkoutName, setCheckoutName] =
    useState("")

  const [checkoutEmail, setCheckoutEmail] =
    useState("")

  const [checkoutPhone, setCheckoutPhone] =
    useState("")
  const [checkoutCountryCode, setCheckoutCountryCode] =
  useState("+1")

  const [checkoutAddress, setCheckoutAddress] =
    useState("")
  // ================= ORDER SUBMITTING =================

  const [isSubmittingOrder, setIsSubmittingOrder] =
    useState(false)

    // ================= ORDER SUCCESS =================

  const [orderSubmitted, setOrderSubmitted] =
    useState(false)

  const [submittedOrder, setSubmittedOrder] =
    useState(null)

  // ================= AUTHENTICATION UI =================

  const [showLogin, setShowLogin] =
    useState(false)

  const [showRegister, setShowRegister] =
    useState(false)

  const [showAccount, setShowAccount] =
    useState(false)
  const [showArtistDashboard, setShowArtistDashboard] = useState(false)
  const [customRequests, setCustomRequests] = useState([])
  // ================= CUSTOMER ORDERS =================

  const [orders, setOrders] = useState([])

  const [personalizedProducts, setPersonalizedProducts] = useState([])
  const [selectedPersonalizedProduct,setSelectedPersonalizedProduct,] = useState(null)
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [artistDashboardSection, setArtistDashboardSection] = useState("home")

  const [isLoggedIn, setIsLoggedIn] =
    useState(false)

  const [user, setUser] = useState(null)

  const [authToken, setAuthToken] =
    useState(
      localStorage.getItem("authToken")
    )

  // ================= LOGIN FIELDS =================

  const [loginEmail, setLoginEmail] =
    useState("")

  const [loginPassword, setLoginPassword] =
    useState("")

  // ================= REGISTER FIELDS =================

const [registerName, setRegisterName] =
  useState("")

const [registerEmail, setRegisterEmail] =
  useState("")

const [registerPhone, setRegisterPhone] =
  useState("")

const [registerCountryCode, setRegisterCountryCode] =
  useState("+1")

const [registerPassword, setRegisterPassword] =
  useState("")
 // ================= PRICING =================

  const letterCount =
    customText.replace(/\s/g, "").length
  

  // ================= NAVIGATION =================

  const goHome = () => {
    setShowCart(false)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowAccount(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowArtistDashboard(false)

    // Close checkout
    setShowCheckout(false)

    // Clear order success screen
    setOrderSubmitted(false)
    setSubmittedOrder(null)

    // Clear selected artwork/product
    setSelectedArtwork(null)
    setSelectedPersonalizedProduct(null)

    // Clear personalized text
    setCustomText("")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const openPersonalized = async () => {
    setShowCart(false)
    setShowProduct(false)
    setShowAccount(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowArtistDashboard(false)
    setShowCheckout(false)
    setShowPersonalized(true)

    setOrderSubmitted(false)
    setSubmittedOrder(null)

    setSelectedArtwork(null)

    try {
      const response = await fetch(
        `${API_URL}/api/personalized-products`
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to load personalized products"
        )
        return
      }

      setPersonalizedProducts(data)

    } catch (error) {
      console.error(
        "Personalized products loading error:",
        error
      )

      alert(
        "Unable to load personalized products."
      )
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  const openCart = () => {
    setShowCart(true)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowAccount(false)
    setShowLogin(false)
    setShowRegister(false)
    setShowArtistDashboard(false)
    setShowCheckout(false)

    setOrderSubmitted(false)
    setSubmittedOrder(null)

    setSelectedArtwork(null)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }


  const openLogin = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowAccount(false)
    setShowCart(false)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowArtistDashboard(false)
    setShowCheckout(false)

    setOrderSubmitted(false)
    setSubmittedOrder(null)

    setSelectedArtwork(null)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }


  const openRegister = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowAccount(false)
    setShowCart(false)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowArtistDashboard(false)
    setShowCheckout(false)

    setOrderSubmitted(false)
    setSubmittedOrder(null)

    setSelectedArtwork(null)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }


  const openAccount = () => {
    setShowAccount(true)
    setShowLogin(false)
    setShowRegister(false)
    setShowCart(false)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowArtistDashboard(false)
    setShowCheckout(false)

    setOrderSubmitted(false)
    setSubmittedOrder(null)

    setSelectedArtwork(null)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  const openArtistDashboard = async () => {
    setShowArtistDashboard(true)
    setArtistDashboardSection("home")

    setShowCart(false)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowAccount(false)
    setShowLogin(false)
    setShowRegister(false)
    setSelectedArtwork(null)
    setShowRequestForm(false)
    setRequestSubmitted(false)

    try {
      // Load customized art requests
      const requestsResponse = await fetch(
        `${API_URL}/api/custom-requests`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      const requestsData =
        await requestsResponse.json()

      if (!requestsResponse.ok) {
        alert(
          requestsData.message ||
            "Failed to load custom requests"
        )
        return
      }

      // Load personalized products
      const productsResponse = await fetch(
        `${API_URL}/api/personalized-products/artist/all`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      const productsData =
        await productsResponse.json()

      if (!productsResponse.ok) {
        alert(
          productsData.message ||
            "Failed to load personalized products"
        )
        return
      }
      const ordersResponse = await fetch(
        `${API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      const ordersData = await ordersResponse.json()

      if (!ordersResponse.ok) {
        alert(
          ordersData.message ||
            "Failed to load customer orders"
        )
        return
      }

      setCustomRequests(requestsData)
      setPersonalizedProducts(productsData)
      setOrders(ordersData)
    } catch (error) {
      console.error(
        "Artist dashboard error:",
        error
      )

      alert(
        "Unable to load Artist Dashboard"
      )
    }
  }
  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await fetch(
        `${API_URL}/api/custom-requests/${requestId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || "Failed to update status")
        return
      }

      setCustomRequests((currentRequests) =>
        currentRequests.map((request) =>
          request._id === requestId
            ? data.request
            : request
        )
      )
    } catch (error) {
      console.error("Status update error:", error)
      alert("Unable to update request status")
    }
  }
  // ================= UPDATE ORDER STATUS =================

  const updateOrderStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update order status."
        )
        return
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? data.order
            : order
        )
      )

    } catch (error) {
      console.error(
        "Order status update error:",
        error
      )

      alert(
        "Unable to update order status."
      )
    }
  }

  const handleAddProduct = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(
        `${API_URL}/api/personalized-products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to add personalized product"
        )
        return
      }

      setPersonalizedProducts(
        (currentProducts) => [
          data.product,
          ...currentProducts,
        ]
      )

      setShowAddProductForm(false)

      form.reset()

      alert(
        "Personalized MicroArt added successfully!"
      )
    } catch (error) {
      console.error(
        "Add personalized product error:",
        error
      )

      alert(
        "Unable to add personalized product"
      )
    }
  }
  const toggleProductActive = async (product) => {
    try {
      const formData = new FormData()

      formData.append(
        "active",
        String(!product.active)
      )

      const response = await fetch(
        `${API_URL}/api/personalized-products/${product._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update product"
        )
        return
      }

      setPersonalizedProducts((currentProducts) =>
        currentProducts.map((currentProduct) =>
          currentProduct._id === product._id
            ? data.product
            : currentProduct
        )
      )
    } catch (error) {
      console.error(
        "Update product status error:",
        error
      )

      alert("Unable to update product")
    }
  }

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${product.title}"?`
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(
        `${API_URL}/api/personalized-products/${product._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to delete product"
        )
        return
      }

      setPersonalizedProducts((currentProducts) =>
        currentProducts.filter(
          (currentProduct) =>
            currentProduct._id !== product._id
        )
      )

      alert("Product deleted successfully!")
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      )

      alert("Unable to delete product")
    }
  }

  const handleEditProduct = async (event) => {
    event.preventDefault()

    if (!editingProduct) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(
        `${API_URL}/api/personalized-products/${editingProduct._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update personalized product"
        )
        return
      }

      setPersonalizedProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === editingProduct._id
            ? data.product
            : product
        )
      )

      setEditingProduct(null)

      alert("Product updated successfully!")
    } catch (error) {
      console.error(
        "Edit personalized product error:",
        error
      )

      alert("Unable to update personalized product")
    }
  }
  // ================= ARTWORK DETAIL =================

  const openArtwork = (artwork) => {
    setSelectedArtwork(artwork)

    setShowCart(false)
    setShowProduct(false)
    setShowPersonalized(false)
    setShowAccount(false)
    setShowLogin(false)
    setShowRegister(false)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const backToGallery = () => {
    setSelectedArtwork(null)

    setTimeout(() => {
      document
        .getElementById("gallery")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
    }, 50)
  }

  // ================= REGISTER =================

  const handleRegister = async (
    event
  ) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: registerName,
            email: registerEmail,
            phone:
              `${registerCountryCode}${registerPhone}`,
            password: registerPassword,
          }),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Registration failed"
        )

        return
      }

      localStorage.setItem(
        "authToken",
        data.token
      )

      setAuthToken(data.token)

      setUser(data.user)
      setIsLoggedIn(true)

      setRegisterName("")
      setRegisterEmail("")
      setRegisterCountryCode("+1")
      setRegisterPassword("")

      setShowRegister(false)
      setShowAccount(false)

      goHome()
    } catch (error) {
      console.error(
        "Registration error:",
        error
      )

      alert(
        "Unable to connect to the server. Make sure the backend is running."
      )
    }
  }

  

  // ================= LOGIN =================

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            identifier: loginEmail,
            password: loginPassword,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Login failed"
        )

        return
      }

      localStorage.setItem(
        "authToken",
        data.token
      )

      setAuthToken(data.token)

      setUser(data.user)
      setIsLoggedIn(true)

      setLoginEmail("")
      setLoginPassword("")

      setShowLogin(false)
      setShowAccount(false)

      goHome()

    } catch (error) {
      console.error(
        "Login error:",
        error
      )

      alert(
        "Unable to connect to the server. Make sure the backend is running."
      )
    }
  }

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem(
      "authToken"
    )

    setAuthToken(null)
    setIsLoggedIn(false)
    setUser(null)
    setShowAccount(false)

    // Close Artist Dashboard and clear artist-only data
    setShowArtistDashboard(false)
    setCustomRequests([])

    // Return to the homepage
    goHome()

    alert(
      "You have been logged out."
    )
  }

  // ================= CART =================

  const calculatePersonalizedPrice = (product, text) => {
    if (!product) {
      return 0
    }

    const letters = text.replace(/\s/g, "").length

    const basePrice =
      Number(product.basePrice) || 0

    const minimumPrice =
      Number(product.minimumPrice) || 0

    const pricePerLetter =
      Number(product.pricePerLetter) || 0

    return Math.max(
      basePrice,
      minimumPrice,
      letters * pricePerLetter
    )
  }


  // ================= ADD TO CART =================

  const addToCart = () => {
    if (!selectedPersonalizedProduct) {
      alert("Please select a product.")
      return
    }

    if (letterCount === 0) {
      alert(
        "Please enter a name or message before adding to cart."
      )
      return
    }

    const itemPrice =
      calculatePersonalizedPrice(
        selectedPersonalizedProduct,
        customText
      )

    const newItem = {
      id:
        `${selectedPersonalizedProduct._id}-${Date.now()}`,

      productId:
        selectedPersonalizedProduct._id,

      product:
        selectedPersonalizedProduct.title,

      text:
        customText.trim(),

      price:
        itemPrice,

      quantity:
        1,

      image:
        selectedPersonalizedProduct.image,
    }

    setCart((previousCart) => [
      ...previousCart,
      newItem,
    ])

    setCustomText("")
    setSelectedPersonalizedProduct(null)

    setShowProduct(false)
    setShowPersonalized(false)
    setShowCart(true)
  }


  // ================= INCREASE QUANTITY =================

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }


  // ================= DECREASE QUANTITY =================

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }


  // ================= REMOVE FROM CART =================

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    )
  }


  // ================= CART ITEM COUNT =================

  const cartItemCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )


  // ================= CART TOTAL =================

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )
  // ================= SUBMIT ORDER REQUEST =================

  const handleSubmitOrder = async (event) => {
    event.preventDefault()

    // Prevent duplicate submissions
    if (isSubmittingOrder) {
      return
    }

    if (cart.length === 0) {
      alert("Your cart is empty.")
      return
    }

    setIsSubmittingOrder(true)

    try {
      const response = await fetch(
        `${API_URL}/api/orders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: checkoutName,
            email: checkoutEmail,
            phone:
              `${checkoutCountryCode}${checkoutPhone}`,
            address: checkoutAddress,

            items: cart.map((item) => ({
              productId: item.productId,
              text: item.text,
              quantity: item.quantity,
            })),
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to submit order request."
        )

        setIsSubmittingOrder(false)
        return
      }

      // Save submitted order
      setSubmittedOrder(data.order)

      // Show success screen
      setOrderSubmitted(true)

      // Clear cart
      setCart([])

      // Clear checkout form
      setCheckoutName("")
      setCheckoutEmail("")
      setCheckoutPhone("")
      setCheckoutCountryCode("+1")
      setCheckoutAddress("")

      // Close checkout
      setShowCheckout(false)

      // Submission finished
      setIsSubmittingOrder(false)

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

    } catch (error) {
      console.error(
        "Order submission error:",
        error
      )

      setIsSubmittingOrder(false)

      alert(
        "Unable to submit your order request. Please try again."
      )
    }
  }


  // ================= PAGE =================

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        {/* LOGO */}
        <button
          className="logo"
          onClick={() => {
            setMobileMenuOpen(false)
            goHome()
          }}
        >
          <span className="logo-main">
            MICROARTS
          </span>

          <span className="logo-sub">
            by Vivek podagatla
          </span>
        </button>


        {/* MOBILE HAMBURGER */}
        <button
          className={`mobile-menu-button ${
            mobileMenuOpen ? "open" : ""
          }`}
          onClick={() =>
            setMobileMenuOpen((previous) => !previous)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        {/* NAVIGATION LINKS */}
        <div
          className={`nav-links ${
            mobileMenuOpen ? "nav-links-open" : ""
          }`}
        >

          <button
            onClick={() => {
              setMobileMenuOpen(false)
              goHome()
            }}
          >
            Home
          </button>


          <button
            onClick={() => {
              setMobileMenuOpen(false)

              goHome()

              setTimeout(() => {
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }, 50)
            }}
          >
            Gallery
          </button>


          <button
            onClick={() => {
              setMobileMenuOpen(false)

              goHome()

              setTimeout(() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }, 50)
            }}
          >
            About
          </button>


          <button
            onClick={() => {
              setMobileMenuOpen(false)

              goHome()

              setTimeout(() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }, 50)
            }}
          >
            Contact
          </button>


          {/* LOGIN / ACCOUNT */}

          {isLoggedIn ? (
            <>
              <button
                className="account-button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  openAccount()
                }}
              >
                👤 {user.name}
              </button>

              {user.role === "artist" && (
                <button
                  className="artist-dashboard-button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openArtistDashboard()
                  }}
                >
                  🎨 Artist Dashboard
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className="login-button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  openLogin()
                }}
              >
                Login
              </button>

              <button
                className="register-button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  openRegister()
                }}
              >
                Register
              </button>
            </>
          )}


          {/* CART */}

          <button
            className="cart-button"
            onClick={() => {
              setMobileMenuOpen(false)
              openCart()
            }}
          >
            🛒 Cart

            {cartItemCount > 0 && (
              <span className="cart-count">
                {cartItemCount}
              </span>
            )}
          </button>

        </div>

      </nav>


      {/* ================= LOGIN ================= */}

      {orderSubmitted && submittedOrder ? (

        /* ================= ORDER SUCCESS ================= */

        <section className="checkout-page">

          <div className="checkout-container">

            <div className="checkout-form-section order-success-card">

              <div className="order-success-icon">
                ✓
              </div>

              <h1>
                Order Request Submitted!
              </h1>

              <p>
                Thank you, {submittedOrder.fullName}.
                Your personalized MicroArt order request
                has been received successfully.
              </p>

              <p>
                The artist will contact you using the
                phone number or email you provided to
                confirm the order details.
              </p>

              <div className="order-confirmation-details">

                <h2>
                  Order Details
                </h2>

                <div className="confirmation-row">
                  <span>Status</span>

                  <strong className="order-status-badge">
                    {submittedOrder.status}
                  </strong>
                </div>

                <div className="confirmation-row">
                  <span>Estimated Total</span>

                  <strong className="confirmation-total">
                    $
                    {Number(
                      submittedOrder.totalPrice
                    ).toFixed(2)}
                  </strong>
                </div>

              </div>

              <div className="success-button-container">
                <button
                  className="checkout-button"
                  onClick={() => {
                    setOrderSubmitted(false)
                    setSubmittedOrder(null)
                    goHome()
                  }}
                >
                  Continue to Home
                </button>
              </div>

            </div>

          </div>

        </section>

      ) : showCheckout ? (

        /* ================= CHECKOUT ================= */
        <section className="checkout-page">

          <button
            className="back-button"
            onClick={() => {
              setShowCheckout(false)
              setShowCart(true)
            }}
          >
            ← Back to Cart
          </button>

          <div className="checkout-container">

            <div className="checkout-form-section">

              <h1>Submit Order Request</h1>

              <p>
                Enter your contact and shipping information.
                The artist will contact you to confirm your
                personalized MicroArt order.
              </p>

              <form
                className="checkout-form"
                onSubmit={handleSubmitOrder}
              >

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    required
                    minLength="2"
                    maxLength="100"
                    value={checkoutName}
                    onChange={(event) =>
                      setCheckoutName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>


                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    required
                    maxLength="150"
                    value={checkoutEmail}
                    onChange={(event) =>
                      setCheckoutEmail(event.target.value)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>


                <div className="form-group">
                  <label>Phone Number</label>

                  <div className="phone-input-row">

                    <input
                      type="text"
                      required
                      value={checkoutCountryCode}
                      onChange={(event) => {
                        let value = event.target.value

                        if (!value.startsWith("+")) {
                          value =
                            "+" +
                            value.replace(/\D/g, "")
                        } else {
                          value =
                            "+" +
                            value
                              .slice(1)
                              .replace(/\D/g, "")
                        }

                        setCheckoutCountryCode(
                          value.slice(0, 5)
                        )
                      }}
                      pattern="\+[0-9]{1,4}"
                      title="Enter a valid country code, for example +1 or +91."
                      className="country-code-input"
                      placeholder="+1"
                    />

                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      minLength="10"
                      maxLength="15"
                      pattern="[0-9]{10,15}"
                      title="Phone number must contain 10 to 15 digits."
                      value={checkoutPhone}
                      onChange={(event) => {
                        const value =
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 15)

                        setCheckoutPhone(value)
                      }}
                      placeholder="Phone number"
                      autoComplete="tel"
                    />

                  </div>

                  <div className="country-code-shortcuts">

                    <button
                      type="button"
                      onClick={() =>
                        setCheckoutCountryCode("+1")
                      }
                    >
                      US +1
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCheckoutCountryCode("+91")
                      }
                    >
                      India +91
                    </button>

                  </div>
                </div>


                <div className="form-group">
                  <label>Shipping Address</label>

                  <textarea
                    required
                    minLength="10"
                    maxLength="500"
                    rows="5"
                    value={checkoutAddress}
                    onChange={(event) =>
                      setCheckoutAddress(event.target.value)
                    }
                    placeholder="Street address, apartment/unit, city, state, ZIP code, country"
                    autoComplete="street-address"
                  />
                </div>

                <button
                  type="submit"
                  className="checkout-button"
                  disabled={isSubmittingOrder}
                >
                  {isSubmittingOrder
                    ? "Submitting..."
                    : "Submit Order Request"}
                </button>

              </form>

            </div>


            {/* ================= ORDER SUMMARY ================= */}

            <aside className="cart-summary">

              <h2>Order Summary</h2>

              {cart.map((item) => (

                <div
                  className="checkout-summary-item"
                  key={item.id}
                >

                  <strong>
                    {item.quantity} × {item.product}
                  </strong>

                  <p>
                    Personalization: "{item.text}"
                  </p>

                  <p>
                    $
                    {(
                      item.price * item.quantity
                    ).toFixed(2)}
                  </p>

                </div>

              ))}

              <hr />

              <div className="summary-row">
                <span>Items</span>

                <span>
                  {cartItemCount}
                </span>
              </div>

              <div className="summary-total">

                <span>
                  Estimated Total
                </span>

                <strong>
                  ${cartTotal.toFixed(2)}
                </strong>

              </div>

              <p>
                No payment is collected online.
                The artist will contact you to confirm
                the order details.
              </p>

            </aside>

          </div>

        </section>

      ) : showLogin ? (

        /* ================= LOGIN ================= */

        <section className="auth-page">

          <div className="auth-card">

            <button
              className="back-button"
              onClick={goHome}
            >
              ← Back to Home
            </button>

            <h1>
              Welcome Back
            </h1>

            <p className="auth-description">
              Login to your MicroArts account.
            </p>

            <form
              className="auth-form"
              onSubmit={handleLogin}
            >

              <div className="form-group">

                <label>
                  Email or Phone Number
                </label>

                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(event) =>
                    setLoginEmail(
                      event.target.value
                    )
                  }
                  placeholder="Enter your email or phone number"
                  autoComplete="username"
                />

              </div>

              

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(event) =>
                    setLoginPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter your password"
                />

              </div>

              <button
                className="auth-submit-button"
                type="submit"
              >
                Login
              </button>

            </form>

            <p className="auth-switch">

              Don't have an account?

              <button
                onClick={openRegister}
              >
                Create an account
              </button>

            </p>

          </div>

        </section>

      ) : showRegister ? (

        /* ================= REGISTER ================= */

        <section className="auth-page">

          <div className="auth-card">

            <button
              className="back-button"
              onClick={goHome}
            >
              ← Back to Home
            </button>

            <h1>
              Create Your Account
            </h1>

            <p className="auth-description">
              Join MicroArts and manage your
              personalized artwork orders.
            </p>

            <form
              className="auth-form"
              onSubmit={handleRegister}
            >

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={registerName}
                  onChange={(event) =>
                    setRegisterName(
                      event.target
                        .value
                    )
                  }
                  placeholder="Enter your full name"
                />

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={registerEmail}
                  onChange={(event) =>
                    setRegisterEmail(
                      event.target
                        .value
                    )
                  }
                  placeholder="Enter your email"
                />

              </div>
              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <div className="phone-input-row">

                  <input
                    type="text"
                    required
                    value={registerCountryCode}
                    onChange={(event) => {
                      let value = event.target.value

                      if (!value.startsWith("+")) {
                        value =
                          "+" +
                          value.replace(/\D/g, "")
                      } else {
                        value =
                          "+" +
                          value
                            .slice(1)
                            .replace(/\D/g, "")
                      }

                      setRegisterCountryCode(
                        value.slice(0, 5)
                      )
                    }}
                    pattern="\+[0-9]{1,4}"
                    title="Enter a valid country code, for example +1 or +91."
                    className="country-code-input"
                    placeholder="+1"
                  />

                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    minLength="10"
                    maxLength="15"
                    pattern="[0-9]{10,15}"
                    title="Phone number must contain 10 to 15 digits."
                    value={registerPhone}
                    onChange={(event) => {
                      const value =
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 15)

                      setRegisterPhone(value)
                    }}
                    placeholder="Phone number"
                    autoComplete="tel"
                  />

                </div>

                <div className="country-code-shortcuts">

                  <button
                    type="button"
                    onClick={() =>
                      setRegisterCountryCode("+1")
                    }
                  >
                    US +1
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setRegisterCountryCode("+91")
                    }
                  >
                    India +91
                  </button>

                </div>

              </div>

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  required
                  minLength="6"
                  value={
                    registerPassword
                  }
                  onChange={(event) =>
                    setRegisterPassword(
                      event.target
                        .value
                    )
                  }
                  placeholder="Create a password"
                />

              </div>

              <button
                className="auth-submit-button"
                type="submit"
              >
                Create Account
              </button>

            </form>

            <p className="auth-switch">

              Already have an account?

              <button
                onClick={
                  openLogin
                }
              >
                Login
              </button>

            </p>

          </div>

        </section>


      ) : showAccount ? (

        /* ================= ACCOUNT ================= */

        <section className="account-page">

          <button
            className="back-button"
            onClick={goHome}
          >
            ← Back to Home
          </button>

          <div className="account-card">

            <div className="account-avatar">
              👤
            </div>

            <h1>
              My Account
            </h1>

            <p className="account-welcome">
              Welcome, {user?.name}
            </p>

            <div className="account-details">

              <div className="account-detail">

                <span>
                  Full Name
                </span>

                <strong>
                  {user?.name}
                </strong>

              </div>

              <div className="account-detail">

                <span>
                  Email Address
                </span>

                <strong>
                  {user?.email}
                </strong>

              </div>

            </div>

            <div className="account-actions">

              <button
                onClick={openCart}
              >
                🛒 View My Cart
              </button>

              <button
                onClick={
                  openPersonalized
                }
              >
                🎨 Browse Personalized MicroArts
              </button>

              <button
                className="logout-button"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </div>

          </div>

        </section>


      ) : showCart ? (

        /* ================= CART ================= */

        <section className="cart-page">

          <button
            className="back-button"
            onClick={
              openPersonalized
            }
          >
            ← Continue Shopping
          </button>

          <div className="cart-header">

            <h1>
              Your Shopping Cart
            </h1>

            <p>
              {cartItemCount}{" "}
              {cartItemCount ===
              1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>

          {cart.length === 0 ? (

            <div className="empty-cart">

              <div className="empty-cart-icon">
                🛒
              </div>

              <h2>
                Your cart is empty
              </h2>

              <p>
                Explore our personalized
                MicroArts and create
                something unique.
              </p>

              <button
                className="continue-shopping-button"
                onClick={
                  openPersonalized
                }
              >
                Explore Personalized MicroArts
              </button>

            </div>

          ) : (

            <div className="cart-layout">

              <div className="cart-items">

                {cart.map(
                  (item) => (

                    <article
                      className="cart-item"
                      key={item.id}
                    >

                      <div className="cart-item-image">

                      <img
                        src={getImageUrl(item.image)}
                        alt={item.product}
                      />

                      </div>

                      <div className="cart-item-info">

                        <h3>
                          {
                            item.product
                          }
                        </h3>

                        <p className="cart-custom-text">
                          Custom text:{" "}
                          <strong>
                            "{item.text}"
                          </strong>
                        </p>

                        <p className="cart-item-price">
                          $
                          {
                            item.price
                          }{" "}
                          each
                        </p>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {
                              item.quantity
                            }
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="remove-cart-item"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                      <div className="cart-item-total">

                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(
                          2
                        )}

                      </div>

                    </article>

                  )
                )}

              </div>

              <aside className="cart-summary">

                <h2>
                  Order Summary
                </h2>

                <div className="summary-row">

                  <span>
                    Items
                  </span>

                  <span>
                    {
                      cartItemCount
                    }
                  </span>

                </div>

                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    $
                    {cartTotal.toFixed(
                      2
                    )}
                  </span>

                </div>

                <div className="summary-row">

                  <span>
                    Shipping
                  </span>

                  <span>
                    Will be confirmed by artist
                  </span>

                </div>

                <hr />

                <div className="summary-total">

                  <span>
                    Confirmed by artist
                  </span>

                  <strong>
                    $
                    {cartTotal.toFixed(
                      2
                    )}
                  </strong>

                </div>

                <button
                  className="checkout-button"
                  onClick={() => {
                    setShowCheckout(true)
                    setShowCart(false)

                    if (user) {
                      setCheckoutName(user.name || "")
                      setCheckoutEmail(user.email || "")
                    }

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }}
                >
                  Proceed to Checkout
                </button>

              </aside>

            </div>

          )}

        </section>

      ) : showArtistDashboard ? (

        /* ================= ARTIST DASHBOARD ================= */

        <section className="artist-dashboard">

          <button
            className="back-button"
            onClick={
              artistDashboardSection === "home"
                ? goHome
                : () => setArtistDashboardSection("home")
            }
          >
            {artistDashboardSection === "home"
              ? "← Back to Home"
              : "← Back to Dashboard"}
          </button>


          {/* ========== DASHBOARD HOME ========== */}

          {artistDashboardSection === "home" && (

            <>

              <div className="artist-dashboard-header">

                <h1>
                  Artist Dashboard
                </h1>

                <p>
                  Manage your MicroArts products and customer requests.
                </p>

              </div>


              <div className="dashboard-options">

                <button
                  className="dashboard-option-card"
                  onClick={() =>
                    setArtistDashboardSection("requests")
                  }
                >

                  <span className="dashboard-option-icon">
                    📩
                  </span>

                  <h2>
                    Customized Art Requests
                  </h2>

                  <p>
                    View customer requests, contact details,
                    artwork information and update request status.
                  </p>

                  <strong>
                    {customRequests.length} Requests →
                  </strong>

                </button>


                {/* ================= CUSTOMER ORDERS ================= */}

                <button
                  className="dashboard-option-card"
                  onClick={() =>
                    setArtistDashboardSection("orders")
                  }
                >

                  <span className="dashboard-option-icon">
                    🛒
                  </span>

                  <h2>
                    Customer Orders
                  </h2>

                  <p>
                    View personalized MicroArt orders,
                    customer contact details, shipping information
                    and update order status.
                  </p>

                  <strong>
                    {orders.length} Orders →
                  </strong>

                </button>


                <button 
                  className="dashboard-option-card" 
                  onClick={() => 
                    setArtistDashboardSection("products") 
                  } 
                >

                  <span className="dashboard-option-icon">
                    🛍️
                  </span>

                  <h2>
                    Manage Personalized Arts
                  </h2>

                  <p>
                    Add, edit, deactivate or delete personalized
                    MicroArt products and manage pricing.
                  </p>

                  <strong>
                    {personalizedProducts.length} Products →
                  </strong>

                </button>

              </div>

            </>

          )}


          {/* ========== CUSTOM REQUESTS ========== */}

          {artistDashboardSection === "requests" && (

            <>

              <div className="artist-dashboard-header">

                <h1>
                  Customized Art Requests
                </h1>

                <p>
                  Manage customer customized MicroArt requests.
                </p>

              </div>


              {customRequests.length === 0 ? (

                <div className="empty-dashboard">

                  <h2>
                    No Custom Requests
                  </h2>

                  <p>
                    There are currently no customized artwork requests.
                  </p>

                </div>

              ) : (

                <div className="custom-requests-list">

                  {customRequests.map((request) => (

                    <article
                      className="custom-request-card"
                      key={request._id}
                    >

                      {request.artworkId?.image && (

                        <div className="request-artwork-image">

                          <img
                            src={request.artworkId.image}
                            alt={request.artworkId.title}
                          />

                        </div>

                      )}


                      <h2>
                        {request.fullName}
                      </h2>


                      <p>
                        <strong>Phone:</strong>{" "}
                        {request.phone}
                      </p>


                      <p>
                        <strong>Email:</strong>{" "}
                        {request.email}
                      </p>


                      <p>
                        <strong>Request:</strong>{" "}
                        {request.requestDetails}
                      </p>


                      <p>
                        <strong>Artwork:</strong>{" "}
                        {request.artworkId?.title || "Artwork"}
                      </p>


                      <p>
                        <strong>Submitted:</strong>{" "}
                        {new Date(
                          request.createdAt
                        ).toLocaleString()}
                      </p>


                      <div className="request-status">

                        <label>
                          <strong>Status:</strong>
                        </label>

                        <select
                          value={request.status}
                          onChange={(event) =>
                            updateRequestStatus(
                              request._id,
                              event.target.value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Completed">
                            Completed
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </>

          )}


          {/* ========== CUSTOMER ORDERS ========== */}

          {artistDashboardSection === "orders" && (

            <>

              <div className="artist-dashboard-header">

                <h1>
                  Customer Orders
                </h1>

                <p>
                  Manage personalized MicroArt order requests.
                </p>

              </div>


              {orders.length === 0 ? (

                <div className="empty-dashboard">

                  <h2>
                    No Customer Orders
                  </h2>

                  <p>
                    There are currently no personalized MicroArt
                    order requests.
                  </p>

                </div>

              ) : (

                <div className="custom-requests-list customer-orders-list">

                  {orders.map((order) => (

                    <article
                      className="custom-request-card"
                      key={order._id}
                    >

                      {/* ================= DESKTOP CUSTOMER DETAILS ================= */}

                      <div className="order-customer-section desktop-order-customer">

                        <h2>
                          Customer Details
                        </h2>

                        <p>
                          <strong>Name:</strong>{" "}
                          {order.fullName}
                        </p>

                        <p>
                          <strong>Email:</strong>{" "}
                          {order.email}
                        </p>

                        <p>
                          <strong>Phone:</strong>{" "}
                          {order.phone}
                        </p>

                      </div>


                      <div className="order-shipping-section desktop-order-customer">

                        <h3>
                          Shipping Address
                        </h3>

                        <p>
                          {order.address}
                        </p>

                      </div>


                      <div className="order-date-section desktop-order-customer">

                        <p>
                          <strong>Submitted:</strong>{" "}
                          {new Date(
                            order.createdAt
                          ).toLocaleString()}
                        </p>

                      </div>


                      {/* ================= ORDER ITEMS ================= */}

                      <div className="order-items">

                        <h3 className="order-items-heading">
                          Ordered MicroArts
                        </h3>

                        {order.items.map(
                          (item, index) => (

                            <div
                              className="order-item"
                              key={`${order._id}-${index}`}
                            >

                              {item.image && (

                                <div className="order-item-image">

                                  <img
                                    src={getImageUrl(item.image)}
                                    alt={item.product}
                                  />

                                </div>

                              )}


                              <div className="order-item-details">

                                <h3>
                                  {item.product}
                                </h3>

                                <p className="order-personalization">
                                  <strong>
                                    Personalization:
                                  </strong>{" "}
                                  "{item.text}"
                                </p>

                                <p className="order-item-quantity">
                                  <strong>
                                    Quantity:
                                  </strong>{" "}
                                  {item.quantity}
                                </p>

                                <p className="order-item-price">
                                  <strong>
                                    Price Each:
                                  </strong>{" "}
                                  ${Number(item.price).toFixed(2)}
                                </p>

                                <p className="order-item-subtotal">
                                  <strong>
                                    Item Total:
                                  </strong>{" "}
                                  $
                                  {(
                                    Number(item.price) *
                                    item.quantity
                                  ).toFixed(2)}
                                </p>

                              </div>

                            </div>
                          )
                        )}

                      </div>


                      {/* ================= MOBILE CUSTOMER DETAILS ================= */}

                      <details className="mobile-customer-details">

                        <summary>
                          Customer Details
                        </summary>

                        <div className="mobile-customer-details-content">

                          <p>
                            <strong>Name:</strong>{" "}
                            {order.fullName}
                          </p>

                          <p>
                            <strong>Email:</strong>{" "}
                            {order.email}
                          </p>

                          <p>
                            <strong>Phone:</strong>{" "}
                            {order.phone}
                          </p>

                          <p>
                            <strong>Address:</strong>{" "}
                            {order.address}
                          </p>

                        </div>

                      </details>


                      {/* ================= ORDER MANAGEMENT ================= */}

                      <div className="order-management-section">

                        <div className="order-total-row">

                          <span>
                            Estimated Order Total
                          </span>

                          <strong>
                            ${Number(
                              order.totalPrice
                            ).toFixed(2)}
                          </strong>

                        </div>


                        <div className="order-status-control">

                          <label>
                            Order Status
                          </label>

                          <select
                            className={`order-status-select status-${order.status
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            value={order.status}
                            onChange={(event) =>
                              updateOrderStatus(
                                order._id,
                                event.target.value
                              )
                            }
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Contacted">
                              Contacted
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                        </div>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </>

          )}


          {/* ========== PERSONALIZED PRODUCTS ========== */}

          {artistDashboardSection === "products" && (

            <>
              {showAddProductForm && (

                <div className="product-form-overlay">

                  <div className="product-form-card">

                    <h2>
                      Add Personalized MicroArt
                    </h2>

                    <p>
                      Add a new personalized artwork for customers to order.
                    </p>

                    <form onSubmit={handleAddProduct}>

                      <div className="form-group">
                        <label>Product Title</label>

                        <input
                          type="text"
                          name="title"
                          required
                          placeholder="Example: Name Carved on 0.7 mm Pencil Lead"
                        />
                      </div>


                      <div className="form-group">
                        <label>Description</label>

                        <textarea
                          name="description"
                          required
                          rows="4"
                          placeholder="Describe the personalized artwork"
                        />
                      </div>


                      <div className="form-group">
                        <label>Product Image</label>

                        <input
                          type="file"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                          required
                        />
                      </div>


                      <div className="form-group">
                        <label>Base Price ($)</label>

                        <input
                          type="number"
                          name="basePrice"
                          min="0"
                          step="0.01"
                          required
                          placeholder="30"
                        />
                      </div>


                      <div className="form-group">
                        <label>Price Per Letter ($)</label>

                        <input
                          type="number"
                          name="pricePerLetter"
                          min="0"
                          step="0.01"
                          placeholder="5"
                        />
                      </div>


                      <div className="form-group">
                        <label>Minimum Price ($)</label>

                        <input
                          type="number"
                          name="minimumPrice"
                          min="0"
                          step="0.01"
                          placeholder="30"
                        />
                      </div>


                      <div className="product-form-actions">

                        <button
                          type="button"
                          onClick={() =>
                            setShowAddProductForm(false)
                          }
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="save-product-button"
                        >
                          Add Product
                        </button>

                      </div>

                    </form>

                  </div>

                </div>

              )}

              {editingProduct && (
                <div className="product-form-overlay">
                  <div className="product-form-card">
                    <h2>Edit Personalized MicroArt</h2>

                    <p>
                      Update the product information below.
                      Upload a new image only if you want to replace
                      the current image.
                    </p>

                    <form onSubmit={handleEditProduct}>
                      <div className="form-group">
                        <label>Product Title</label>

                        <input
                          type="text"
                          name="title"
                          defaultValue={editingProduct.title}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Description</label>

                        <textarea
                          name="description"
                          rows="4"
                          defaultValue={editingProduct.description}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Current Image</label>

                        <img
                          src={getImageUrl(editingProduct.image)}
                          alt={editingProduct.title}
                          style={{
                            width: "140px",
                            height: "140px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            display: "block",
                            marginTop: "8px",
                            marginBottom: "12px",
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label>Replace Image (Optional)</label>

                        <input
                          type="file"
                          name="image"
                          accept="image/jpeg,image/png,image/webp"
                        />
                      </div>

                      <div className="form-group">
                        <label>Base Price ($)</label>

                        <input
                          type="number"
                          name="basePrice"
                          min="0"
                          step="0.01"
                          defaultValue={editingProduct.basePrice}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Price Per Letter ($)</label>

                        <input
                          type="number"
                          name="pricePerLetter"
                          min="0"
                          step="0.01"
                          defaultValue={editingProduct.pricePerLetter}
                        />
                      </div>

                      <div className="form-group">
                        <label>Minimum Price ($)</label>

                        <input
                          type="number"
                          name="minimumPrice"
                          min="0"
                          step="0.01"
                          defaultValue={editingProduct.minimumPrice}
                        />
                      </div>

                      <div className="product-form-actions">
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="save-product-button"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <div className="artist-dashboard-header">

                <h1>
                  Manage Personalized MicroArts
                </h1>

                <p>
                  Add, edit and manage the personalized products
                  available to your customers.
                </p>

                <button
                  className="add-product-button"
                  onClick={() =>
                    setShowAddProductForm(true)
                  }
                >
                  + Add New Product
                </button>

              </div>


              {personalizedProducts.length === 0 ? (

                <div className="empty-dashboard">

                  <h2>
                    No Personalized Products
                  </h2>

                  <p>
                    Add your first personalized MicroArt product.
                  </p>

                </div>

              ) : (

                <div className="personalized-products-admin">

                  {personalizedProducts.map((product) => (

                    <article
                      className="admin-product-card"
                      key={product._id}
                    >

                      <img
                        src={getImageUrl(product.image)}
                        alt={product.title}
                      />

                      <h2>
                        {product.title}
                      </h2>

                      <p>
                        {product.description}
                      </p>

                      <p>
                        <strong>
                          Base Price:
                        </strong>{" "}
                        ${product.basePrice}
                      </p>

                      <p>
                        <strong>
                          Price Per Letter:
                        </strong>{" "}
                        ${product.pricePerLetter}
                      </p>

                      <p>
                        <strong>
                          Minimum Price:
                        </strong>{" "}
                        ${product.minimumPrice}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        {product.active
                          ? "Active"
                          : "Inactive"}
                      </p>

                      <div className="admin-product-actions">

                        <button
                          onClick={() =>
                            setEditingProduct(product)
                          }
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleProductActive(product)}
                        >
                          {product.active ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          onClick={() => deleteProduct(product)}
                        >
                          Delete
                        </button>

                      </div>

                    </article>

                  ))}

                </div>

              )}

            </>

          )}

        </section>





      ) : selectedArtwork ? (

        /* ================= ARTWORK DETAIL ================= */

        <section className="artwork-detail">

          <button
            className="back-button"
            onClick={backToGallery}
          >
            ← Back to Gallery
          </button>

          <div className="artwork-detail-content">

            {/* ARTWORK IMAGE */}

            <div className="artwork-detail-image">

              <img
                src={selectedArtwork.image}
                alt={selectedArtwork.title}
              />

            </div>

            {/* ARTWORK INFORMATION */}

            <div className="artwork-detail-info">

              <h2>
                {selectedArtwork.title}
              </h2>

              <p className="artwork-detail-size">
                {selectedArtwork.size}
              </p>

              <div className="artwork-description">

                <h3>
                  About This Artwork
                </h3>

                <p>
                  {selectedArtwork.description}
                </p>

              </div>

              <div className="artwork-details">

                <h3>
                  Artwork Details
                </h3>

                <p>
                  <strong>
                    Category:
                  </strong>{" "}
                  {selectedArtwork.category}
                </p>

                <p>
                  <strong>
                    Size:
                  </strong>{" "}
                  {selectedArtwork.size}
                </p>

                <p>
                  <strong>
                    Artist:
                  </strong>{" "}
                  Vivek Podagatla
                </p>

              </div>

            </div>

            {/* CUSTOM ART BOX */}

            <div className="custom-art-box">

              <div className="custom-art-content">

                <h3>
                  Create Your Own MicroArt
                </h3>

                <p>
                  Create personalized miniature artwork made
                  especially for you. Names, messages, portraits,
                  and unique miniature designs can be created as
                  custom artwork.
                </p>

              </div>

              <button
                onClick={() => {
                  setCustomRequestArtwork(selectedArtwork)
                  setSelectedArtwork(null)

                  setRequestSubmitted(false)

                  setShowRequestForm(true)
                }}
              >
                Request Customized Art
              </button>

            </div>

          </div>

        </section>

      ) : showProduct && selectedPersonalizedProduct ? (

        /* ================= PRODUCT DETAIL ================= */

        <section className="personalized-product-page">

          <button
            className="back-button"
            onClick={() => {
              setShowProduct(false)
              setSelectedPersonalizedProduct(null)
              setCustomText("")
            }}
          >
            ← Back to Personalized Gifts
          </button>

          <div className="personalized-product-detail">

            <div className="personalized-product-image">

              <img
                src={getImageUrl(selectedPersonalizedProduct.image)}
                alt={selectedPersonalizedProduct.title}
              />

            </div>

            <div className="personalized-product-info">

              <h1>
                {selectedPersonalizedProduct.title}
              </h1>

              <p className="product-description">
                {selectedPersonalizedProduct.description}
              </p>

              <div className="pricing-rule">

                <strong>
                  Pricing
                </strong>

                <p>
                  ${selectedPersonalizedProduct.pricePerLetter} per letter
                </p>

                <p>
                  Minimum price: $
                  {selectedPersonalizedProduct.minimumPrice}
                </p>

                <p>
                  Spaces are not counted.
                </p>

              </div>

              <div className="name-input-section">

                <label htmlFor="customText">
                  Enter the name or short message
                </label>

                <input
                  id="customText"
                  type="text"
                  value={customText}
                  onChange={(event) =>
                    setCustomText(event.target.value)
                  }
                  placeholder="Example: Vivek Podagatla"
                  maxLength="50"
                />

                <p className="letter-count">
                  {letterCount}{" "}
                  {letterCount === 1
                    ? "letter"
                    : "letters"}
                </p>

              </div>

              <div className="product-price-box">

                <span>
                  Price
                </span>

                <strong>
                  $
                  {Math.max(
                    Number(
                      selectedPersonalizedProduct.minimumPrice
                    ) || 0,
                    Number(
                      selectedPersonalizedProduct.basePrice
                    ) || 0,
                    letterCount *
                      (Number(
                        selectedPersonalizedProduct.pricePerLetter
                      ) || 0)
                  )}
                </strong>

              </div>

              <button
                className="add-to-cart-button"
                onClick={addToCart}
              >
                🛒 Add to Cart
              </button>

            </div>

          </div>

        </section>




      ) : showPersonalized ? (

        /* ================= PERSONALIZED MICROARTS ================= */

        <section className="personalized-page">

          <button
            className="back-button"
            onClick={
              goHome
            }
          >
            ← Back to Home
          </button>

          <h2>
            Personalized Gifts
          </h2>

          <p className="section-description">
            Turn a name or special message into a one-of-a-kind miniature artwork,
            handcrafted to create a gift they will always remember.
          </p>

          <div className="personalized-products">

            {personalizedProducts.length === 0 ? (

              <div className="empty-personalized-products">

                <h3>
                  No Personalized MicroArts Available
                </h3>

                <p>
                  New personalized artworks will be
                  available soon.
                </p>

              </div>

            ) : (

              personalizedProducts.map((product) => (

                <article
                  className="personalized-card"
                  key={product._id}
                  onClick={() => {
                    setCustomText("")
                    setSelectedPersonalizedProduct(product)
                    setShowProduct(true)
                  }}
                >

                  <img
                    src={getImageUrl(product.image)}
                    alt={product.title}
                  />

                  <div className="personalized-info">

                    <h3>
                      {product.title}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    <p className="personalized-price">
                      <span>Starting at</span>
                      <strong>
                        ${Math.max(
                          product.basePrice || 0,
                          product.minimumPrice || 0
                        )}
                      </strong>
                    </p>

                  </div>

                </article>

              ))

            )}

          </div>

        </section>


      ) : (

        /* ================= HOME ================= */

        <>

          {/* HERO */}

          <section className="hero">

            <div className="hero-container">

              <div className="hero-content">

                <p className="hero-label">
                  HANDCRAFTED MINIATURE ART
                </p>

                <h1>
                  Art Beyond the
                  Limits of Size
                </h1>

                <p className="hero-description">
                  Extraordinary handmade artwork
                  created at an extraordinary
                  miniature scale.
                </p>

                <div className="hero-gift-cta">

                  <p className="hero-gift-text">
                    Gift your loved ones in a unique way.
                  </p>

                  <button
                    className="hero-button"
                    onClick={openPersonalized}
                  >
                    Explore Personalized Gifts
                  </button>

                </div>

              </div>

              <div className="hero-image">

                <img
                  src="/images/couple-under-umbrella.jpg"
                  alt="Miniature couple under an umbrella carved from a pencil"
                />

                

              </div>

            </div>

          </section>

          {/* GALLERY */}

          <section
            id="gallery"
            className="section gallery-section"
          >

            <h2>
              Featured MicroArts
            </h2>

            <p className="section-description">
              Explore miniature artworks created
              with precision, patience and creativity.
            </p>

            <div className="products">

              {artworks.map(
                (artwork) => (

                  <article
                    className="product-card"
                    key={artwork._id}
                    onClick={() =>
                      openArtwork(artwork)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        openArtwork(artwork)
                      }
                    }}
                  >

                    <img
                      src={artwork.image}
                      alt={artwork.title}
                    />

                    <div className="product-info">

                      <h3>
                        {artwork.title}
                      </h3>

                      <p className="product-size">
                        {artwork.size}
                      </p>

                    </div>

                  </article>

                )
              )}

            </div>

          </section>


          {/* CUSTOMIZED ART */}

          <section
            id="custom"
            className="section custom-section"
          >

            <div className="custom-content">

              <h2>
                Create a Customized MicroArt
              </h2>

              <p>
                Have a unique idea?
                I can create a miniature
                artwork based on your concept.
              </p>

              <button
                onClick={() => {
                  setRequestSubmitted(
                    false
                  )

                  setShowRequestForm(
                    true
                  )
                }}
              >
                Request Customized Art
              </button>

            </div>

          </section>


          

          {/* ABOUT */}

          <section
            id="about"
            className="section about-section"
          >

            <h2>
              About
            </h2>

            <p>
              I’m Vivek Podagatla, a miniature artist
              creating handcrafted artworks on tiny
              surfaces with patience, precision, and creativity.
            </p>

            <p>
              Each piece is carefully handcrafted to
              capture fine details, creativity, and character.
            </p>

            <p>
              The goal of MicroArts is to show how much
              creativity can exist in even the smallest
              possible space.
            </p>

          </section>


          {/* CONTACT */}

          <section
            id="contact"
            className="section contact-section"
          >

            <h2>
              Contact
            </h2>

            <p>
              Interested in a personalized
              or customized MicroArt?
            </p>

            <button
              onClick={() => {
                setRequestSubmitted(
                  false
                )

                setShowRequestForm(
                  true
                )
              }}
            >
              Contact the Artist
            </button>
            <div className="contact-socials">

              <a
                href="https://www.instagram.com/microarts__vivek?stkn=MWZ4d21tMHpuNnF1Yg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm10.25 1.5a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/1ESu6uJaPq/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1 .28-1.75 1.8-1.75H17V2.38C16.7 2.34 15.67 2.25 14.45 2.25c-2.55 0-4.3 1.56-4.3 4.42V9.5H7.25V13h2.9v9h3.35z" />
                </svg>
              </a>

            </div>

          </section>

        </>

      )}


      {/* ================= CUSTOM REQUEST MODAL ================= */}

      {showRequestForm && (

        <div className="request-modal">

          <div className="request-modal-content">

            {customRequestArtwork && (
              <p>
                Requesting customization for:{" "}
                <strong>{customRequestArtwork.title}</strong>
              </p>
            )}

            <button
              className="close-modal"
              onClick={() =>
                setShowRequestForm(
                  false
                )
              }
            >
              ×
            </button>

            {!requestSubmitted ? (

              <>

                <h2>
                  Request Customized Art
                </h2>

                <p>
                  Tell us how we can contact
                  you about your customized
                  MicroArt.
                </p>

                <form
                  className="custom-request-form"
                  onSubmit={async (event) => {
                    event.preventDefault()

                    const form = event.currentTarget

                    const formData = new FormData(form)

                    const requestData = {
                      fullName: formData.get("fullName"),
                      phone:
                        `${formData.get("countryCode")}${formData.get("phone")}`,
                      email: formData.get("email"),
                      requestDetails: formData.get("requestDetails"),
                      artworkId: customRequestArtwork?._id,
                    }

                    try {
                      const response = await fetch(
                        `${API_URL}/api/custom-requests`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(requestData),
                        }
                      )

                      const data = await response.json()

                      if (!response.ok) {
                        alert(data.message || "Failed to submit request")
                        return
                      }

                      setRequestSubmitted(true)
                    } catch (error) {
                      console.error("Custom request submission error:", error)

                      alert(
                        "Unable to submit your request. Please try again."
                      )
                    }
                  }}
                >

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      Phone Number
                    </label>

                    <div className="phone-input-row">

                      <input
                        type="text"
                        name="countryCode"
                        defaultValue="+1"
                        required
                        maxLength="5"
                        pattern="\+[0-9]{1,4}"
                        title="Enter a valid country code, for example +1 or +91."
                        placeholder="+1"
                        className="country-code-input"
                        onInput={(event) => {
                          let value = event.currentTarget.value

                          if (!value.startsWith("+")) {
                            value =
                              "+" +
                              value.replace(/\D/g, "")
                          } else {
                            value =
                              "+" +
                              value
                                .slice(1)
                                .replace(/\D/g, "")
                          }

                          event.currentTarget.value =
                            value.slice(0, 5)
                        }}
                      />

                      <input
                        type="tel"
                        name="phone"
                        required
                        inputMode="numeric"
                        minLength="10"
                        maxLength="15"
                        pattern="[0-9]{10,15}"
                        title="Phone number must contain 10 to 15 digits."
                        placeholder="Phone number"
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value
                              .replace(/\D/g, "")
                              .slice(0, 15)
                        }}
                      />

                    </div>

                    <div className="country-code-shortcuts">

                      <button
                        type="button"
                        onClick={(event) => {
                          const input =
                            event.currentTarget
                              .closest(".form-group")
                              .querySelector(
                                ".country-code-input"
                              )

                          input.value = "+1"
                        }}
                      >
                        US +1
                      </button>

                      <button
                        type="button"
                        onClick={(event) => {
                          const input =
                            event.currentTarget
                              .closest(".form-group")
                              .querySelector(
                                ".country-code-input"
                              )

                          input.value = "+91"
                        }}
                      >
                        India +91
                      </button>

                    </div>

                  </div>

                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email address"
                    />

                  </div>
                  <div className="form-group">

                    <label>
                      Request Details
                    </label>

                    <textarea
                      name="requestDetails"
                      required
                      placeholder="Describe the customized MicroArt you would like"
                      rows="5"
                    />

                  </div>

                  <button type="submit">
                    Submit Request
                  </button>

                </form>

              </>

            ) : (

              <div className="request-success">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Request Submitted!
                </h2>

                <p>
                  Thank you for your interest
                  in customized MicroArt.
                </p>

                <p>
                  The artist will contact you
                  to discuss your customized
                  art ideas and how they can
                  be implemented.
                </p>

                <button
                  onClick={() =>
                    setShowRequestForm(
                      false
                    )
                  }
                >
                  Close
                </button>

              </div>

            )}

          </div>

        </div>

      )}
    <footer className="footer">
      <p>
        © MicroArts by Vivek Podagatla. All rights reserved.
      </p>
    </footer>

    </div>
  )
}

export default App