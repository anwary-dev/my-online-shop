// script.js - فروشگاه آنلاین دکان - نسخه تضمین شده
// ==============================================

console.log('🚀 فایل script.js در حال بارگذاری...');

// ==================== متغیرهای سراسری ====================
let products = [];
let cart = [];
let currentCategory = 'all';

// ==================== راه‌اندازی اولیه ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM کاملاً بارگذاری شد');
    
    // 1. ابتدا المنت‌ها را پیدا کنیم
    findElements();
    
    // 2. سپس داده‌ها را بارگذاری کنیم
    loadInitialData();
    
    // 3. تنظیم رویدادها
    setupEventListeners();
    
    console.log('🎉 راه‌اندازی اولیه کامل شد');
});

// تابع برای پیدا کردن المنت‌های مهم
function findElements() {
    console.log('🔍 جستجوی المنت‌های صفحه...');
    
    // لیست المنت‌های ضروری
    const essentialElements = [
        'products-container',
        'cart-count',
        'cart-items',
        'cart-sidebar',
        'search-input'
    ];
    
    essentialElements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}:`, element ? '✅ پیدا شد' : '❌ پیدا نشد');
    });
}

// بارگذاری اولیه داده‌ها
function loadInitialData() {
    console.log('📂 بارگذاری داده‌های اولیه...');
    
    try {
        // 1. اول محصولات پیش‌فرض را تنظیم کنیم
        setupDefaultProducts();
        
        // 2. سپس سبد خرید
        loadCartFromStorage();
        
        // 3. حالا محصولات را نمایش دهیم
        renderAllProducts();
        
        // 4. سبد خرید را به‌روزرسانی کنیم
        updateCartDisplay();
        
        console.log('✅ بارگذاری اولیه موفق');
        
    } catch (error) {
        console.error('❌ خطا در بارگذاری اولیه:', error);
        emergencyMode();
    }
}

// ==================== محصولات پیش‌فرض ====================

function setupDefaultProducts() {
    console.log('🛠️ تنظیم محصولات پیش‌فرض...');
    
    products = [
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
            name: "قالین دستباف غوری",
            description: "قالین دستباف سنتی غور، کیفیت عالی، طرح‌های اصیل",
            price: 8500,
            category: "home",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
            badge: "محصول محلی",
            stock: 12
        },
        {
            id: 7,
            name: "زعفران غور",
            description: "زعفران مرغوب غور، درجه یک، بسته‌بندی بهداشتی",
            price: 3200,
            category: "food",
            image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop",
            badge: "پرفروش",
            stock: 25
        },
        {
            id: 8,
            name: "پوستین گرم",
            description: "پوستین گرم مخصوص زمستان‌های سرد غور",
            price: 12500,
            category: "clothing",
            image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop",
            badge: "جدید",
            stock: 8
        }
    ];
    
    console.log(`✅ ${products.length} محصول پیش‌فرض تنظیم شد`);
    
    // ذخیره در localStorage برای اطمینان
    try {
        localStorage.setItem('shop_products', JSON.stringify(products));
        console.log('💾 محصولات در localStorage ذخیره شد');
    } catch (e) {
        console.warn('⚠️ خطا در ذخیره محصولات:', e);
    }
}

// ==================== نمایش محصولات ====================

function renderAllProducts() {
    console.log('🎨 شروع رندر محصولات...');
    
    const container = document.getElementById('products-container');
    
    if (!container) {
        console.error('❌ المنت products-container پیدا نشد!');
        
        // تلاش برای پیدا کردن دوباره
        setTimeout(() => {
            console.log('🔁 تلاش مجدد برای پیدا کردن container...');
            renderAllProducts();
        }, 500);
        return;
    }
    
    console.log(`📊 رندر ${products.length} محصول...`);
    
    // پاک کردن container
    container.innerHTML = '';
    
    // اگر محصولی وجود ندارد
    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>هیچ محصولی یافت نشد</h3>
                <p>لطفاً بعداً مجدداً بررسی کنید</p>
            </div>
        `;
        console.log('ℹ️ پیام "بدون محصول" نمایش داده شد');
        return;
    }
    
    // ایجاد HTML برای هر محصول
    products.forEach((product, index) => {
        const productHTML = createProductHTML(product);
        container.innerHTML += productHTML;
        
        // لاگ هر 2 محصول
        if (index % 2 === 0) {
            console.log(`📦 رندر محصول ${index + 1}: ${product.name}`);
        }
    });
    
    console.log('✅ رندر محصولات کامل شد');
    
    // اضافه کردن استایل اگر وجود ندارد
    addProductStyles();
}

