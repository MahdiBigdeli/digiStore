let allFilteredProducts = [];

function getCategory() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cat');
}

function getSearchQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('search') || '';
}

function searchAllProducts(query) {
    const results = [];
    for (const category in allProducts) {
        const products = allProducts[category].filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase())
        );
        results.push(...products);
    }
    return results;
}

function applyFilters() {
    let products = [...allFilteredProducts];
    
    const sortValue = document.getElementById('sortFilter').value;
    const minPrice = document.getElementById('minPrice').value.trim();
    const maxPrice = document.getElementById('maxPrice').value.trim();
    
    if (minPrice || maxPrice) {
        const min = minPrice ? parseInt(persianToEnglish(minPrice).replace(/,/g, '')) : 0;
        const max = maxPrice ? parseInt(persianToEnglish(maxPrice).replace(/,/g, '')) : Infinity;
        products = products.filter(p => {
            const price = parseInt(persianToEnglish(p.price).replace(/,/g, ''));
            return price >= min && price <= max;
        });
    }
    
    if (sortValue === 'price-asc') {
        products.sort((a, b) => {
            const priceA = parseInt(persianToEnglish(a.price).replace(/,/g, ''));
            const priceB = parseInt(persianToEnglish(b.price).replace(/,/g, ''));
            return priceA - priceB;
        });
    } else if (sortValue === 'price-desc') {
        products.sort((a, b) => {
            const priceA = parseInt(persianToEnglish(a.price).replace(/,/g, ''));
            const priceB = parseInt(persianToEnglish(b.price).replace(/,/g, ''));
            return priceB - priceA;
        });
    } else if (sortValue === 'popular') {
        products.sort((a, b) => {
            const reviewsA = parseInt(persianToEnglish(a.reviews));
            const reviewsB = parseInt(persianToEnglish(b.reviews));
            return reviewsB - reviewsA;
        });
    }
    
    renderProducts(products);
}

function applyCustomPriceFilter() {
    applyFilters();
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    
    document.getElementById('productCount').textContent = englishToPersian(products.length.toString());
    
    if (products.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }
    
    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    
    grid.innerHTML = products.map(product => `
        <div class="bg-white border rounded-xl p-4 text-center hover:shadow-lg transition cursor-pointer" onclick="window.location.href='product.html?name=${encodeURIComponent(product.name)}'">
            <div class="mb-4">
                <img src="../${product.image}" alt="${product.name}" class="w-full h-48 object-contain">
            </div>
            <h3 class="font-semibold mb-2 text-sm line-clamp-2 h-10">${product.name}</h3>
            <div class="text-xs text-gray-400 mb-2">${product.rating} (${product.reviews})</div>
            <div class="text-lg font-bold mb-3 text-blue-500">${product.price} تومان</div>
            <button onclick="event.stopPropagation(); addToCart('${product.name}', '${product.price}', '${product.image}')" 
                class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">
                افزودن به سبد
            </button>
        </div>
    `).join('');
}

function displayProducts() {
    const category = getCategory();
    const searchQuery = getSearchQuery();
    
    if (searchQuery) {
        allFilteredProducts = searchAllProducts(searchQuery);
        document.getElementById('pageTitle').textContent = `نتایج جستجو: ${searchQuery} - دیجیاستور`;
        document.getElementById('categoryTitle').textContent = `🔍 نتایج جستجو: ${searchQuery}`;
        document.getElementById('breadcrumb').textContent = `جستجو: ${searchQuery}`;
    } else if (category) {
        allFilteredProducts = allProducts[category] || [];
        const icon = categoryIcons[category] || '📦';
        document.getElementById('pageTitle').textContent = `${category} - دیجیاستور`;
        document.getElementById('categoryTitle').textContent = `${icon} ${category}`;
        document.getElementById('breadcrumb').textContent = category;
    } else {
        allFilteredProducts = [];
    }
    
    applyFilters();
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    displayProducts();
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
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
    
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
    
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) cartBtn.addEventListener('click', toggleCart);
    
    const closeCart = document.getElementById('closeCart');
    if (closeCart) closeCart.addEventListener('click', toggleCart);
    
    const userBtn = document.getElementById('userBtn');
    if (userBtn) userBtn.addEventListener('click', toggleUserMenu);
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    
    document.addEventListener('click', function(e) {
        const userSection = document.getElementById('userSection');
        const userMenu = document.getElementById('userMenu');
        if (userSection && !userSection.contains(e.target)) {
            userMenu.classList.add('hidden');
        }
    });
});
