// Modern JavaScript for Gym Lover's Cafe Website

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const themeToggle = document.getElementById('themeToggle');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const menuModal = document.getElementById('menuModal');
const backToTop = document.getElementById('backToTop');
const loadingScreen = document.getElementById('loadingScreen');
const contactForm = document.getElementById('contactForm');
const notification = document.getElementById('notification');

// State Management
let cart = [];
let currentTheme = localStorage.getItem('theme') || 'light';
let currentTestimonial = 0;
let testimonials = document.querySelectorAll('.testimonial-card');
let testimonialDots = document.querySelectorAll('.dot');

// Menu Data
const menuItems = {
    'Power Protein Bowl': {
        price: 12.99,
        calories: 650,
        protein: 45,
        description: 'Grilled chicken, quinoa, roasted vegetables & tahini dressing. Perfect for post-workout recovery.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    'Green Power Smoothie': {
        price: 8.99,
        calories: 280,
        protein: 20,
        description: 'Spinach, banana, almond milk, chia seeds & plant protein. A refreshing vegan boost.',
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=300&fit=crop'
    },
    'Muscle Builder Pasta': {
        price: 13.99,
        calories: 720,
        protein: 50,
        description: 'Whole grain pasta, lean beef, spinach & nutritional yeast. High-protein comfort food.',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
    },
    'Buddha Vegan Bowl': {
        price: 11.99,
        calories: 580,
        protein: 25,
        description: 'Roasted chickpeas, sweet potato, kale & avocado. Nutrient-dense vegan delight.',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },
    'Post-Workout Recovery': {
        price: 9.99,
        calories: 320,
        protein: 30,
        description: 'Whey protein, berries, Greek yogurt & honey. Fast-absorbing recovery fuel.',
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop'
    },
    'Whey Protein Powder': {
        price: 49.99,
        calories: 120,
        protein: 25,
        description: 'Premium whey isolate, 25g protein per serving. Build muscle, recover faster.',
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8ca9?w=400&h=300&fit=crop'
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2000);

    // Initialize theme
    setTheme(currentTheme);

    // Setup event listeners
    setupEventListeners();

    // Initialize testimonials
    initializeTestimonials();

    // Setup scroll effects
    setupScrollEffects();

    // Load cart from localStorage
    loadCart();

    // Setup form validation
    setupFormValidation();

    // Create particles effect
    createParticles();
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    themeToggle.addEventListener('click', toggleTheme);

    // Cart
    cartBtn.addEventListener('click', openCart);

    // Modals
    document.addEventListener('click', handleModalClose);

    // Scroll
    window.addEventListener('scroll', handleScroll);

    // Back to top
    backToTop.addEventListener('click', scrollToTop);

    // Menu filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', filterMenu);
    });

    // Testimonial controls
    document.getElementById('prevBtn').addEventListener('click', () => changeTestimonial(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changeTestimonial(1));

    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });

    // Contact form
    contactForm.addEventListener('submit', handleFormSubmit);

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
}

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);

    const themeIcon = themeToggle.querySelector('i');
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Animate theme toggle
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
}

// Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
}

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    // Close mobile menu
    navMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - navbar.offsetHeight;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll Effects
