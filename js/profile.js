let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }
    currentUser = JSON.parse(userData);
    loadProfile();
});

function loadProfile() {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    loadOrders();
    loadAddresses();
    loadInfo();
}

function showTab(tab) {
    document.getElementById('ordersTab').classList.remove('tab-active');
    document.getElementById('addressesTab').classList.remove('tab-active');
    document.getElementById('infoTab').classList.remove('tab-active');
    
    document.getElementById('ordersContent').classList.add('hidden');
    document.getElementById('addressesContent').classList.add('hidden');
    document.getElementById('infoContent').classList.add('hidden');
    
    document.getElementById(tab + 'Tab').classList.add('tab-active');
    document.getElementById(tab + 'Content').classList.remove('hidden');
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem('userOrders') || '{}');
    const userOrders = orders[currentUser.id] || [];
    const ordersList = document.getElementById('ordersList');
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = '<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-4">📦</div><p>شما هنوز سفارشی ثبت نکردهاید</p></div>';
        return;
    }
    
    ordersList.innerHTML = userOrders.map(order => `
        <div class="border rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition" onclick="toggleOrderDetails('order-${order.id}')">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <div class="font-semibold">سفارش #${order.id}</div>
                    <div class="text-sm text-gray-500">${order.date}</div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs ${order.status === 'delivered' ? 'bg-green-100 text-green-600' : order.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}">
                    ${order.status === 'delivered' ? '✓ تحویل شده' : order.status === 'processing' ? '⏳ در حال پردازش' : '📦 آماده ارسال'}
                </span>
            </div>
            <div id="order-${order.id}" class="space-y-2 hidden">
                ${order.items.map(item => `
                    <div class="flex gap-3 text-sm">
                        <img src="../${item.image}" class="w-12 h-12 object-cover rounded">
                        <div class="flex-1">
                            <div class="font-medium">${item.name}</div>
                            <div class="text-gray-500">تعداد: ${item.quantity}</div>
                        </div>
                        <div class="font-semibold">${item.price} تومان</div>
                    </div>
                `).join('')}
            </div>
            <div class="border-t mt-3 pt-3 flex justify-between">
                <span class="font-semibold">جمع کل:</span>
                <span class="font-bold text-blue-500">${order.total} تومان</span>
            </div>
        </div>
    `).join('');
}

function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '{}');
    const userAddresses = addresses[currentUser.id] || [];
    const addressesList = document.getElementById('addressesList');
    
    if (userAddresses.length === 0) {
        addressesList.innerHTML = '<div class="text-center py-12 text-gray-400"><div class="text-6xl mb-4">📍</div><p>شما هنوز آدرسی ثبت نکردهاید</p></div>';
        return;
    }
    
    addressesList.innerHTML = userAddresses.map((addr, index) => `
        <div class="border rounded-lg p-4 mb-3">
            <div class="flex justify-between items-start">
                <div>
                    <div class="font-semibold mb-1">${addr.title}</div>
                    <div class="text-sm text-gray-600 mb-1">${addr.city}</div>
                    <div class="text-sm text-gray-600 mb-1">${addr.full}</div>
                    <div class="text-sm text-gray-500">کد پستی: ${addr.postal}</div>
                </div>
                <button onclick="deleteAddress(${index})" class="text-red-500 hover:text-red-700">🗑️</button>
            </div>
        </div>
    `).join('');
}

function showAddressForm() {
    document.getElementById('addressForm').classList.remove('hidden');
}

function hideAddressForm() {
    document.getElementById('addressForm').classList.add('hidden');
    document.getElementById('addressTitle').value = '';
    document.getElementById('addressCity').value = '';
    document.getElementById('addressFull').value = '';
    document.getElementById('addressPostal').value = '';
}

function saveAddress() {
    const title = document.getElementById('addressTitle').value.trim();
    const city = document.getElementById('addressCity').value.trim();
    const full = document.getElementById('addressFull').value.trim();
    const postal = document.getElementById('addressPostal').value.trim();
    
    if (!title || !city || !full || !postal) {
        alert('لطفا تمام فیلدها را پر کنید');
        return;
    }
    
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '{}');
    if (!addresses[currentUser.id]) addresses[currentUser.id] = [];
    
    addresses[currentUser.id].push({ title, city, full, postal });
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    hideAddressForm();
    loadAddresses();
    alert('آدرس با موفقیت ذخیره شد');
}

function deleteAddress(index) {
    if (!confirm('آیا از حذف این آدرس اطمینان دارید؟')) return;
    
    const addresses = JSON.parse(localStorage.getItem('userAddresses') || '{}');
    addresses[currentUser.id].splice(index, 1);
    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    
    loadAddresses();
}

function loadInfo() {
    document.getElementById('infoName').value = currentUser.name || '';
    document.getElementById('infoPhone').value = currentUser.phone || '';
    document.getElementById('infoEmail').value = currentUser.email || '';
}

function saveInfo() {
    const name = document.getElementById('infoName').value.trim();
    const email = document.getElementById('infoEmail').value.trim();
    
    if (!name) {
        alert('نام نمیتواند خالی باشد');
        return;
    }
    
    currentUser.name = name;
    currentUser.email = email;
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    document.getElementById('profileName').textContent = name;
    alert('اطلاعات با موفقیت ذخیره شد');
}

function logoutUser() {
    if (confirm('آیا میخواهید از حساب کاربری خارج شوید؟')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    }
}

function toggleOrderDetails(orderId) {
    const details = document.getElementById(orderId);
    details.classList.toggle('hidden');
}
