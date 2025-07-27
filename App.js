// Application State
class FoodDeliveryApp {
  constructor() {
    this.currentUser = null
    this.currentPanel = "items"
    this.currentCategory = "All"
    this.cart = []
    this.articles = []
    this.darkMode = false
    this.searchQuery = ""
    this.isLoading = true // New loading state

    this.foodItems = [
      {
        id: 1,
        name: "Burger 'Wanted'",
        description: "Spicy Double Cheddar, Tomato, Onion, Lettuce",
        price: 39,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
        rating: 4.8,
        popular: true,
        category: "Burgers",
        ingredients: ["Beef Patty", "Cheddar Cheese", "Tomato", "Onion", "Lettuce", "Special Sauce"],
      },
      {
        id: 2,
        name: "Aloha Chicken",
        description: "Grilled Chicken, Pineapple, Teriyaki Sauce",
        price: 56,
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop",
        rating: 4.9,
        category: "Snacks",
        ingredients: ["Grilled Chicken", "Pineapple", "Teriyaki Sauce", "Rice", "Vegetables"],
      },
      {
        id: 3,
        name: "Hi, Salmon",
        description: "Fresh Salmon, Avocado, Cucumber, Rice",
        price: 64,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
        rating: 4.7,
        category: "Snacks",
        ingredients: ["Fresh Salmon", "Avocado", "Cucumber", "Sushi Rice", "Nori"],
      },
      {
        id: 4,
        name: "Margherita Pizza",
        description: "Fresh Mozzarella, Tomato Sauce, Basil",
        price: 32,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
        rating: 4.6,
        category: "Pizza",
        ingredients: ["Pizza Dough", "Mozzarella", "Tomato Sauce", "Fresh Basil"],
      },
      {
        id: 5,
        name: "Pasta Carbonara",
        description: "Creamy Pasta, Bacon, Parmesan Cheese",
        price: 48,
        image: "https://www.istockphoto.com/photo/garnished-vegetable-noodles-in-bowls-gm2004635671-560404683?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2FPasta-Carbonara&utm_medium=affiliate&utm_source=unsplash&utm_term=Pasta+Carbonara%3A%3A%3A&utm_id=2004635671&w=300&h=200&fit=crop",
        rating: 4.8,
        category: "Snacks",
        ingredients: ["Pasta", "Bacon", "Parmesan", "Eggs", "Black Pepper"],
      },
      {
        id: 6,
        name: "Green Smoothie",
        description: "Spinach, Apple, Banana, Protein Powder",
        price: 18,
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300&h=200&fit=crop",
        rating: 4.5,
        category: "Drinks",
        ingredients: ["Spinach", "Apple", "Banana", "Protein Powder", "Almond Milk"],
      },
      {
        id: 7,
        name: "Caesar Salad",
        description: "Romaine Lettuce, Parmesan, Croutons",
        price: 28,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
        rating: 4.4,
        category: "Snacks",
        ingredients: ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"],
      },
      {
        id: 8,
        name: "Pepperoni Pizza",
        description: "Classic Pepperoni with Mozzarella",
        price: 38,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
        rating: 4.7,
        category: "Pizza",
        ingredients: ["Pizza Dough", "Pepperoni", "Mozzarella", "Tomato Sauce"],
      },
    ]

    this.init()
  }

  init() {
    this.loadFromStorage()
    this.setupEventListeners()
    this.applyTheme()
    this.showLoader() // Show loader initially
    setTimeout(() => {
      this.hideLoader() // Hide loader after 2 seconds
      this.updateUI()
      this.renderFoodItems()
      this.renderArticles()
    }, 2000)
  }

  // Local Storage Methods
  saveToStorage() {
    localStorage.setItem(
      "foodDeliveryApp",
      JSON.stringify({
        currentUser: this.currentUser,
        cart: this.cart,
        articles: this.articles,
        darkMode: this.darkMode,
      }),
    )
  }