function createProductHTML(product) {
    const isOutOfStock = product.stock === 0;
    const stockClass = product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';
    
    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            
            <div class="product-image-container">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-image"
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'">
            </div>
            
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-stock ${stockClass}">
                    <i class="fas fa-cubes"></i>
                    <span>موجودی: ${product.stock} عدد</span>
                </div>
                
                <div class="product-footer">
                    <div class="product-price">
                        <span class="price-value">${product.price.toLocaleString('fa-IR')}</span>
                        <span class="price-unit">افغانی</span>
                    </div>
                    
                    <button class="add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
                            onclick="addProductToCart(${product.id})"
                            ${isOutOfStock ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i>
                        ${isOutOfStock ? 'ناموجود' : 'افزودن'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==================== مدیریت سبد خرید ====================

function loadCartFromStorage() {
    console.log('🛒 بارگذاری سبد خرید از حافظه...');
    
    try {
        const savedCart = localStorage.getItem('shop_cart');
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log(`✅ ${cart.length} آیتم از حافظه بارگذاری شد`);
        } else {
            cart = [];
            console.log('✅ سبد خرید جدید ایجاد شد');
        }
    } catch (error) {
        console.error('❌ خطا در بارگذاری سبد خرید:', error);
        cart = [];
    }
}

function addProductToCart(productId) {
    console.log(`➕ افزودن محصول ${productId} به سبد`);
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        showMessage('محصول یافت نشد!', 'error');
        return;
    }
    
    if (product.stock === 0) {
        showMessage('این محصول موجود نیست!', 'error');
        return;
    }
    
    // بررسی وجود محصول در سبد
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showMessage(`حداکثر ${product.stock} عدد قابل خرید است`, 'error');
            return;
        }
        existingItem.quantity += 1;
        console.log(`📈 تعداد افزایش یافت: ${existingItem.quantity}`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            stock: product.stock
        });
        console.log(`🆕 محصول جدید اضافه شد: ${product.name}`);
    }
    
    // به‌روزرسانی نمایش
    updateCartDisplay();
    
    // ذخیره در حافظه
    saveCartToStorage();
    
    // نمایش پیام
    showMessage(`"${product.name}" به سبد اضافه شد`, 'success');
    
    // انیمیشن دکمه سبد
    animateCartButton();
}

function updateCartDisplay() {
    console.log('🔄 به‌روزرسانی نمایش سبد خرید');
    
    // 1. به‌روزرسانی شمارنده
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log(`🔢 تعداد کل آیتم‌ها: ${totalItems}`);
    }
    
    // 2. به‌روزرسانی آیتم‌های سایدبار
    updateCartSidebar();
}

function updateCartSidebar() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyMessage = document.getElementById('empty-cart-message');
    const summarySection = document.getElementById('cart-summary');
    
    if (!cartItemsContainer) {
        console.warn('⚠️ container آیتم‌های سبد پیدا نشد');
        return;
    }
    
    if (cart.length === 0) {
        // سبد خالی است
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (summarySection) summarySection.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        console.log('🛒 سبد خرید خالی است');
        return;
    }
    
    // سبد خالی نیست
    if (emptyMessage) emptyMessage.style.display = 'none';
    if (summarySection) summarySection.style.display = 'block';
    
    // محاسبه جمع کل
    let total = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString('fa-IR')} افغانی</p>
                    <div class="cart-item-controls">
                        <button onclick="changeCartItemQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="changeCartItemQuantity(${item.id}, 1)" 
                                ${item.quantity >= item.stock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <span>${itemTotal.toLocaleString('fa-IR')}</span>
                    <small>افغانی</small>
                    <button onclick="removeCartItem(${item.id})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    // نمایش آیتم‌ها
    cartItemsContainer.innerHTML = cartHTML;
    
    // نمایش مجموع
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = total.toLocaleString('fa-IR');
    }
    
    console.log(`💰 مجموع سبد: ${total.toLocaleString('fa-IR')} افغانی`);
}

