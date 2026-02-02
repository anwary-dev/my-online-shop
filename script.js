// ==============================================
// script.js - فروشگاه آنلاین دکان
// نسخه کامل و هماهنگ با index.html
// ==============================================

// ==================== متغیرهای سراسری ====================
let products = [];
let cart = [];
let currentCategory = 'all';
let isCartOpen = false;

// ==================== راه‌اندازی اولیه ====================

// اجرا پس از بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 فروشگاه آنلاین در حال راه‌اندازی...');
    
    try {
        // 1. بارگذاری داده‌ها
        loadInitialData();
        
        // 2. تنظیم رویدادها
        setupEventListeners();
        
        // 3. نمایش محصولات
        displayProducts();
        
        // 4. به‌روزرسانی سبد خرید
        updateCartDisplay();
        
        // 5. نمایش پیام خوشامد
        setTimeout(() => {
            showNotification('به فروشگاه آنلاین دکان خوش آمدید! 🛍️', 'success');
        }, 1000);
        
        console.log('✅ فروشگاه با موفقیت راه‌اندازی شد');
        
    } catch (error) {
        console.error('❌ خطا در راه‌اندازی:', error);
        emergencyMode();
    }
});

// ==================== توابع کمکی localStorage ====================

function saveToStorage() {
    try {
        localStorage.setItem('shop_products', JSON.stringify(products));
        localStorage.setItem('shop_cart', JSON.stringify(cart));
        console.log('💾 داده‌ها ذخیره شدند');
        return true;
    } catch (error) {
        console.error('❌ خطا در ذخیره داده‌ها:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('❌ خطا در خواندن داده‌ها:', error);
        return null;
    }
}

// ==================== بارگذاری داده‌ها ====================

function loadInitialData() {
    console.log('📂 بارگذاری داده‌های اولیه...');
    
    // بارگذاری محصولات از localStorage
    const savedProducts = getFromStorage('shop_products');
    products = savedProducts || [];
    
    // بارگذاری سبد خرید از localStorage
    const savedCart = getFromStorage('shop_cart');
    cart = savedCart || [];
    
    // اگر محصولی وجود نداشت، نمونه‌ها را بارگذاری کن
    if (products.length === 0) {
        loadSampleProducts();
    }
    
    console.log(`📊 ${products.length} محصول و ${cart.length} آیتم در سبد خرید بارگذاری شد`);
}

function loadSampleProducts() {
    console.log('🛠️ بارگذاری محصولات نمونه...');
    
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
    
    console.log(`✅ ${products.length} محصول نمونه بارگذاری شد`);
    saveToStorage();
}

// ==================== نمایش محصولات ====================

function displayProducts(productList = null) {
    console.log('🎨 نمایش محصولات...');
    
    const container = document.getElementById('products-container');
    if (!container) {
        console.error('❌ المنت products-container یافت نشد');
        return;
    }
    
    // پاک کردن container
    container.innerHTML = '';
    
    // تعیین لیست محصولات برای نمایش
    let productsToShow = productList;
    
    if (!productsToShow) {
        productsToShow = currentCategory === 'all' 
            ? products 
            : products.filter(p => p.category === currentCategory);
    }
    
    // اگر محصولی وجود ندارد
    if (productsToShow.length === 0) {
        container.innerHTML = createNoProductsMessage();
        return;
    }
    
    // نمایش محصولات
    productsToShow.forEach(product => {
        const productHTML = createProductHTML(product);
        container.innerHTML += productHTML;
    });
    
    console.log(`✅ ${productsToShow.length} محصول نمایش داده شد`);
}

function createProductHTML(product) {
    const isOutOfStock = product.stock === 0;
    const stockClass = getStockClass(product.stock);
    const stockText = getStockText(product.stock);
    
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
                    <span>${stockText}</span>
                </div>
                
                <div class="product-footer">
                    <div class="product-price">
                        <span class="price-value">${product.price.toLocaleString('fa-IR')}</span>
                        <span class="price-unit">افغانی</span>
                    </div>
                    
                    <button class="add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
                            onclick="addToCart(${product.id})"
                            ${isOutOfStock ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i>
                        ${isOutOfStock ? 'ناموجود' : 'خرید'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getStockClass(stock) {
    if (stock > 10) return 'in-stock';
    if (stock > 0) return 'low-stock';
    return 'out-of-stock';
}

function getStockText(stock) {
    if (stock > 10) return `موجود (${stock} عدد)`;
    if (stock > 0) return `آخرین موجودی (${stock} عدد)`;
    return 'ناموجود';
}

function createNoProductsMessage() {
    return `
        <div class="no-products">
            <i class="fas fa-box-open"></i>
            <h3>هیچ محصولی یافت نشد</h3>
            <p>لطفاً بعداً مجدداً بررسی کنید</p>
        </div>
    `;
}

function createNoProductsInCategoryMessage() {
    return `
        <div class="no-products">
            <i class="fas fa-search"></i>
            <h3>محصولی در این دسته‌بندی یافت نشد</h3>
            <button class="btn" onclick="filterProducts('all')">
                <i class="fas fa-eye"></i> مشاهده همه محصولات
            </button>
        </div>
    `;
}

// ==================== مدیریت سبد خرید ====================

function addToCart(productId) {
    console.log(`➕ افزودن محصول ${productId} به سبد`);
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('محصول یافت نشد!', 'error');
        return;
    }
    
    if (product.stock === 0) {
        showNotification('این محصول موجود نیست!', 'error');
        return;
    }
    
    // بررسی وجود محصول در سبد
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // بررسی موجودی کافی
        if (existingItem.quantity >= product.stock) {
            showNotification(`حداکثر ${product.stock} عدد از این محصول قابل خرید است!`, 'error');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            stock: product.stock
        });
    }
    
    updateCartDisplay();
    saveToStorage();
    showNotification(`"${product.name}" به سبد خرید اضافه شد`, 'success');
    animateCartButton();
}

function removeFromCart(productId) {
    console.log(`🗑️ حذف محصول ${productId} از سبد`);
    
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveToStorage();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

function changeCartQuantity(productId, change) {
    console.log(`🔢 تغییر تعداد محصول ${productId}: ${change > 0 ? '+' : ''}${change}`);
    
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
    updateCartDisplay();
    saveToStorage();
}

function updateCartDisplay() {
    console.log('🔄 به‌روزرسانی نمایش سبد خرید');
    
    // 1. به‌روزرسانی شمارنده
    updateCartCount();
    
    // 2. به‌روزرسانی آیتم‌های سبد
    updateCartItems();
    
    // 3. به‌روزرسانی مجموع
    updateCartTotal();
    
    // 4. نمایش/مخفی پیام سبد خالی
    toggleEmptyCartMessage();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p id="empty-cart-message">سبد خرید شما خالی است</p>';
        return;
    }
    
    cart.forEach(item => {
        const itemHTML = createCartItemHTML(item);
        cartItemsContainer.innerHTML += itemHTML;
    });
}

function createCartItemHTML(item) {
    const itemTotal = item.price * item.quantity;
    
    return `
        <div class="cart-item">
            <img src="${item.image}" 
                 alt="${item.name}" 
                 class="cart-item-image"
                 onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'">
            
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">${item.price.toLocaleString('fa-IR')} افغانی</p>
                
                <div class="cart-item-quantity">
                    <button onclick="changeCartQuantity(${item.id}, -1)" class="quantity-btn minus">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-number">${item.quantity}</span>
                    <button onclick="changeCartQuantity(${item.id}, 1)" 
                            class="quantity-btn plus"
                            ${item.quantity >= item.stock ? 'disabled' : ''}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            
            <div class="cart-item-total">
                ${itemTotal.toLocaleString('fa-IR')}
                <small>افغانی</small>
                <button onclick="removeFromCart(${item.id})" class="remove-item-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function updateCartTotal() {
    const totalElement = document.getElementById('total-price');
    if (!totalElement) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = total.toLocaleString('fa-IR');
}

function toggleEmptyCartMessage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItemsContainer || !cartSummary) return;
    
    if (cart.length === 0) {
        cartSummary.style.display = 'none';
    } else {
        cartSummary.style.display = 'block';
    }
}

// ==================== UI و رویدادها ====================

function setupEventListeners() {
    console.log('🔗 تنظیم رویدادها...');
    
    // رویدادهای دسته‌بندی
    setupCategoryButtons();
    
    // رویداد جستجو
    setupSearch();
    
    // رویدادهای سبد خرید
    setupCartEvents();
    
    console.log('✅ رویدادها تنظیم شدند');
}

function setupCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // حذف active از همه دکمه‌ها
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // اضافه کردن active به دکمه کلیک شده
            this.classList.add('active');
            
            // فیلتر محصولات
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts(this.value);
            }
        });
    }
}

function setupCartEvents() {
    // دکمه باز کردن/بستن سبد خرید
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
    }
    
    // دکمه بستن سبد خرید
    const cartClose = document.querySelector('.close-cart');
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }
    
    // دکمه تکمیل سفارش
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
}

// ==================== توابع UI ====================

function filterProducts(category) {
    console.log(`🔍 فیلتر محصولات: ${category}`);
    
    currentCategory = category;
    displayProducts();
    
    // اسکرول به بخش محصولات
    scrollToProducts();
}

function searchProducts(query) {
    console.log(`🔎 جستجو: "${query}"`);
    
    if (!query.trim()) {
        displayProducts();
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(results);
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================== مدیریت سبد خرید UI ====================

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (!cartSidebar) return;
    
    isCartOpen = !cartSidebar.classList.contains('active');
    
    if (isCartOpen) {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('📖 سبد خرید باز شد');
    } else {
        cartSidebar.classList.remove('active');
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

// ==================== سیستم سفارش‌دهی ====================

function checkout() {
    console.log('🚀 شروع فرآیند سفارش');
    
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!', 'error');
        return;
    }
    
    // محاسبه جمع کل
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // نمایش فرم سفارش
    showOrderForm(total);
}

function showOrderForm(totalAmount) {
    // ایجاد modal برای فرم سفارش
    const modalHTML = `
        <div class="modal-overlay" id="order-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-clipboard-list"></i> تکمیل سفارش</h3>
                    <button class="close-modal" onclick="closeOrderForm()">×</button>
                </div>
                
                <div class="order-summary">
                    <h4><i class="fas fa-shopping-cart"></i> خلاصه سفارش</h4>
                    <div class="order-items">
                        ${cart.map(item => `
                            <div class="order-item">
                                <span>${item.name}</span>
                                <span>${item.quantity} × ${item.price.toLocaleString('fa-IR')} افغانی</span>
                                <span>${(item.price * item.quantity).toLocaleString('fa-IR')} افغانی</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <span>مبلغ قابل پرداخت:</span>
                        <span class="total-amount">${totalAmount.toLocaleString('fa-IR')} افغانی</span>
                    </div>
                </div>
                
                <form id="customer-form" onsubmit="submitOrder(event)">
                    <div class="form-group">
                        <label for="customer-name"><i class="fas fa-user"></i> نام کامل:</label>
                        <input type="text" id="customer-name" required placeholder="نام و نام خانوادگی">
                    </div>
                    
                    <div class="form-group">
                        <label for="customer-phone"><i class="fas fa-phone"></i> شماره تماس:</label>
                        <input type="tel" id="customer-phone" required placeholder="09xxxxxxxxx">
                    </div>
                    
                    <div class="form-group">
                        <label for="customer-address"><i class="fas fa-map-marker-alt"></i> آدرس تحویل:</label>
                        <textarea id="customer-address" required rows="3" placeholder="آدرس کامل"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer-note"><i class="fas fa-sticky-note"></i> یادداشت (اختیاری):</label>
                        <textarea id="customer-note" rows="2" placeholder="یادداشت برای فروشنده"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeOrderForm()">انصراف</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> ثبت نهایی سفارش
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // اضافه کردن modal به صفحه
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);
}

function closeOrderForm() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.remove();
    }
}

function submitOrder(event) {
    event.preventDefault();
    
    console.log('📝 ثبت سفارش جدید');
    
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const note = document.getElementById('customer-note').value.trim();
    
    // اعتبارسنجی
    if (!name || !phone || !address) {
        showNotification('لطفاً اطلاعات ضروری را وارد کنید', 'error');
        return;
    }
    
    // ایجاد سفارش
    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString('fa-IR'),
        customer: { name, phone, address, note },
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        status: 'در انتظار تأیید'
    };
    
    // ذخیره سفارش
    saveOrder(order);
    
    // کاهش موجودی محصولات
    updateProductStock();
    
    // خالی کردن سبد خرید
    cart = [];
    updateCartDisplay();
    saveToStorage();
    
    // بستن فرم
    closeOrderForm();
    
    // نمایش پیام موفقیت
    showSuccessOrderMessage(order);
}

function saveOrder(order) {
    try {
        // بارگذاری سفارشات موجود
        let orders = getFromStorage('shop_orders') || [];
        
        // اضافه کردن سفارش جدید
        orders.push(order);
        
        // ذخیره در localStorage
        localStorage.setItem('shop_orders', JSON.stringify(orders));
        
        console.log(`✅ سفارش #${order.id} ذخیره شد`);
        
    } catch (error) {
        console.error('❌ خطا در ذخیره سفارش:', error);
    }
}

function updateProductStock() {
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.quantity;
            if (product.stock < 0) product.stock = 0;
        }
    });
    
    saveToStorage();
    displayProducts();
}

