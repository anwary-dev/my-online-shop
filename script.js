// ==============================================
// script.js - فروشگاه آنلاین دکان
// نسخه کامل و منظم - ۱۴۰۳
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

// ==================== بارگذاری داده‌ها ====================

function loadInitialData() {
    console.log('📂 بارگذاری داده‌های اولیه...');
    
    // بارگذاری محصولات از localStorage
    loadProductsFromStorage();
    
    // بارگذاری سبد خرید از localStorage
    loadCartFromStorage();
    
    // اگر محصولی وجود نداشت، نمونه‌ها را بارگذاری کن
    if (products.length === 0) {
        loadSampleProducts();
    }
}

function loadProductsFromStorage() {
    try {
        const savedProducts = localStorage.getItem('shop_products');
        if (savedProducts) {
            products = JSON.parse(savedProducts);
            console.log(`✅ ${products.length} محصول از حافظه بارگذاری شد`);
        } else {
            products = [];
            console.log('ℹ️ هیچ محصولی در حافظه یافت نشد');
        }
    } catch (error) {
        console.error('❌ خطا در بارگذاری محصولات:', error);
        products = [];
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('shop_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log(`✅ ${cart.length} آیتم در سبد خرید بارگذاری شد`);
        } else {
            cart = [];
            console.log('ℹ️ سبد خرید خالی است');
        }
    } catch (error) {
        console.error('❌ خطا در بارگذاری سبد خرید:', error);
        cart = [];
    }
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
    saveProductsToStorage();
}

function saveProductsToStorage() {
    try {
        localStorage.setItem('shop_products', JSON.stringify(products));
        console.log('💾 محصولات در حافظه ذخیره شد');
    } catch (error) {
        console.error('❌ خطا در ذخیره محصولات:', error);
    }
}

// ==================== مدیریت محصولات ====================

function displayProducts() {
    console.log('🎨 نمایش محصولات...');
    
    const container = document.getElementById('products-container');
    if (!container) {
        console.error('❌ المنت products-container یافت نشد');
        return;
    }
    
    // پاک کردن container
    container.innerHTML = '';
    
    // اگر محصولی وجود ندارد
    if (products.length === 0) {
        container.innerHTML = createNoProductsMessage();
        return;
    }
    
    // فیلتر محصولات بر اساس دسته‌بندی
    const filteredProducts = getFilteredProducts();
    
    // اگر بعد از فیلتر محصولی نماند
    if (filteredProducts.length === 0) {
        container.innerHTML = createNoProductsInCategoryMessage();
        return;
    }
    
    // نمایش محصولات فیلتر شده
    filteredProducts.forEach(product => {
        const productHTML = createProductHTML(product);
        container.innerHTML += productHTML;
    });
    
    console.log(`✅ ${filteredProducts.length} محصول نمایش داده شد`);
}

function getFilteredProducts() {
    if (currentCategory === 'all') {
        return products;
    }
    return products.filter(product => product.category === currentCategory);
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
    saveCartToStorage();
    showNotification(`"${product.name}" به سبد خرید اضافه شد`, 'success');
    animateCartButton();
}

function removeFromCart(productId) {
    console.log(`🗑️ حذف محصول ${productId} از سبد`);
    
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
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
    saveCartToStorage();
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
    const subtotalElement = document.getElementById('subtotal-price');
    
    if (!totalElement && !subtotalElement) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (totalElement) {
        totalElement.textContent = total.toLocaleString('fa-IR');
    }
    
    if (subtotalElement) {
        subtotalElement.textContent = total.toLocaleString('fa-IR');
    }
}

function toggleEmptyCartMessage() {
    const emptyMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!emptyMessage || !cartSummary) return;
    
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        cartSummary.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        cartSummary.style.display = 'block';
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('shop_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('❌ خطا در ذخیره سبد خرید:', error);
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
    
    // رویدادهای فرم سفارش
    setupOrderForm();
    
    console.log('✅ رویدادها تنظیم شدند');
}

function setupCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
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
    const cartClose = document.querySelector('.cart-close');
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }
    
    // دکمه پاک کردن سبد خرید
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    // دکمه تکمیل سفارش
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // کلیک بیرون از سبد خرید برای بستن
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggle = document.querySelector('.cart-toggle');
        
        if (isCartOpen && cartSidebar && 
            !cartSidebar.contains(e.target) && 
            !cartToggle.contains(e.target)) {
            toggleCart();
        }
    });
}

function setupOrderForm() {
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }
}

// ==================== توابع UI ====================

function filterProducts(category) {
    console.log(`🔍 فیلتر محصولات: ${category}`);
    
    currentCategory = category;
    
    // به‌روزرسالی دکمه فعال
    updateActiveCategoryButton(category);
    
    // نمایش محصولات فیلتر شده
    displayProducts();
    
    // اسکرول به بخش محصولات
    scrollToProducts();
}

function updateActiveCategoryButton(activeCategory) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === activeCategory) {
            btn.classList.add('active');
        }
    });
}

