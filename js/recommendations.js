// سیستم پیشنهاد محصولات بر اساس فعالیت کاربر

function trackProductView(productName) {
    const views = JSON.parse(localStorage.getItem('productViews') || '[]');
    views.push({ name: productName, time: Date.now() });
    localStorage.setItem('productViews', JSON.stringify(views.slice(-10)));
}

function getRecommendedProducts() {
    if (typeof allProducts === 'undefined') return [];
    
    const views = JSON.parse(localStorage.getItem('productViews') || '[]');
    const cart = JSON.parse(localStorage.getItem('userCarts') || '{}');
    
    const allProductsList = [];
    Object.keys(allProducts).forEach(category => {
        allProducts[category].forEach(product => {
            allProductsList.push({...product, category});
        });
    });
    
    if (views.length === 0 && Object.keys(cart).length === 0) {
        return allProductsList.sort(() => 0.5 - Math.random()).slice(0, 4);
    }
    
    const viewedCategories = views.map(v => {
        const product = allProductsList.find(p => p.name === v.name);
        return product ? product.category : null;
    }).filter(Boolean);
    
    const recommended = allProductsList.filter(p => 
        viewedCategories.includes(p.category)
    ).sort(() => 0.5 - Math.random()).slice(0, 4);
    
    return recommended.length >= 4 ? recommended : allProductsList.sort(() => 0.5 - Math.random()).slice(0, 4);
}

function displayRecommendedProducts() {
    const container = document.getElementById('recommendedProducts');
    if (!container) return;
    
    const products = getRecommendedProducts();
    
    container.innerHTML = products.map(product => `
        <div class="border rounded-xl p-2 sm:p-4 text-center hover:shadow-lg transition cursor-pointer bg-white" 
             onclick=\"window.location.href='pages/product.html?name='+encodeURIComponent('${product.name}')">
            <img src="${product.image}" class="w-full h-32 object-contain mb-2" alt="${product.name}">
            <h3 class="font-semibold text-sm mb-2 line-clamp-2">${product.name}</h3>
            <div class="text-lg font-bold text-blue-600 mb-2">${product.price} تومان</div>
            <button onclick="event.stopPropagation(); addToCart('${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')" 
                    class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600">
                افزودن به سبد
            </button>
        </div>
    `).join('');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayRecommendedProducts);
} else {
    displayRecommendedProducts();
}
