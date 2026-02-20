// سیستم جستجو در صفحه اصلی

function performSearch(query) {
    if (typeof allProducts === 'undefined') return;
    
    const results = [];
    Object.keys(allProducts).forEach(category => {
        allProducts[category].forEach(product => {
            if (product.name.includes(query)) {
                results.push(product);
            }
        });
    });
    
    const searchSection = document.getElementById('searchResults');
    const searchQuery = document.getElementById('searchQuery');
    const searchGrid = document.getElementById('searchProductsGrid');
    
    if (results.length > 0) {
        searchQuery.textContent = query;
        searchSection.classList.remove('hidden');
        
        const displayResults = results.slice(0, 4);
        searchGrid.innerHTML = displayResults.map(product => `
            <div class="border rounded-xl p-2 sm:p-4 text-center hover:shadow-lg transition cursor-pointer" 
                 onclick="window.location.href='product.html?name='+encodeURIComponent('${product.name}')">
                <img src="${product.image}" class="w-full h-32 object-contain mb-2" alt="${product.name}">
                <h3 class="font-semibold text-sm mb-2 line-clamp-2">${product.name}</h3>
                <div class="text-lg font-bold text-blue-600 mb-2">${product.price} تومان</div>
                <button onclick="event.stopPropagation(); addToCart('${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')" 
                        class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600">
                    افزودن به سبد
                </button>
            </div>
        `).join('');
        
        searchSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        searchSection.classList.add('hidden');
    }
}

// اتصال به دکمه جستجو
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    performSearch(query);
                }
            }
        });
    }
});