function showSuccessOrderMessage(order) {
    const messageHTML = `
        <div class="modal-overlay" id="success-modal">
            <div class="modal-content success-modal">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>سفارش شما با موفقیت ثبت شد!</h3>
                <div class="order-details">
                    <p><strong>شماره سفارش:</strong> #${order.id}</p>
                    <p><strong>مبلغ قابل پرداخت:</strong> ${order.total.toLocaleString('fa-IR')} افغانی</p>
                    <p><strong>وضعیت:</strong> <span class="status-pending">در انتظار تأیید</span></p>
                    <p><strong>زمان ثبت:</strong> ${order.date}</p>
                </div>
                <div class="success-actions">
                    <button class="btn btn-primary" onclick="printOrder(${order.id})">
                        <i class="fas fa-print"></i> چاپ فاکتور
                    </button>
                    <button class="btn btn-secondary" onclick="closeSuccessMessage()">
                        <i class="fas fa-times"></i> بستن
                    </button>
                </div>
                <p class="success-note">کارشناسان ما به زودی با شما تماس خواهند گرفت.</p>
            </div>
        </div>
    `;
    
    const messageContainer = document.createElement('div');
    messageContainer.innerHTML = messageHTML;
    document.body.appendChild(messageContainer.firstElementChild);
}

