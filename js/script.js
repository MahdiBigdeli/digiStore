// Main Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-img');
const dots = document.querySelectorAll('.slider-dot');

// Cart System
let cart = [];
let currentUser = null;

// بارگذاری اطلاعات کاربر و سبد خرید
function loadUserData() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserUI();
        loadUserCart();
    }
}

// بروزرسانی رابط کاربری
function updateUserUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userBtn = document.getElementById('userBtn');
    const userName = document.getElementById('userName');
    
    if (currentUser) {
        loginBtn.classList.add('hidden');
        userBtn.classList.remove('hidden');
        userName.textContent = currentUser.name;
        userBtn.querySelector('.sm\\:hidden').textContent = '👤';
    } else {
        loginBtn.classList.remove('hidden');
        userBtn.classList.add('hidden');
    }
}

// بارگذاری سبد خرید کاربر
function loadUserCart() {
    if (currentUser) {
        const userCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
        cart = userCarts[currentUser.id] || [];
        updateCart();
    }
}

// ذخیره سبد خرید کاربر
function saveUserCart() {
    if (currentUser) {
        const userCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
        userCarts[currentUser.id] = cart;
        localStorage.setItem('userCarts', JSON.stringify(userCarts));
    }
}

// نمایش/مخفی کردن منوی کاربر
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    userMenu.classList.toggle('hidden');
}

// خروج از حساب کاربری
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    cart = [];
    updateUserUI();
    updateCart();
    window.location.reload();
}

// تبدیل اعداد فارسی به انگلیسی
function persianToEnglish(str) {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    for (let i = 0; i < 10; i++) {
        str = str.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
    }
    return str;
}

// تبدیل اعداد انگلیسی به فارسی
function englishToPersian(str) {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    str = str.toString();
    for (let i = 0; i < 10; i++) {
        str = str.replace(new RegExp(englishNumbers[i], 'g'), persianNumbers[i]);
    }
    return str;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('hidden');
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }
    
    saveUserCart();
    updateCart();
    showNotification('محصول به سبد خرید اضافه شد');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveUserCart();
    updateCart();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveUserCart();
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-gray-400 py-8">سبد خرید شما خالی است</p>';
        cartCount.classList.add('hidden');
        totalPrice.textContent = '۰ تومان';
        return;
    }
    
    cartCount.classList.remove('hidden');
    cartCount.textContent = englishToPersian(cart.reduce((sum, item) => sum + item.quantity, 0).toString());
    
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        const priceEnglish = persianToEnglish(item.price).replace(/,/g, '');
        const itemPrice = parseInt(priceEnglish);
        const itemTotal = itemPrice * item.quantity;
        total += itemTotal;
        
        const formattedTotal = englishToPersian(itemTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        const persianQuantity = englishToPersian(item.quantity.toString());
        
        return `
            <div class="flex gap-3 mb-4 pb-4 border-b">
                <img src="${item.image}" class="w-20 h-20 object-cover rounded">
                <div class="flex-1">
                    <h4 class="text-sm font-semibold mb-2">${item.name}</h4>
                    <div class="text-xs text-gray-500 mb-1">قیمت واحد: ${item.price} تومان</div>
                    <div class="text-sm text-red-500 font-bold mb-2">جمع: ${formattedTotal} تومان</div>
                    <div class="flex items-center gap-2">
                        <button onclick="updateQuantity(${index}, -1)" class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">-</button>
                        <span class="text-sm font-bold">${persianQuantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300">+</button>
                        <button onclick="removeFromCart(${index})" class="mr-auto text-red-500 text-sm hover:text-red-700">حذف</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    totalPrice.textContent = englishToPersian(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' تومان';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Close cart when clicking outside
document.getElementById('cartModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart();
    }
});

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].className = 'w-3 h-3 rounded-full bg-white/50 slider-dot';
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].className = 'w-3 h-3 rounded-full bg-white slider-dot';
}

function nextSlide() {
    goToSlide((currentSlide + 1) % 4);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // بارگذاری اطلاعات کاربر
    loadUserData();

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }

    // Close cart button
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }

    // User button
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.addEventListener('click', toggleUserMenu);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // بستن منوی کاربر با کلیک بیرون
    document.addEventListener('click', function(e) {
        const userSection = document.getElementById('userSection');
        const userMenu = document.getElementById('userMenu');
        if (userSection && !userSection.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });

    // Slider dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.name;
            const price = this.dataset.price;
            const image = this.dataset.image;
            addToCart(name, price, image);
        });
    });

    // Close cart when clicking outside
    document.getElementById('cartModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            toggleCart();
        }
    });

    // Start slider
    setInterval(nextSlide, 5000);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `category.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `category.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
});

function nextSlide() {
    goToSlide((currentSlide + 1) % 4);
}etInterval(nextSlide, 5000);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add to Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('h3').textContent;
        alert(`${productName} به سبد خرید اضافه شد!`);
        
        // Animation
        this.textContent = '✓ اضافه شد';
        this.style.background = '#4caf50';
        
        setTimeout(() => {
            this.textContent = 'افزودن به سبد';
            this.style.background = '';
        }, 2000);
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        alert(`جستجو برای: ${searchTerm}`);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`جستجو برای: ${searchTerm}`);
        }
    }
});

// Product Card Hover Effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Category Menu Scroll
const categoryMenu = document.querySelector('.category-menu');
let isDown = false;
let startX;
let scrollLeft;

categoryMenu.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - categoryMenu.offsetLeft;
    scrollLeft = categoryMenu.scrollLeft;
});

categoryMenu.addEventListener('mouseleave', () => {
    isDown = false;
});

categoryMenu.addEventListener('mouseup', () => {
    isDown = false;
});

categoryMenu.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - categoryMenu.offsetLeft;
    const walk = (x - startX) * 2;
    categoryMenu.scrollLeft = scrollLeft - walk;
});