  loadFromStorage() {
    const saved = localStorage.getItem("foodDeliveryApp")
    if (saved) {
      const data = JSON.parse(saved)
      this.currentUser = data.currentUser || null
      this.cart = data.cart || []
      this.articles = data.articles || this.getDefaultArticles()
      this.darkMode = data.darkMode || false
    } else {
      this.articles = this.getDefaultArticles()
    }
  }

  getDefaultArticles() {
    return [
      {
        id: 1,
        title: "Coronavirus Update (live): 40,774,501 Cases",
        author: "Dr. Sarah Johnson",
        authorInitials: "SJ",
        time: "2h",
        content:
          "Latest updates on the global pandemic situation with detailed statistics and health guidelines for restaurants and food delivery services. This comprehensive report covers the impact on the food industry and safety measures being implemented.",
        category: "Health",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 2,
        title: "Black Friday deal: Free salmon bowl",
        author: "Muhammad Owais",
        authorInitials: "MO",
        time: "3h",
        content:
          "Special Black Friday promotion offering free salmon bowls with every order above $50. Limited time offer! This exclusive deal is available for the next 48 hours and includes our premium Hi, Salmon bowl with fresh ingredients.",
        category: "Promotions",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 3,
        title: "What You Need To Know About Carbonara",
        author: "Chef Marco",
        authorInitials: "CM",
        time: "5h",
        content:
          "The authentic Italian recipe for Carbonara pasta, including traditional ingredients and cooking techniques. Learn the secrets behind creating the perfect creamy texture without using cream, and discover the history of this classic Roman dish.",
        category: "Recipes",
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 4,
        title: "How To Cook Turkey On Natural Gas Grills",
        author: "Grill Master Tom",
        authorInitials: "GT",
        time: "1d",
        content:
          "Complete guide to grilling the perfect turkey using natural gas grills, including temperature control and timing. This step-by-step tutorial covers preparation, seasoning, cooking techniques, and safety tips for outdoor cooking.",
        category: "Cooking Tips",
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
  }

  // Authentication Methods
  signUp(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((user) => user.email === email)) {
      throw new Error("User already exists")
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    this.currentUser = { ...newUser }
    delete this.currentUser.password
    this.saveToStorage()
    this.updateUI()

    return this.currentUser
  }

  signIn(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    this.currentUser = { ...user }
    delete this.currentUser.password
    this.saveToStorage()
    this.updateUI()

    return this.currentUser
  }

  signOut() {
    this.currentUser = null
    this.cart = []
    this.saveToStorage()
    this.updateUI()
    this.renderFoodItems()
  }

  // UI Update Methods
  updateUI() {
    const userNameEl = document.getElementById("userName")
    const userInitialsEl = document.getElementById("userInitials")
    const authButtonEl = document.getElementById("authButton")
    const settingsNameEl = document.getElementById("settingsName")
    const settingsEmailEl = document.getElementById("settingsEmail")
    const settingsInitialsEl = document.getElementById("settingsInitials")
    const createArticleBtnEl = document.getElementById("createArticleBtn")
    const authButtonsContainer = document.getElementById("authButtonsContainer")
    const signOutBtnEl = document.getElementById("signOutBtn")

    if (this.currentUser) {
      const initials = this.currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")

      userNameEl.textContent = this.currentUser.name
      userInitialsEl.textContent = initials
      authButtonEl.textContent = "Sign Out"
      authButtonEl.onclick = () => this.signOut()

      settingsNameEl.textContent = this.currentUser.name
      settingsEmailEl.textContent = this.currentUser.email
      settingsInitialsEl.textContent = initials

      createArticleBtnEl.classList.remove("hidden")
      authButtonsContainer.classList.add("hidden") // Hide login/signup buttons
      signOutBtnEl.classList.remove("hidden")
    } else {
      userNameEl.textContent = "Guest User"
      userInitialsEl.textContent = "?"
      authButtonEl.textContent = "Sign In"
      authButtonEl.onclick = () => this.showAuthModal("login")

      settingsNameEl.textContent = "Guest User"
      settingsEmailEl.textContent = "Not signed in"
      settingsInitialsEl.textContent = "?"

      createArticleBtnEl.classList.add("hidden")
      authButtonsContainer.classList.remove("hidden") // Show login/signup buttons
      signOutBtnEl.classList.add("hidden")
    }

    this.updateCartUI()
  }

  updateCartUI() {
    const cartCountEl = document.getElementById("cartCount")
    const mobileCartCountEl = document.getElementById("mobileCartCount")
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)

    if (totalItems > 0) {
      cartCountEl.textContent = totalItems
      cartCountEl.classList.remove("hidden")
      mobileCartCountEl.textContent = totalItems
      mobileCartCountEl.classList.remove("hidden")
    } else {
      cartCountEl.classList.add("hidden")
      mobileCartCountEl.classList.add("hidden")
    }
  }

  // Panel Navigation
  switchPanel(panelName) {
    // Hide all panels
    document.querySelectorAll(".content-panel").forEach((panel) => {
      panel.classList.remove("active")
    })

    // Show selected panel
    document.getElementById(panelName + "Panel").classList.add("active")

    // Update desktop navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active")
    })
    document.querySelector(`[data-panel="${panelName}"]`).classList.add("active")