function closeSuccessMessage() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.remove();
    }
}

function printOrder(orderId) {
    // این تابع می‌تواند برای چاپ فاکتور توسعه یابد
    showNotification(`امکان چاپ فاکتور سفارش #${orderId} در نسخه‌های آینده اضافه خواهد شد`, 'info');
}

// ==================== نوتیفیکیشن ====================

function showNotification(message, type = 'success') {
    console.log(`📢 [${type}]: ${message}`);
    
    // حذف نوتیفیکیشن‌های قبلی
    removeExistingNotifications();
    
    // ایجاد نوتیفیکیشن جدید
    const notification = createNotificationElement(message, type);
    document.body.appendChild(notification);
    
    // حذف خودکار پس از 3 ثانیه
    setTimeout(() => removeNotification(notification), 3000);
}

function removeExistingNotifications() {
    document.querySelectorAll('.shop-notification').forEach(n => n.remove());
}

function createNotificationElement(message, type) {
    const notification = document.createElement('div');
    notification.className = `shop-notification ${type}`;
    
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    return notification;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || 'fa-info-circle';
}

function removeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ==================== توابع کمکی ====================

function emergencyMode() {
    console.error('🚨 فعال کردن حالت اضطراری');
    
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="emergency-mode">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>خطا در بارگذاری فروشگاه</h3>
            <p>لطفاً صفحه را رفرش کنید یا بعداً مراجعه نمایید</p>
            <button onclick="window.location.reload()" class="btn">
                <i class="fas fa-redo"></i> رفرش صفحه
            </button>
        </div>
    `;
}

// ==================== توابع عمومی ====================

// تابع برای باز کردن سبد خرید از خارج
window.openCart = function() {
    toggleCart();
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
    console.log('📝 سفارشات:', JSON.parse(localStorage.getItem('shop_orders') || '[]'));
    console.groupEnd();
    
    showNotification('اطلاعات دیباگ در کنسول نمایش داده شد', 'info');
};

// ==================== اجرای نهایی ====================

// ذخیره خودکار هر 30 ثانیه
setInterval(() => {
    try {
        saveToStorage();
    } catch (error) {
        console.warn('⚠️ خطا در ذخیره خودکار');
    }
}, 30000);