function searchProducts(query) {
    console.log(`🔎 جستجو: "${query}"`);
    
    if (!query.trim()) {
        displayProducts();
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const container = document.getElementById('products-container');
    if (!container) return;
    
    const results = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <h3>هیچ محصولی با عبارت "${query}" یافت نشد</h3>
                <button class="btn" onclick="clearSearch()">
                    <i class="fas fa-times"></i> پاک کردن جستجو
                </button>
            </div>
        `;
        return;
    }
    
    results.forEach(product => {
        container.innerHTML += createProductHTML(product);
    });
}

function clearSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    searchProducts('');
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

function clearCart() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!', 'info');
        return;
    }
    
    if (confirm('آیا از خالی کردن سبد خرید اطمینان دارید؟')) {
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        showNotification('سبد خرید خالی شد', 'success');
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
    const orderFormHTML = `
        <div class="order-form-container">
            <div class="order-form-header">
                <h3><i class="fas fa-clipboard-list"></i> تکمیل اطلاعات سفارش</h3>
                <button class="close-form-btn" onclick="closeOrderForm()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="order-summary">
                <h4><i class="fas fa-shopping-cart"></i> خلاصه سفارش</h4>
                <div class="order-items">
                    ${cart.map(item => `
                        <div class="order-item">
                            <span>${item.name}</span>
                            <span>${item.quantity} × ${item.price.toLocaleString('fa-IR')}</span>
                            <span>${(item.price * item.quantity).toLocaleString('fa-IR')} افغانی</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <span>مبلغ قابل پرداخت:</span>
                    <span class="total-amount">${totalAmount.toLocaleString('fa-IR')} افغانی</span>
                </div>
            </div>
            
            <form id="customer-form">
                <div class="form-group">
                    <label for="customer-name"><i class="fas fa-user"></i> نام کامل:</label>
                    <input type="text" id="customer-name" required placeholder="نام و نام خانوادگی">
                </div>
                
                <div class="form-group">
                    <label for="customer-phone"><i class="fas fa-phone"></i> شماره تماس:</label>
                    <input type="tel" id="customer-phone" required placeholder="09xxxxxxxxx" pattern="09[0-9]{9}">
                </div>
                
                <div class="form-group">
                    <label for="customer-address"><i class="fas fa-map-marker-alt"></i> آدرس تحویل:</label>
                    <textarea id="customer-address" required rows="3" placeholder="آدرس کامل"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="customer-note"><i class="fas fa-sticky-note"></i> یادداشت (اختیاری):</label>
                    <textarea id="customer-note" rows="2" placeholder="یادداشت برای فروشنده"></textarea>
                </div>
                
                <button type="submit" class="btn submit-order-btn">
                    <i class="fas fa-paper-plane"></i> ثبت نهایی سفارش
                </button>
            </form>
        </div>
    `;
    
    const formContainer = document.getElementById('order-form-container');
    if (formContainer) {
        formContainer.innerHTML = orderFormHTML;
        formContainer.style.display = 'block';
        
        // تنظیم رویداد فرم
        document.getElementById('customer-form').addEventListener('submit', submitOrder);
    }
}

function closeOrderForm() {
    const formContainer = document.getElementById('order-form-container');
    if (formContainer) {
        formContainer.style.display = 'none';
    }
}

function submitOrder(e) {
    if (e) e.preventDefault();
    
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
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
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
    saveCartToStorage();
    
    // بستن فرم
    closeOrderForm();
    
    // نمایش پیام موفقیت
    showSuccessOrderMessage(order);
}

function saveOrder(order) {
    try {
        // بارگذاری سفارشات موجود
        let orders = JSON.parse(localStorage.getItem('shop_orders') || '[]');
        
        // اضافه کردن سفارش جدید
        orders.push(order);
        
        // ذخیره در localStorage
        localStorage.setItem('shop_orders', JSON.stringify(orders));
        
        console.log(`✅ سفارش #${order.id} ذخیره شد`);
        
        // همگام‌سازی با پنل مدیریت
        localStorage.setItem('shop_orders_admin', JSON.stringify(orders));
        
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
    
    saveProductsToStorage();
    displayProducts();
}

function showSuccessOrderMessage(order) {
    const message = `
        <div class="success-order">
            <i class="fas fa-check-circle"></i>
            <h3>سفارش شما با موفقیت ثبت شد!</h3>
            <p>شماره سفارش: <strong>#${order.id}</strong></p>
            <p>مبلغ قابل پرداخت: <strong>${order.total.toLocaleString('fa-IR')} افغانی</strong></p>
            <p>وضعیت: <span class="status-pending">در انتظار تأیید</span></p>
            <div class="order-actions">
                <button class="btn" onclick="printOrder(${order.id})">
                    <i class="fas fa-print"></i> چاپ فاکتور
                </button>
                <button class="btn btn-secondary" onclick="closeSuccessMessage()">
                    <i class="fas fa-times"></i> بستن
                </button>
            </div>
        </div>
    `;
    
    const messageContainer = document.getElementById('success-message-container');
    if (messageContainer) {
        messageContainer.innerHTML = message;
        messageContainer.style.display = 'block';
    }
}

function closeSuccessMessage() {
    const container = document.getElementById('success-message-container');
    if (container) {
        container.style.display = 'none';
    }
}

function printOrder(orderId) {
    // این تابع می‌تواند برای چاپ فاکتور توسعه یابد
    alert(`چاپ فاکتور سفارش #${orderId}`);
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
    const color = getNotificationColor(type);
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        max-width: 400px;
    `;
    
    notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
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

function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db',
        warning: '#f39c12'
    };
    return colors[type] || '#3498db';
}

function removeNotification(notification) {
    if (!notification || !notification.parentNode) return;
    
    notification.style.animation = 'slideOut 0.3s ease forwards';
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

function addStylesToPage() {
    const styleId = 'shop-dynamic-styles';
    if (document.getElementById(styleId)) return;
    
    const styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .shop-notification {
            animation: slideIn 0.3s ease;
        }
        
        .shop-notification.slide-out {
            animation: slideOut 0.3s ease forwards;
        }
        
        .product-card {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(styles);
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

// اضافه کردن استایل‌های داینامیک
addStylesToPage();

// ذخیره خودکار هر 30 ثانیه
setInterval(() => {
    try {
        localStorage.setItem('shop_cart', JSON.stringify(cart));
    } catch (error) {
        console.warn('⚠️ خطا در ذخیره خودکار سبد خرید');
    }
}, 30000);
