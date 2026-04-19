// Modern JavaScript for Gym Lover's Cafe
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Global Variables
let cart = [];
let currentTestimonial = 0;
let testimonials = [];
let menuItems = [];
let isDarkTheme = false;

// Initialize Application
function initializeApp() {
    setupEventListeners();
    setupIntersectionObserver();
    setupTestimonials();
    setupMenuItems();
    setupParticles();
    setupThemeToggle();
    setupLoadingScreen();
    setupScrollEffects();
    setupFormValidation();
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);

    // Menu Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', filterMenu);
    });

    // Testimonials
    document.getElementById('prevBtn').addEventListener('click', prevTestimonial);
    document.getElementById('nextBtn').addEventListener('click', nextTestimonial);
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });

    // Modals
    document.querySelectorAll('.modal-close').forEach(close => {
        close.addEventListener('click', closeModal);
    });

    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);

    // Back to Top
    document.getElementById('backToTop').addEventListener('click', scrollToTop);

    // Window Events
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleOutsideClick);
}

// Setup Intersection Observer for Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.menu-card, .feature-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Setup Testimonials
function setupTestimonials() {
    testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 0) {
        showTestimonial(0);
        // Auto-rotate testimonials
        setInterval(() => {
            nextTestimonial();
        }, 5000);
    }
}

// Setup Menu Items
function setupMenuItems() {
    menuItems = [
        {
            id: 'power-protein-bowl',
            name: 'Power Protein Bowl',
            price: 12.99,
            calories: 650,
            protein: 45,
            description: 'Grilled chicken, quinoa, roasted vegetables & tahini dressing. Perfect for post-workout recovery.',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
            category: 'protein'
        },
        {
            id: 'green-power-smoothie',
            name: 'Green Power Smoothie',
            price: 8.99,
            calories: 280,
            protein: 20,
            description: 'Spinach, banana, almond milk, chia seeds & plant protein. A refreshing boost of nutrients.',
            image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop',
            category: 'smoothie vegan'
        },
        {
            id: 'muscle-builder-pasta',
            name: 'Muscle Builder Pasta',
            price: 13.99,
            calories: 720,
            protein: 50,
            description: 'Whole grain pasta, lean beef, spinach & nutritional yeast. High-protein comfort food.',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
            category: 'protein'
        },
        {
            id: 'buddha-vegan-bowl',
            name: 'Buddha Vegan Bowl',
            price: 11.99,
            calories: 580,
            protein: 25,
            description: 'Roasted chickpeas, sweet potato, kale & avocado. Plant-based power in every bite.',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
            category: 'vegan'
        },
        {
            id: 'post-workout-recovery',
            name: 'Post-Workout Recovery',
            price: 9.99,
            calories: 320,
            protein: 30,
            description: 'Whey protein, berries, Greek yogurt & honey. The perfect recovery drink.',
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
            category: 'smoothie'
        },
        {
            id: 'whey-protein-powder',
            name: 'Whey Protein Powder',
            price: 49.99,
            calories: 120,
            protein: 25,
            description: 'Premium whey isolate, 25g protein per serving. Build muscle, recover faster.',
            image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=400&h=300&fit=crop',
            category: 'supplements'
        }
    ];
}

// Setup Particles Animation
function setupParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Setup Theme Toggle
function setupThemeToggle() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
}

// Setup Loading Screen
function setupLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    }
}

// Setup Scroll Effects
function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
}

// Setup Form Validation
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Navigation Functions
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileMenuToggle');

    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offset = document.getElementById('navbar').offsetHeight;
        const top = section.offsetTop - offset;

        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Theme Functions
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#themeToggle i');

    isDarkTheme = !isDarkTheme;
    body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

    if (themeIcon) {
        themeIcon.className = isDarkTheme ? 'fas fa-sun' : 'fas fa-moon';
    }

    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Menu Functions
function filterMenu(e) {
    const filter = e.target.dataset.filter;
    const menuCards = document.querySelectorAll('.menu-card');

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // Filter menu items
    menuCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    updateCartCount();
    showNotification(`${itemName} added to cart!`);
    saveCart();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');

    cartCount.textContent = count;
    cartCount.classList.toggle('show', count > 0);
}

