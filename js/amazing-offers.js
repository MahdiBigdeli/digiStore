// سیستم مدیریت پیشنهادات شگفتانگیز با تغییر خودکار هر 24 ساعت

function getRandomProducts(count = 8) {
    if (typeof allProducts === 'undefined') return [];
    
    const allProductsList = [];
    Object.keys(allProducts).forEach(category => {
        allProducts[category].forEach(product => {
            allProductsList.push({...product, category});
        });
    });
    
    const shuffled = allProductsList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function shouldUpdateOffers() {
    const lastUpdate = localStorage.getItem('amazingOffersLastUpdate');
    if (!lastUpdate) return true;
    
    const hoursDiff = (Date.now() - parseInt(lastUpdate)) / (1000 * 60 * 60);
    return hoursDiff >= 24;
}

function saveAmazingOffers(products) {
    localStorage.setItem('amazingOffers', JSON.stringify(products));
    localStorage.setItem('amazingOffersLastUpdate', Date.now().toString());
}

function loadAmazingOffers() {
    const saved = localStorage.getItem('amazingOffers');
    return saved ? JSON.parse(saved) : null;
}

function displayAmazingOffers() {
    const container = document.getElementById('amazingOffers');
    if (!container) return;
    
    let offers;
    if (shouldUpdateOffers()) {
        offers = getRandomProducts(8);
        saveAmazingOffers(offers);
    } else {
        offers = loadAmazingOffers();
        if (!offers || offers.length === 0) {
            offers = getRandomProducts(8);
            saveAmazingOffers(offers);
        }
    }
    
    container.innerHTML = offers.map(product => `
        <div class="bg-white rounded-xl p-4 w-48 flex-shrink-0 hover:shadow-lg transition cursor-pointer" 
             onclick=\"window.location.href='pages/product.html?name='+encodeURIComponent('${product.name}')">
            <div class="relative mb-3">
                <img src="${product.image}" class="w-full h-40 object-contain" alt="${product.name}">
                <span class="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                    ${product.discount}
                </span>
            </div>
            <h3 class="text-sm font-semibold mb-2 h-10 line-clamp-2">${product.name}</h3>
            <div class="flex items-center gap-2 mb-2">
                <span class="text-xs text-gray-400 line-through">${product.oldPrice} تومان</span>
            </div>
            <div class="text-lg font-bold text-blue-600 mb-3">${product.price} تومان</div>
            <button onclick="event.stopPropagation(); addToCart('${product.name.replace(/'/g, "\\'")}', '${product.price}', '${product.image}')" 
                    class="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600">
                افزودن به سبد
            </button>
        </div>
    `).join('');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayAmazingOffers);
} else {
    displayAmazingOffers();
}