// ==================== توابع کمکی سبد خرید ====================

function changeCartItemQuantity(productId, change) {
    console.log(`🔢 تغییر تعداد محصول ${productId}: ${change > 0 ? '+' : ''}${change}`);
    
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
        removeCartItem(productId);
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
        showMessage(`حداکثر ${product.stock} عدد قابل خرید است`, 'error');
        return;
    }
    
    item.quantity = newQuantity;
    updateCartDisplay();
    saveCartToStorage();
    
    // برای اطمینان از باز ماندن سایدبار
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar && !sidebar.classList.contains('active')) {
        sidebar.classList.add('active');
    }
}

function removeCartItem(productId) {
    console.log(`🗑️ حذف محصول ${productId} از سبد`);
    
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
    showMessage('محصول از سبد حذف شد', 'info');
}

function saveCartToStorage() {
    try {
        localStorage.setItem('shop_cart', JSON.stringify(cart));
        console.log('💾 سبد خرید ذخیره شد');
    } catch (error) {
        console.error('❌ خطا در ذخیره سبد خرید:', error);
    }
}

// ==================== توابع UI ====================

function setupEventListeners() {
    console.log('🔗 تنظیم رویدادها...');
    
    // 1. دکمه‌های دسته‌بندی
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProductsByCategory(category);
        });
    });
    
    // 2. جستجو
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }
    
    // 3. دکمه سبد خرید
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCartSidebar);
    }
    
    // 4. بستن سبد خرید با کلیک بیرون
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('cart-sidebar');
        const toggleBtn = document.querySelector('.cart-toggle');
        
        if (sidebar && sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) && 
            !toggleBtn.contains(event.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    console.log('✅ رویدادها تنظیم شدند');
}

function filterProductsByCategory(category) {
    console.log(`🔍 فیلتر محصولات: ${category}`);
    
    currentCategory = category;
    
    // به‌روزرسانی دکمه فعال
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === category);
    });
    
    // فیلتر محصولات
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    console.log(`📊 تعداد محصولات فیلتر شده: ${filteredProducts.length}`);
    renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(filteredProducts) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>محصولی در این دسته‌بندی یافت نشد</h3>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        container.innerHTML += createProductHTML(product);
    });
}