function openCart() {
    renderCart();
    document.getElementById('cartModal').classList.add('show');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('show');
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h4>Your cart is empty</h4>
                <p>Add some delicious items to get started!</p>
            </div>
        `;
        cartSummary.style.display = 'none';
        checkoutBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateCartItem('${item.name}', -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartItem('${item.name}', 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;

    cartSummary.style.display = 'block';
    checkoutBtn.disabled = false;
}

function updateCartItem(itemName, change) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.name !== itemName);
        }
        updateCartCount();
        renderCart();
        saveCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Modal Functions
function openModal(itemName) {
    const item = menuItems.find(item => item.name === itemName);
    if (!item) return;

    document.getElementById('modalTitle').textContent = item.name;
    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalPrice').textContent = `$${item.price.toFixed(2)}`;
    document.getElementById('modalCalories').textContent = item.calories;
    document.getElementById('modalProtein').textContent = item.protein;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalQuantity').textContent = '1';
    document.getElementById('modalTotal').textContent = item.price.toFixed(2);

    document.getElementById('menuModal').classList.add('show');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
}

function updateQuantity(change) {
    const quantityEl = document.getElementById('modalQuantity');
    const totalEl = document.getElementById('modalTotal');
    let quantity = parseInt(quantityEl.textContent) + change;

    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;

    quantityEl.textContent = quantity;

    const item = menuItems.find(item => item.name === document.getElementById('modalTitle').textContent);
    if (item) {
        const basePrice = item.price;
        const customizations = document.querySelectorAll('.custom-option input:checked');
        let extraPrice = 0;

        customizations.forEach(custom => {
            if (custom.name === 'extra-protein') extraPrice += 2;
            if (custom.name === 'no-carb') extraPrice -= 1;
            if (custom.name === 'extra-veggies') extraPrice += 1.5;
        });

        const total = (basePrice + extraPrice) * quantity;
        totalEl.textContent = total.toFixed(2);
    }
}

function addToCartFromModal() {
    const itemName = document.getElementById('modalTitle').textContent;
    const quantity = parseInt(document.getElementById('modalQuantity').textContent);
    const item = menuItems.find(item => item.name === itemName);

    if (item) {
        for (let i = 0; i < quantity; i++) {
            addToCart(itemName, item.price);
        }
        closeModal();
    }
}

// Testimonial Functions
function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentTestimonial = index;
}

function nextTestimonial() {
    const next = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(next);
}

function prevTestimonial() {
    const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(prev);
}

function goToTestimonial(index) {
    showTestimonial(index);
}

// Form Functions
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    clearFieldError(e);

    // Validation rules
    switch (field.name) {
        case 'name':
            if (!value) {
                isValid = false;
                errorMessage = 'Name is required';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email';
            }
            break;
        case 'subject':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a subject';
            }
            break;
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Message is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    let errorEl = formGroup.querySelector('.field-error');

    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        formGroup.appendChild(errorEl);
    }

    errorEl.textContent = message;
    field.classList.add('error');
}

function clearFieldError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorEl = formGroup.querySelector('.field-error');

    if (errorEl) {
        errorEl.remove();
    }

    field.classList.remove('error');
}

async function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    let isValid = true;

    // Validate all fields
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fix the errors in the form', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success
        showNotification('Message sent successfully! We\'ll get back to you soon.');
        form.reset();

        // Clear any remaining errors
        form.querySelectorAll('.field-error').forEach(error => error.remove());
        form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));

    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();

    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate subscription
    showNotification('Successfully subscribed to our newsletter!');
    emailInput.value = '';
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const notificationIcon = notification.querySelector('i');

    notificationText.textContent = message;

    if (type === 'error') {
        notification.style.background = 'var(--danger-color)';
        notificationIcon.className = 'fas fa-exclamation-triangle';
    } else {
        notification.style.background = 'var(--success-color)';
        notificationIcon.className = 'fas fa-check-circle';
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function handleScroll() {
    // Smooth scroll spy for navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function handleOutsideClick(e) {
    // Close mobile menu when clicking outside
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileMenuToggle');

    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }

    // Close modals when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Initialize cart on load
loadCart();

// Add CSS for additional animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 107, 53, 0.3);
        border-radius: 50%;
        animation: float-particle linear infinite;
    }

    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }

    .field-error {
        color: var(--danger-color);
        font-size: 0.875rem;
        margin-top: var(--spacing-xs);
    }

    .error {
        border-color: var(--danger-color) !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
    }
`;
document.head.appendChild(style);