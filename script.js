// script.js

// داده‌های محصولات
let products = [
    {
        id: 1,
        name: "گوشی سامسونگ گلکسی A54",
        description: "گوشی هوشمند با دوربین 50 مگاپیکسل و باتری 5000 میلی‌آمپر",
        price: 24900,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        badge: "جدید",
        stock: 15
    },
    {
        id: 2,
        name: "لپ‌تاپ دل اینسپایرون 15",
        description: "پردازنده Core i7، رم 16GB، هارد SSD 512GB",
        price: 89900,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
        badge: "پرفروش",
        stock: 8
    },
    {
        id: 3,
        name: "هدفون بلوتوثی سونی",
        description: "نویزگیری فعال، باتری 30 ساعته، کیفیت صدای عالی",
        price: 11200,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        badge: "تخفیف",
        stock: 25
    },
    {
        id: 4,
        name: "ژاکت مردانه زمستانی",
        description: "ژاکت پشمی گرم، مناسب برای فصول سرد سال",
        price: 3200,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        badge: "",
        stock: 40
    },
    {
        id: 5,
        name: "کفش ورزشی نایک",
        description: "کفش مخصوص دویدن، سبک و راحت",
        price: 5600,
        category: "sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        badge: "پرفروش",
        stock: 30
    },
    {
        id: 6,
        name: "ماشین لباسشویی سامسونگ",
        description: "ظرفیت 8 کیلوگرم، مصرف انرژی A++",
        price: 45900,
        category: "home",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        badge: "",
        stock: 12
    }
];

// سبد خرید
let cart = [];
let currentCategory = 'all';

// DOM Elements
let productsContainer;
let cartCountElement;
let cartItemsContainer;
let cartTotalElement;
let emptyCartMessage;
let cartSummary;

// نمایش محصولات
function displayProducts() {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">محصولی در این دسته‌بندی وجود ندارد</h3>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card" data-category="${product.category}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-stock" style="font-size: 0.9rem; color: ${product.stock > 10 ? '#27ae60' : product.stock > 0 ? '#f39c12' : '#e74c3c'}; margin-bottom: 10px;">
                        <i class="fas fa-cubes"></i> موجودی: ${product.stock} عدد
                    </div>
                    <div class="product-price">
                        <div>
                            <span class="price">${product.price.toLocaleString()}</span>
                            <span class="price-currency">افغانی</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                            <i class="fas fa-cart-plus"></i> ${product.stock === 0 ? 'ناموجود' : 'افزودن'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// اضافه کردن به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showNotification('محصول یافت نشد!', 'error');
        return;
    }
    
    if (product.stock === 0) {
        showNotification('این محصول در حال حاضر موجود نیست!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showNotification(`حداکثر ${product.stock} عدد از این محصول قابل خرید است!`, 'error');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
}

// حذف از سبد خرید
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

// تغییر مقدار محصول در سبد خرید
function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
        showNotification(`حداکثر ${product.stock} عدد از این محصول قابل خرید است!`, 'error');
        return;
    }
    
    item.quantity = newQuantity;
    updateCart();
}

// آپدیت سبد خرید
function updateCart() {
    if (!cartCountElement || !cartItemsContainer || !cartTotalElement || !emptyCartMessage || !cartSummary) return;
    
    // آپدیت تعداد
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // آپدیت لیست
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartSummary.style.display = 'block';
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">
                            ${item.price.toLocaleString()} افغانی
                        </div>
                        <div class="cart-item-quantity" style="display: flex; align-items: center; gap: 10px; margin-top: 5px;">
                            <button onclick="updateCartItemQuantity(${item.id}, -1)" style="width: 30px; height: 30px; border-radius: 50%; border: 1px solid #ddd; background: white; cursor: pointer;">-</button>
                            <span style="font-weight: bold;">${item.quantity}</span>
                            <button onclick="updateCartItemQuantity(${item.id}, 1)" style="width: 30px; height: 30px; border-radius: 50%; border: 1px solid #ddd; background: white; cursor: pointer;">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItem;
        });
        
        cartTotalElement.textContent = total.toLocaleString();
    }
}

// نمایش/مخفی کردن سبد خرید
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