    // Update mobile navigation
    document.querySelectorAll(".mobile-nav-item[data-panel]").forEach((item) => {
      item.classList.remove("active")
    })
    const mobileNavItem = document.querySelector(`.mobile-nav-item[data-panel="${panelName}"]`)
    if (mobileNavItem) {
      mobileNavItem.classList.add("active")
    }

    // Close mobile sidebar if open
    if (window.innerWidth <= 768) {
      const sidebar = document.querySelector(".sidebar")
      const overlay = document.getElementById("mobileOverlay")
      sidebar.classList.remove("open")
      overlay.classList.add("hidden")
    }

    this.currentPanel = panelName

    // Render content based on panel
    if (panelName === "menu") {
      this.renderMenuContent()
    } else if (panelName === "articles") {
      this.renderArticles()
    }
  }

  // Food Items Methods
  renderFoodItems() {
    const foodGrid = document.getElementById("foodGrid")
    const filteredItems = this.getFilteredItems()

    foodGrid.innerHTML = ""

    filteredItems.forEach((item, index) => {
      const foodCard = this.createFoodCard(item, index)
      foodGrid.appendChild(foodCard)
    })

    // Update section title
    const sectionTitle = document.getElementById("itemsSectionTitle")
    const count = filteredItems.length
    sectionTitle.textContent = `${this.currentCategory === "All" ? "All Items" : this.currentCategory} (${count})`
  }

  getFilteredItems() {
    let filtered = this.foodItems

    // Filter by category
    if (this.currentCategory !== "All") {
      filtered = filtered.filter((item) => item.category === this.currentCategory)
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    }

    return filtered
  }

  createFoodCard(item, index) {
    const card = document.createElement("div")
    card.className = "food-card"
    card.style.animationDelay = `${index * 0.1}s`

    card.innerHTML = `
            <div class="food-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}'">
                ${item.popular ? '<div class="food-badge">🔥 Popular</div>' : ""}
                <div class="food-rating">⭐ ${item.rating}</div>
            </div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <div class="food-footer">
                <span class="food-price">$${item.price}</span>
                <button class="add-btn" onclick="app.addToCart(${item.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `

    return card
  }

  renderMenuContent() {
    const menuContent = document.getElementById("menuContent")
    const categories = ["Burgers", "Pizza", "Snacks", "Drinks"]

    menuContent.innerHTML = ""

    categories.forEach((category) => {
      const categoryItems = this.foodItems.filter((item) => item.category === category)
      if (categoryItems.length === 0) return

      const categorySection = document.createElement("div")
      categorySection.className = "menu-category"

      const categoryHeader = document.createElement("div")
      categoryHeader.className = "menu-category-header"

      const categoryIcon = this.getCategoryIcon(category)
      categoryHeader.innerHTML = `
      <span class="menu-category-icon">${categoryIcon}</span>
      <h2>${category}</h2>
      <span class="menu-category-badge">${categoryItems.length} items</span>
    `

      const itemsGrid = document.createElement("div")
      itemsGrid.className = "food-grid"

      categoryItems.forEach((item, index) => {
        const card = this.createDetailedFoodCard(item, index)
        itemsGrid.appendChild(card)
      })

      categorySection.appendChild(categoryHeader)
      categorySection.appendChild(itemsGrid)
      menuContent.appendChild(categorySection)
    })
  }

  createDetailedFoodCard(item, index) {
    const card = document.createElement("div")
    card.className = "food-card"
    card.style.animationDelay = `${index * 0.1}s`

    const ingredientTags = item.ingredients
      .slice(0, 3)
      .map(
        (ingredient) =>
          `<span style="background: var(--bg-tertiary); color: var(--text-secondary); padding: 0.125rem 0.5rem; border-radius: 1rem; font-size: 0.75rem; border: 1px solid var(--border-color);">${ingredient}</span>`,
      )
      .join("")

    const moreIngredients =
      item.ingredients.length > 3
        ? `<span style="background: var(--bg-tertiary); color: var(--text-secondary); padding: 0.125rem 0.5rem; border-radius: 1rem; font-size: 0.75rem; border: 1px solid var(--border-color);">+${item.ingredients.length - 3} more</span>`
        : ""

    card.innerHTML = `
            <div class="food-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(item.name)}'">
                <div class="food-rating">⭐ ${item.rating}</div>
            </div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div style="margin-bottom: 0.75rem;">
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">Ingredients:</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                        ${ingredientTags}
                        ${moreIngredients}
                    </div>
                </div>
            </div>
            <div class="food-footer">
                <span class="food-price">$${item.price}</span>
                <button class="add-btn" onclick="app.addToCart(${item.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `

    return card
  }

  getCategoryIcon(category) {
    const icons = {
      Burgers: "🍔",
      Pizza: "🍕",
      Snacks: "🥨",
      Drinks: "🥤",
      Grocery: "🛒",
    }
    return icons[category] || "🍽️"
  }

  // Cart Methods
  addToCart(itemId) {
    if (!this.currentUser) {
      this.showAuthModal("login")
      return
    }

    const item = this.foodItems.find((food) => food.id === itemId)
    if (!item) return

    const existingItem = this.cart.find((cartItem) => cartItem.id === itemId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({ ...item, quantity: 1 })
    }

    this.saveToStorage()
    this.updateCartUI()

    // Show success feedback
    this.showNotification(`${item.name} added to cart!`, "success")
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId)
    this.saveToStorage()
    this.updateCartUI()
    this.renderCartContent()
  }

  updateCartQuantity(itemId, newQuantity) {
    if (newQuantity === 0) {
      this.removeFromCart(itemId)
      return
    }

    const item = this.cart.find((cartItem) => cartItem.id === itemId)
    if (item) {
      item.quantity = newQuantity
      this.saveToStorage()
      this.updateCartUI()
      this.renderCartContent()
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  renderCartContent() {
    const cartContent = document.getElementById("cartContent")

    if (this.cart.length === 0) {
      cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `
      return
    }

    const cartItems = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=${encodeURIComponent(item.name)}'">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span>${item.quantity}</span>
                    <button onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `,
      )
      .join("")

    cartContent.innerHTML = `
            <div class="cart-items">
                ${cartItems}
            </div>
            <div class="cart-total">
                <div class="cart-total-row">
                    <span>Total:</span>
                    <span>$${this.getCartTotal()}</span>
                </div>
                <button class="btn-primary" onclick="app.placeOrder()">Place Order</button>
            </div>
        `
  }

  placeOrder() {
    if (this.cart.length === 0) return

    // Simulate order placement
    this.showNotification("Order placed successfully! 🎉", "success")
    this.cart = []
    this.saveToStorage()
    this.updateCartUI()
    this.hideModal("cartModal")
  }

  // Articles Methods
  renderArticles() {
    const articlesGrid = document.getElementById("articlesGrid")
    const articlesPreview = document.getElementById("articlesPreview")

    // Render main articles grid
    articlesGrid.innerHTML = ""
    this.articles.forEach((article, index) => {
      const card = this.createArticleCard(article, index)
      articlesGrid.appendChild(card)
    })

    // Render articles preview in sidebar
    articlesPreview.innerHTML = ""
    this.articles.slice(0, 4).forEach((article, index) => {
      const preview = this.createArticlePreview(article, index)
      articlesPreview.appendChild(preview)
    })
  }

  createArticleCard(article, index) {
    const card = document.createElement("div")
    card.className = "article-card"
    card.style.animationDelay = `${index * 0.1}s`
    card.onclick = () => this.viewArticle(article)

    card.innerHTML = `
            <div class="article-header">
                <span class="article-category">${article.category}</span>
                <span class="article-time">${article.time} ago</span>
            </div>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.content.substring(0, 120)}...</p>
            <div class="article-footer">
                <div class="avatar">
                    <span>${article.authorInitials}</span>
                </div>
                <span class="article-author">${article.author}</span>
                <i class="fas fa-arrow-right article-arrow"></i>
            </div>
        `

    return card
  }

  createArticlePreview(article, index) {
    const preview = document.createElement("div")
    preview.className = "preview-article"
    preview.style.animationDelay = `${index * 0.1}s`
    preview.onclick = () => {
      this.viewArticle(article)
      this.switchPanel("articles")
    }

    preview.innerHTML = `
            <h4>${article.title}</h4>
            <div class="preview-author">
                <div class="avatar">
                    <span>${article.authorInitials}</span>
                </div>
                <span>${article.author}</span>
                <span>•</span>
                <span>${article.time}</span>
            </div>
        `

    return preview
  }

  viewArticle(article) {
    const blogModal = document.getElementById("blogModal")
    const createBlogForm = document.getElementById("createBlogForm")
    const viewBlogPost = document.getElementById("viewBlogPost")

    // Hide create form, show view
    createBlogForm.classList.add("hidden")
    viewBlogPost.classList.remove("hidden")

    // Populate article data
    document.getElementById("blogPostTitle").textContent = article.title
    document.getElementById("blogAuthorInitials").textContent = article.authorInitials
    document.getElementById("blogAuthorName").textContent = article.author
    document.getElementById("blogPostDate").textContent = article.time + " ago"
    document.getElementById("blogPostCategory").textContent = article.category
    document.getElementById("blogPostContent").textContent = article.content

    blogModal.classList.remove("hidden")
  }

  createArticle(title, category, content) {
    if (!this.currentUser) {
      this.showAuthModal("login")
      return
    }

    const newArticle = {
      id: Date.now(),
      title,
      author: this.currentUser.name,
      authorInitials: this.currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      time: "now",
      content,
      category,
      createdAt: new Date().toISOString(),
    }

    this.articles.unshift(newArticle)
    this.saveToStorage()
    this.renderArticles()
    this.hideModal("blogModal")
    this.showNotification("Article published successfully! 📝", "success")
  }

  // Theme Methods
  toggleTheme() {
    this.darkMode = !this.darkMode
    this.applyTheme()
    this.saveToStorage()
  }

  applyTheme() {
    const body = document.body
    const themeIcon = document.querySelector("#themeToggle i")
    const darkModeSwitch = document.getElementById("darkModeSwitch")

    if (this.darkMode) {
      body.classList.add("dark")
      themeIcon.className = "fas fa-sun"
      if (darkModeSwitch) darkModeSwitch.checked = true
    } else {
      body.classList.remove("dark")
      themeIcon.className = "fas fa-moon"
      if (darkModeSwitch) darkModeSwitch.checked = false
    }
  }

  // Loader Methods
  showLoader() {
    document.getElementById("bbqLoader").classList.remove("hidden")
    document.getElementById("mainAppContainer").classList.add("hidden")
    this.isLoading = true
  }

  hideLoader() {
    document.getElementById("bbqLoader").classList.add("hidden")
    document.getElementById("mainAppContainer").classList.remove("hidden")
    this.isLoading = false
  }

  // Modal Methods
  showModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden")
  }

  hideModal(modalId) {
    document.getElementById(modalId).classList.add("hidden")
  }

  showAuthModal(mode) {
    const authModal = document.getElementById("authModal")
    const loginForm = document.getElementById("loginForm")
    const signupForm = document.getElementById("signupForm")

    if (mode === "login") {
      loginForm.classList.remove("hidden")
      signupForm.classList.add("hidden")
    } else {
      loginForm.classList.add("hidden")
      signupForm.classList.remove("hidden")
    }
    this.showModal("authModal")
  }

  // Notification Method
  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === "success" ? "var(--success-color)" : "var(--info-color)"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-medium);
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `
    notification.textContent = message

    document.body.appendChild(notification)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideInRight 0.3s ease-out reverse"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Event Listeners Setup
  setupEventListeners() {
    // Theme toggle
    document.getElementById("themeToggle").addEventListener("click", () => {
      this.toggleTheme()
    })

    // Navigation
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", () => {
        const panel = item.getAttribute("data-panel")
        this.switchPanel(panel)
      })
    })

    // Categories
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        this.currentCategory = btn.getAttribute("data-category")
        this.renderFoodItems()
      })
    })

    // Search
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.searchQuery = e.target.value
      this.renderFoodItems()
    })

    // Cart
    document.getElementById("cartButton").addEventListener("click", () => {
      this.renderCartContent()
      this.showModal("cartModal")
    })

    // View all menu button
    document.getElementById("viewAllMenu").addEventListener("click", () => {
      this.switchPanel("menu")
    })

    // View all articles button
    document.getElementById("viewAllArticles").addEventListener("click", () => {
      this.switchPanel("articles")
    })

    // Burger offer button
    document.getElementById("burgerOfferBtn").addEventListener("click", () => {
      this.currentCategory = "Burgers"
      document.querySelectorAll(".category-btn").forEach((b) => b.classList.remove("active"))
      document.querySelector('[data-category="Burgers"]').classList.add("active")
      this.switchPanel("items")
      this.renderFoodItems()
    })

    // Create article button
    document.getElementById("createArticleBtn").addEventListener("click", () => {
      const createBlogForm = document.getElementById("createBlogForm")
      const viewBlogPost = document.getElementById("viewBlogPost")

      createBlogForm.classList.remove("hidden")
      viewBlogPost.classList.add("hidden")

      // Reset form
      document.getElementById("blogFormElement").reset()

      this.showModal("blogModal")
    })

    // Modal close buttons
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay")
        modal.classList.add("hidden")
      })
    })

    // Modal overlay clicks
    document.querySelectorAll(".modal-overlay").forEach((modal) => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden")
        }
      })
    })

    // Auth form toggles
    document.getElementById("showSignup").addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("loginForm").classList.add("hidden")
      document.getElementById("signupForm").classList.remove("hidden")
    })

    document.getElementById("showLogin").addEventListener("click", (e) => {
      e.preventDefault()
      document.getElementById("signupForm").classList.add("hidden")
      document.getElementById("loginForm").classList.remove("hidden")
    })

    // Auth forms
    document.getElementById("loginFormElement").addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("loginEmail").value
      const password = document.getElementById("loginPassword").value

      try {
        this.signIn(email, password)
        this.hideModal("authModal")
        this.showNotification(`Welcome back, ${this.currentUser.name}! 👋`, "success")
      } catch (error) {
        this.showNotification(error.message, "error")
      }
    })

    document.getElementById("signupFormElement").addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("signupName").value
      const email = document.getElementById("signupEmail").value
      const password = document.getElementById("signupPassword").value

      try {
        this.signUp(name, email, password)
        this.hideModal("authModal")
        this.showNotification(`Welcome to Earland, ${name}! 🎉`, "success")
      } catch (error) {
        this.showNotification(error.message, "error")
      }
    })

    // Blog form
    document.getElementById("blogFormElement").addEventListener("submit", (e) => {
      e.preventDefault()
      const title = document.getElementById("blogTitle").value
      const category = document.getElementById("blogCategory").value
      const content = document.getElementById("blogContent").value

      this.createArticle(title, category, content)
    })

    // Back to blog list
    document.getElementById("backToBlogList").addEventListener("click", () => {
      const createBlogForm = document.getElementById("createBlogForm")
      const viewBlogPost = document.getElementById("viewBlogPost")

      viewBlogPost.classList.add("hidden")
      this.hideModal("blogModal")
    })

    // Settings
    document.getElementById("darkModeSwitch").addEventListener("change", (e) => {
      if (e.target.checked !== this.darkMode) {
        this.toggleTheme()
      }
    })

    // Sign out button
    document.getElementById("signOutBtn").addEventListener("click", () => {
      this.signOut()
      this.showNotification("Signed out successfully! 👋", "success")
    })

    // Login/Signup buttons on welcome screen
    document.getElementById("loginBtn").addEventListener("click", () => {
      this.showAuthModal("login")
    })
    document.getElementById("signupBtn").addEventListener("click", () => {
      this.showAuthModal("signup")
    })

    // Close modals on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay:not(.hidden)").forEach((modal) => {
          modal.classList.add("hidden")
        })
      }
    })

    // Mobile Navigation
    document.querySelectorAll(".mobile-nav-item[data-panel]").forEach((item) => {
      item.addEventListener("click", () => {
        const panel = item.getAttribute("data-panel")
        this.switchPanel(panel)

        // Update mobile nav active state
        document.querySelectorAll(".mobile-nav-item").forEach((btn) => btn.classList.remove("active"))
        item.classList.add("active")
      })
    })

    // Mobile cart button
    document.getElementById("mobileCartBtn").addEventListener("click", () => {
      this.renderCartContent()
      this.showModal("cartModal")
    })

    // Mobile menu toggle
    document.getElementById("mobileMenuToggle").addEventListener("click", () => {
      const sidebar = document.querySelector(".sidebar")
      const overlay = document.getElementById("mobileOverlay")

      sidebar.classList.toggle("open")
      overlay.classList.toggle("hidden")
    })

    // Mobile overlay click
    document.getElementById("mobileOverlay").addEventListener("click", () => {
      const sidebar = document.querySelector(".sidebar")
      const overlay = document.getElementById("mobileOverlay")

      sidebar.classList.remove("open")
      overlay.classList.add("hidden")
    })

    // Handle window resize
    window.addEventListener("resize", () => {
      const sidebar = document.querySelector(".sidebar")
      const overlay = document.getElementById("mobileOverlay")
      const mobileNav = document.getElementById("mobileNav")

      if (window.innerWidth > 768) {
        sidebar.classList.remove("open")
        overlay.classList.add("hidden")
        mobileNav.classList.add("hidden")
      } else {
        mobileNav.classList.remove("hidden")
      }
    })

    // Initial mobile check
    if (window.innerWidth <= 768) {
      document.getElementById("mobileNav").classList.remove("hidden")
    }
  }
}

// Initialize the application
const app = new FoodDeliveryApp()

// Make app globally available for onclick handlers
window.app = app
