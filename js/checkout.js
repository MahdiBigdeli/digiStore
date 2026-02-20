let currentUser = null;
let cart = [];
let currentStep = 1;
let shippingCost = 0;
let selectedCity = '';

document.addEventListener('DOMContentLoaded', function() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        alert('لطفا ابتدا وارد حساب کاربری خود شوید');
        window.location.href = 'login.html';
        return;
    }
    currentUser = JSON.parse(userData);
    loadCart();
    loadAddresses();
    updateSummary();
});

function loadCart() {
    const userCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
    cart = userCarts[currentUser.id] || [];
    
    if (cart.length === 0) {
        document.getElementById('checkoutCartItems').innerHTML = '<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-4">🛒</div><p>سبد خرید شما خالی است</p><a href="index.html" class="inline-block mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">بازگشت به فروشگاه</a></div>';
        return;
    }
    
    document.getElementById('checkoutCartItems').innerHTML = cart.map((item, index) => `
        <div class="flex gap-4 p-4 border rounded-lg mb-3">
            <img src="../${item.image}" class="w-20 h-20 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-semibold mb-1">${item.name}</h4>
                <div class="text-sm text-gray-500">تعداد: ${englishToPersian(item.quantity.toString())}</div>
                <div class="font-bold text-red-500 mt-2">${item.price} تومان</div>
            </div>
        </div>
    `).join('');
}

function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '{}');
    const userAddresses = addresses[currentUser.id] || [];
    const addressList = document.getElementById('addressList');
    
    if (userAddresses.length === 0) {
        addressList.innerHTML = '<div class="text-center py-8 text-gray-400"><p>شما هنوز آدرسی ثبت نکردهاید</p><a href="profile.html" class="inline-block mt-4 text-red-500 hover:underline">افزودن آدرس</a></div>';
        return;
    }
    
    addressList.innerHTML = userAddresses.map((addr, index) => `
        <label class="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input type="radio" name="address" value="${index}" ${index === 0 ? 'checked' : ''} class="mt-1" onchange="updateDeliveryTime('${addr.city}')">
            <div class="flex-1">
                <div class="font-semibold">${addr.title}</div>
                <div class="text-sm text-gray-600 mt-1">${addr.city} - ${addr.full}</div>
                <div class="text-sm text-gray-500 mt-1">کد پستی: ${addr.postal}</div>
            </div>
        </label>
    `).join('');
    
    document.getElementById('receiverName').value = currentUser.name;
    document.getElementById('receiverPhone').value = currentUser.phone;
    
    if (userAddresses.length > 0) {
        updateDeliveryTime(userAddresses[0].city);
    }
}

function updateDeliveryTime(city) {
    selectedCity = city;
    const deliverySection = document.getElementById('deliveryTimeSection');
    
    if (city === 'تهران' || city === 'کرج') {
        shippingCost = 80000;
        const dates = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            dates.push(date.toLocaleDateString('fa-IR'));
        }
        
        deliverySection.innerHTML = `
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div class="text-sm text-blue-800">🚚 ارسال سریع برای ${city}</div>
            </div>
            <select id="deliveryDate" class="w-full border rounded-lg px-3 py-2">
                ${dates.map(date => `<option value="${date}">${date}</option>`).join('')}
            </select>
        `;
    } else {
        shippingCost = 60000;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 14);
        
        deliverySection.innerHTML = `
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="text-sm text-yellow-800 mb-2">📦 ارسال عادی</div>
                <div class="font-semibold">تحویل تا ۱۴ روز کاری آینده</div>
                <div class="text-sm text-gray-600 mt-1">تاریخ تحویل: ${deliveryDate.toLocaleDateString('fa-IR')}</div>
            </div>
        `;
    }
    
    updateSummary();
}

function updateSummary() {
    let total = 0;
    cart.forEach(item => {
        const priceEnglish = persianToEnglish(item.price).replace(/,/g, '');
        const itemPrice = parseInt(priceEnglish);
        total += itemPrice * item.quantity;
    });
    
    const formattedSubtotal = englishToPersian(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const formattedShipping = shippingCost === 0 ? 'رایگان' : englishToPersian(shippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ' تومان';
    const finalTotal = total + shippingCost;
    const formattedTotal = englishToPersian(finalTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    
    document.getElementById('subtotal').textContent = formattedSubtotal + ' تومان';
    document.getElementById('shippingCost').textContent = formattedShipping;
    document.getElementById('total').textContent = formattedTotal + ' تومان';
}

function goToStep(step) {
    if (step === 2) {
        if (cart.length === 0) {
            alert('سبد خرید شما خالی است');
            return;
        }
    }
    
    if (step === 3) {
        const selectedAddress = document.querySelector('input[name="address"]:checked');
        const receiverName = document.getElementById('receiverName').value.trim();
        const receiverPhone = document.getElementById('receiverPhone').value.trim();
        
        if (!selectedAddress) {
            alert('لطفا آدرس ارسال را انتخاب کنید');
            return;
        }
        if (!receiverName || !receiverPhone) {
            alert('لطفا اطلاعات گیرنده را کامل کنید');
            return;
        }
    }
    
    currentStep = step;
    
    document.getElementById('cartStep').classList.add('hidden');
    document.getElementById('addressStep').classList.add('hidden');
    document.getElementById('paymentStep').classList.add('hidden');
    
    document.getElementById('step1').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-300';
    document.getElementById('step2').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-300';
    document.getElementById('step3').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-300';
    
    if (step === 1) {
        document.getElementById('cartStep').classList.remove('hidden');
        document.getElementById('step1').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold step-active';
    } else if (step === 2) {
        document.getElementById('addressStep').classList.remove('hidden');
        document.getElementById('step1').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold step-completed';
        document.getElementById('step2').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold step-active';
    } else if (step === 3) {
        document.getElementById('paymentStep').classList.remove('hidden');
        document.getElementById('step1').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold step-completed';
        document.getElementById('step2').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold step-completed';
        document.getElementById('step3').className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold step-active';
    }
}

function completeOrder() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    let total = 0;
    cart.forEach(item => {
        const priceEnglish = persianToEnglish(item.price).replace(/,/g, '');
        const itemPrice = parseInt(priceEnglish);
        total += itemPrice * item.quantity;
    });
    
    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString('fa-IR'),
        items: cart,
        total: englishToPersian(total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        status: 'processing',
        paymentMethod: paymentMethod === 'online' ? 'آنلاین' : 'در محل'
    };
    
    const orders = JSON.parse(localStorage.getItem('userOrders') || '{}');
    if (!orders[currentUser.id]) orders[currentUser.id] = [];
    orders[currentUser.id].unshift(order);
    localStorage.setItem('userOrders', JSON.stringify(orders));
    
    const userCarts = JSON.parse(localStorage.getItem('userCarts') || '{}');
    userCarts[currentUser.id] = [];
    localStorage.setItem('userCarts', JSON.stringify(userCarts));
    
    alert('سفارش شما با موفقیت ثبت شد!');
    window.location.href = 'profile.html';
}