// تکمیل سفارش
function checkout() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!', 'error');
        return;
    }
    
    // بررسی موجودی
    for (const item of cart) {
        const product = products.find(p => p.id === item.id);
        if (item.quantity > product.stock) {
            showNotification(`موجودی ${product.name} کافی نیست!`, 'error');
            return;
        }
    }
    
    // به‌روزرسانی موجودی
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        product.stock -= item.quantity;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderDetails = cart.map(item => 
        `${item.name} (${item.quantity} عدد)`
    ).join('\n');
    
    // نمایش جزئیات سفارش
    const orderSummary = `
        <div style="text-align: right;">
            <h3>خلاصه سفارش</h3>
            <hr>
            ${cart.map(item => `
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>${item.name} (${item.quantity} عدد)</span>
                    <span>${(item.price * item.quantity).toLocaleString()} افغانی</span>
                </div>
            `).join('')}
            <hr>
            <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 15px;">
                <span>مجموع:</span>
                <span>${total.toLocaleString()} افغانی</span>
            </div>
        </div>
    `;
    
    // در حالت واقعی، اینجا اطلاعات به سرور ارسال می‌شود
    alert(`✅ سفارش شما با موفقیت ثبت شد!\n\n${orderDetails}\n\n💰 مجموع: ${total.toLocaleString()} افغانی\n\n🚚 سفارش شما طی 2-3 روز کاری ارسال می‌شود.`);
    
    // ذخیره سفارش در localStorage (موقت)
    saveOrderToHistory(total);
    
    // خالی کردن سبد خرید
    cart = [];
    updateCart();
    displayProducts(); // برای به‌روزرسانی موجودی
    toggleCart();
}

// ذخیره تاریخچه سفارشات
function saveOrderToHistory(total) {
    const orders = JSON.parse(localStorage.getItem('shop_orders') || '[]');
    orders.push({
        date: new Date().toLocaleString('fa-IR'),
        items: cart.length,
        total: total
    });
    localStorage.setItem('shop_orders', JSON.stringify(orders));
}

// فیلتر بر اساس دسته‌بندی
function filterProducts(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    displayProducts();
}

// اسکرول به محصولات
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// جستجوی محصولات
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayProducts();
        return;
    }
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.includes(searchTerm)
    );
    
    productsContainer.innerHTML = '';
    
    if (filtered.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">هیچ محصولی با عبارت "${searchTerm}" یافت نشد</h3>
            </div>
        `;
        return;
    }
    
    filtered.forEach(product => {
        const productCard = `
            <div class="product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price">
                        <div>
                            <span class="price">${product.price.toLocaleString()}</span>
                            <span class="price-currency">افغانی</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                            <i class="fas fa-cart-plus"></i> ${product.stock === 0 ? 'ناموجود' : 'افزودن'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// نوتیفیکیشن
function showNotification(message, type = 'success') {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// بارگذاری داده‌ها از localStorage
function loadFromStorage() {
    const savedCart = localStorage.getItem('shop_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    const savedProducts = localStorage.getItem('shop_products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
}

// ذخیره در localStorage
function saveToStorage() {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
    localStorage.setItem('shop_products', JSON.stringify(products));
}

// راه‌اندازی اولیه
document.addEventListener('DOMContentLoaded', () => {
    // عناصر DOM را پیدا کن
    productsContainer = document.getElementById('products-container');
    cartCountElement = document.getElementById('cart-count');
    cartItemsContainer = document.getElementById('cart-items');
    cartTotalElement = document.getElementById('total-price');
    emptyCartMessage = document.getElementById('empty-cart-message');
    cartSummary = document.getElementById('cart-summary');
    
    // بارگذاری از حافظه
    loadFromStorage();
    
    // نمایش محصولات
    displayProducts();
    
    // رویداد دسته‌بندی‌ها
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterProducts(e.target.dataset.category);
        });
    });
    
    // رویداد جستجو
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchProducts();
        });
    }
    
    // ذخیره خودکار هر 30 ثانیه
    setInterval(saveToStorage, 30000);
    
    // بستن سبد خرید با کلیک بیرون
    document.addEventListener('click', (e) => {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggle = document.querySelector('.cart-toggle');
        
        if (cartSidebar && cartSidebar.classList.contains('active') &&
            !cartSidebar.contains(e.target) && 
            !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
});

// استایل برای انیمیشن‌ها
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .product-card {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);