function searchProducts(query) {
    console.log(`🔎 جستجو برای: "${query}"`);
    
    if (!query.trim()) {
        renderFilteredProducts(products);
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    console.log(`📊 نتایج جستجو: ${results.length} محصول`);
    renderFilteredProducts(results);
}

function toggleCartSidebar() {
    console.log('🔘 کلیک روی سبد خرید');
    
    const sidebar = document.getElementById('cart-sidebar');
    if (!sidebar) return;
    
    const isOpening = !sidebar.classList.contains('active');
    sidebar.classList.toggle('active');
    
    if (isOpening) {
        document.body.style.overflow = 'hidden';
        console.log('📖 سبد خرید باز شد');
    } else {
        document.body.style.overflow = 'auto';
        console.log('📕 سبد خرید بسته شد');
    }
}

function animateCartButton() {
    const cartBtn = document.querySelector('.cart-toggle');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

// ==================== توابع پیام و نوتیفیکیشن ====================

function showMessage(message, type = 'success') {
    console.log(`📢 پیام [${type}]: ${message}`);
    
    // حذف پیام‌های قبلی
    const oldMessages = document.querySelectorAll('.shop-message');
    oldMessages.forEach(msg => msg.remove());
    
    // ایجاد پیام جدید
    const messageDiv = document.createElement('div');
    messageDiv.className = `shop-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${getMessageIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // استایل‌دهی
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getMessageColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: messageSlideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    // حذف خودکار
    setTimeout(() => {
        messageDiv.style.animation = 'messageSlideOut 0.3s ease forwards';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

function getMessageIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || 'fa-info-circle';
}

function getMessageColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    return colors[type] || '#3498db';
}

// ==================== حالت اضطراری ====================

function emergencyMode() {
    console.error('🚨 فعال کردن حالت اضطراری');
    
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="emergency-mode">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>مشکلی در بارگذاری محصولات پیش آمد</h3>
            <p>لطفاً صفحه را رفرش کنید یا بعداً مراجعه نمایید</p>
            <button onclick="window.location.reload()" class="emergency-btn">
                <i class="fas fa-redo"></i> رفرش صفحه
            </button>
        </div>
    `;
}

// ==================== افزودن استایل‌های ضروری ====================

function addProductStyles() {
    // بررسی وجود استایل‌ها
    if (document.getElementById('shop-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'shop-styles';
    styles.textContent = `
        /* استایل‌های پایه */
        .product-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
        }
        
        .product-image-container {
            height: 200px;
            overflow: hidden;
        }
        
        .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .product-info {
            padding: 15px;
        }
        
        .product-title {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #333;
        }
        
        .product-description {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .product-price {
            font-size: 1.3rem;
            color: #27ae60;
            font-weight: bold;
        }
        
        .add-to-cart-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .add-to-cart-btn:hover:not(.disabled) {
            background: #2980b9;
        }
        
        .add-to-cart-btn.disabled {
            background: #95a5a6;
            cursor: not-allowed;
        }
        
        /* استایل‌های انیمیشن */
        @keyframes messageSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes messageSlideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        /* حالت‌های اضطراری */
        .no-products, .emergency-mode {
            text-align: center;
            padding: 50px 20px;
            grid-column: 1 / -1;
        }
        
        .no-products i, .emergency-mode i {
            font-size: 4rem;
            color: #ddd;
            margin-bottom: 20px;
        }
        
        .emergency-btn {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(styles);
    console.log('🎨 استایل‌های ضروری اضافه شدند');
}

// ==================== توابع عمومی ====================

// تابع برای باز کردن سبد خرید از خارج
window.openCart = function() {
    toggleCartSidebar();
};

// تابع برای بازنشانی کامل
window.resetShop = function() {
    if (confirm('آیا می‌خواهید تمام داده‌های فروشگاه را پاک کنید؟')) {
        localStorage.clear();
        location.reload();
    }
};

// تابع برای دیباگ
window.debugShop = function() {
    console.group('🔧 دیباگ فروشگاه');
    console.log('📦 محصولات:', products);
    console.log('🛒 سبد خرید:', cart);
    console.log('🎯 دسته فعلی:', currentCategory);
    console.log('💾 محصولات در حافظه:', localStorage.getItem('shop_products'));
    console.log('💾 سبد در حافظه:', localStorage.getItem('shop_cart'));
    console.groupEnd();
    
    showMessage('اطلاعات دیباگ در کنسول نمایش داده شد', 'info');
};

// ==================== راه‌اندازی نهایی ====================

// نمایش پیام خوشامدگویی
setTimeout(() => {
    console.log('🛍️ فروشگاه آنلاین آماده است!');
    showMessage('به فروشگاه آنلاین دکان خوش آمدید!', 'success');
}, 1000);

// ذخیره خودکار هر 30 ثانیه
setInterval(() => {
    try {
        localStorage.setItem('shop_cart', JSON.stringify(cart));
    } catch (e) {
        console.warn('⚠️ خطا در ذخیره خودکار');
    }
}, 30000);