function setupScrollEffects() {
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

function handleScroll() {
    // Navbar background change
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

    // Update active nav link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + navbar.offsetHeight + 50;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Menu Filtering
function filterMenu() {
    const filter = this.dataset.filter;
    const menuCards = document.querySelectorAll('.menu-card');

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    this.classList.add('active');

    // Filter menu items
    menuCards.forEach(card => {
        const categories = card.dataset.category.split(' ');

        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.animationDelay = `${Math.random() * 0.3}s`;
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Management
function openModal(itemName) {
    const item = menuItems[itemName];
    if (!item) return;

    // Populate modal
    document.getElementById('modalTitle').textContent = itemName;
    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalPrice').textContent = `$${item.price.toFixed(2)}`;
    document.getElementById('modalCalories').textContent = `${item.calories} cal`;
    document.getElementById('modalProtein').textContent = `${item.protein}g protein`;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalQuantity').textContent = '1';
    document.getElementById('modalTotal').textContent = item.price.toFixed(2);

    // Reset customizations
    document.querySelectorAll('.custom-option input').forEach(input => {
        input.checked = false;
    });

    menuModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    menuModal.classList.remove('show');
    cartModal.classList.remove('show');
    document.body.style.overflow = '';
}

function handleModalClose(e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
}

// Cart Management
function addToCart(itemName, basePrice) {
    const item = menuItems[itemName];
    if (!item) return;

    // Get customizations
    let totalPrice = basePrice;
    const customizations = [];

    document.querySelectorAll('.custom-option input:checked').forEach(input => {
        const label = input.parentElement.textContent.trim();
        const priceMatch = label.match(/\+?\$?(\d+(?:\.\d{2})?)/);
        if (priceMatch) {
            totalPrice += parseFloat(priceMatch[1]);
        }
        customizations.push(label);
    });

    const quantity = parseInt(document.getElementById('modalQuantity')?.textContent || '1');

    // Check if item already in cart
    const existingItem = cart.find(cartItem =>
        cartItem.name === itemName &&
        JSON.stringify(cartItem.customizations) === JSON.stringify(customizations)
    );

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice += totalPrice * quantity;
    } else {
        cart.push({
            name: itemName,
            price: basePrice,
            totalPrice: totalPrice * quantity,
            quantity: quantity,
            customizations: customizations,
            image: item.image
        });
    }

    updateCartCount();
    saveCart();
    showNotification(`${itemName} added to cart!`);

    // Close modal if open
    if (menuModal.classList.contains('show')) {
        closeModal();
    }
}

function addToCartFromModal() {
    const itemName = document.getElementById('modalTitle').textContent;
    const basePrice = parseFloat(document.getElementById('modalPrice').textContent.replace('$', ''));
    addToCart(itemName, basePrice);
}

function updateQuantity(change) {
    const quantityEl = document.getElementById('modalQuantity');
    const totalEl = document.getElementById('modalTotal');
    let quantity = parseInt(quantityEl.textContent);
    const basePrice = parseFloat(document.getElementById('modalPrice').textContent.replace('$', ''));

    quantity = Math.max(1, quantity + change);
    quantityEl.textContent = quantity;

    // Calculate customizations
    let totalPrice = basePrice;
    document.querySelectorAll('.custom-option input:checked').forEach(input => {
        const label = input.parentElement.textContent.trim();
        const priceMatch = label.match(/\+?\$?(\d+(?:\.\d{2})?)/);
        if (priceMatch) {
            totalPrice += parseFloat(priceMatch[1]);
        }
    });

    totalEl.textContent = (totalPrice * quantity).toFixed(2);
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('show', totalItems > 0);
}

function openCart() {
    renderCart();
    cartModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartModal.classList.remove('show');
    document.body.style.overflow = '';
}

function renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
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

    cartItemsEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.customizations.length > 0 ? item.customizations.join(', ') : 'Standard'}</p>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">$${item.totalPrice.toFixed(2)}</div>
            <button class="btn btn-secondary" onclick="removeCartItem(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;

    cartSummary.style.display = 'block';
    checkoutBtn.disabled = false;
}

function updateCartItemQuantity(index, change) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    cart[index].totalPrice = cart[index].price * cart[index].quantity;

    // Recalculate with customizations
    cart[index].customizations.forEach(custom => {
        const priceMatch = custom.match(/\+?\$?(\d+(?:\.\d{2})?)/);
        if (priceMatch) {
            cart[index].totalPrice += parseFloat(priceMatch[1]) * cart[index].quantity;
        }
    });

    updateCartCount();
    saveCart();
    renderCart();
}

function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('gymCafeCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('gymCafeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Testimonials
function initializeTestimonials() {
    testimonials = document.querySelectorAll('.testimonial-card');
    testimonialDots = document.querySelectorAll('.dot');
    showTestimonial(currentTestimonial);
}

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });

    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function changeTestimonial(direction) {
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function goToTestimonial(index) {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Form Validation
function setupFormValidation() {
    const inputs = contactForm.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

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
                errorMessage = 'Please enter a valid email address';
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
    clearFieldError.call({ target: field });

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--danger-color);
        font-size: 0.875rem;
        margin-top: var(--spacing-xs);
        animation: fadeIn 0.3s ease;
    `;

    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'var(--danger-color)';
}

function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');

    if (errorDiv) {
        errorDiv.remove();
    }

    field.style.borderColor = '';
}

function handleFormSubmit(e) {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Message sent successfully! We\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
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
    showNotification('Thank you for subscribing! Check your email for confirmation.');
    emailInput.value = '';
}

// Notification System
function showNotification(message, type = 'success') {
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
    }, 4000);
}

// Particles Effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;

        particlesContainer.appendChild(particle);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll handler
window.addEventListener('scroll', debounce(handleScroll, 10));

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Prevent form submission on enter for certain fields
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
        e.preventDefault();
    }
});

// Performance Optimization
// Lazy load images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Would register service worker here for PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Accessibility Improvements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels where needed
    const modalButtons = document.querySelectorAll('[onclick*="openModal"]');
    modalButtons.forEach(btn => {
        btn.setAttribute('aria-label', `View details for ${btn.closest('.menu-card').querySelector('h3').textContent}`);
    });

    // Improve focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    });
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Could send error reports to monitoring service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error reports to monitoring service
});

// Performance Monitoring
if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }, 0);
    });
}