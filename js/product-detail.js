let currentProduct = null;
let selectedRating = 0;

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const productName = params.get('name');
    
    if (!productName) {
        window.location.href = 'index.html';
        return;
    }
    
    loadProduct(productName);
    loadReviews(productName);
    
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) cartBtn.addEventListener('click', () => window.location.href = 'index.html');
});

function loadProduct(productName) {
    for (const category in allProducts) {
        const product = allProducts[category].find(p => p.name === productName);
        if (product) {
            currentProduct = product;
            displayProduct(product);
            return;
        }
    }
    window.location.href = 'index.html';
}

function displayProduct(product) {
    document.getElementById('productTitle').textContent = product.name + ' - دیجیاستور';
    document.getElementById('breadcrumb').textContent = product.name;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productRating').textContent = product.rating;
    document.getElementById('reviewCount').textContent = `(${product.reviews} نظر)`;
    document.getElementById('productPrice').textContent = product.price;
    
    if (product.oldPrice) {
        document.getElementById('oldPriceSection').classList.remove('hidden');
        document.getElementById('productOldPrice').textContent = product.oldPrice + ' تومان';
        document.getElementById('discountBadge').textContent = product.discount + ' تخفیف';
    }
    
    document.getElementById('mainImage').src = '../' + product.image;
    document.getElementById('thumbnails').innerHTML = `
        <img src="../${product.image}" class="w-20 h-20 object-contain border rounded cursor-pointer hover:border-red-500" onclick="changeImage('../${product.image}')">
        <img src="../${product.image}" class="w-20 h-20 object-contain border rounded cursor-pointer hover:border-red-500" onclick="changeImage('../${product.image}')">
        <img src="../${product.image}" class="w-20 h-20 object-contain border rounded cursor-pointer hover:border-red-500" onclick="changeImage('../${product.image}')">
    `;
    
    document.getElementById('productDescription').innerHTML = `
        <p class="text-gray-700 leading-relaxed mb-4">
            ${product.name} یکی از بهترین محصولات موجود در بازار است که با کیفیت بالا و قیمت مناسب به دست شما میرسد.
        </p>
        <p class="text-gray-700 leading-relaxed mb-4">
            این محصول دارای گارانتی معتبر و خدمات پس از فروش عالی است. با خرید از دیجیاستور از اصالت کالا مطمئن باشید.
        </p>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            <li>کیفیت ساخت بالا</li>
            <li>گارانتی معتبر</li>
            <li>ارسال سریع</li>
            <li>پشتیبانی ۲۴ ساعته</li>
        </ul>
    `;
    
    document.getElementById('productSpecs').innerHTML = `
        <div class="flex justify-between py-3 border-b">
            <span class="text-gray-600">برند</span>
            <span class="font-semibold">اصل</span>
        </div>
        <div class="flex justify-between py-3 border-b">
            <span class="text-gray-600">گارانتی</span>
            <span class="font-semibold">۱۸ ماهه</span>
        </div>
        <div class="flex justify-between py-3 border-b">
            <span class="text-gray-600">وضعیت</span>
            <span class="font-semibold text-green-600">موجود</span>
        </div>
        <div class="flex justify-between py-3">
            <span class="text-gray-600">ارسال</span>
            <span class="font-semibold">رایگان</span>
        </div>
    `;
}

function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

function showTab(tab) {
    document.getElementById('descriptionTab').classList.remove('tab-active');
    document.getElementById('specsTab').classList.remove('tab-active');
    document.getElementById('reviewsTab').classList.remove('tab-active');
    
    document.getElementById('descriptionTab').classList.add('text-gray-600');
    document.getElementById('specsTab').classList.add('text-gray-600');
    document.getElementById('reviewsTab').classList.add('text-gray-600');
    
    document.getElementById('descriptionContent').classList.add('hidden');
    document.getElementById('specsContent').classList.add('hidden');
    document.getElementById('reviewsContent').classList.add('hidden');
    
    document.getElementById(tab + 'Tab').classList.add('tab-active');
    document.getElementById(tab + 'Tab').classList.remove('text-gray-600');
    document.getElementById(tab + 'Content').classList.remove('hidden');
}

function setRating(rating) {
    selectedRating = rating;
    const buttons = document.querySelectorAll('.rating-btn');
    buttons.forEach((btn, index) => {
        if (index < rating) {
            btn.style.filter = 'none';
        } else {
            btn.style.filter = 'grayscale(100%)';
        }
    });
}

function submitReview() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        alert('لطفا ابتدا وارد حساب کاربری خود شوید');
        window.location.href = 'login.html';
        return;
    }
    
    const user = JSON.parse(userData);
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (!reviewText) {
        alert('لطفا نظر خود را بنویسید');
        return;
    }
    
    if (selectedRating === 0) {
        alert('لطفا امتیاز خود را انتخاب کنید');
        return;
    }
    
    const reviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    if (!reviews[currentProduct.name]) reviews[currentProduct.name] = [];
    
    reviews[currentProduct.name].push({
        userName: user.name,
        rating: selectedRating,
        text: reviewText,
        date: new Date().toLocaleDateString('fa-IR')
    });
    
    localStorage.setItem('productReviews', JSON.stringify(reviews));
    
    document.getElementById('reviewText').value = '';
    selectedRating = 0;
    setRating(0);
    
    loadReviews(currentProduct.name);
    alert('نظر شما با موفقیت ثبت شد');
}

function loadReviews(productName) {
    const reviews = JSON.parse(localStorage.getItem('productReviews') || '{}');
    const productReviews = reviews[productName] || [];
    const reviewsList = document.getElementById('reviewsList');
    
    if (productReviews.length === 0) {
        reviewsList.innerHTML = '<div class="text-center py-8 text-gray-400">هنوز نظری ثبت نشده است</div>';
        return;
    }
    
    reviewsList.innerHTML = productReviews.map(review => `
        <div class="border-b pb-4 mb-4">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                        ${review.userName.charAt(0)}
                    </div>
                    <div>
                        <div class="font-semibold">${review.userName}</div>
                        <div class="text-sm text-gray-500">${review.date}</div>
                    </div>
                </div>
                <div class="text-yellow-500">${'⭐'.repeat(review.rating)}</div>
            </div>
            <p class="text-gray-700">${review.text}</p>
        </div>
    `).join('');
}

function addToCartFromDetail() {
    if (currentProduct) {
        addToCart(currentProduct.name, currentProduct.price, currentProduct.image);
    }
}
