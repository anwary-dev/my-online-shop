// ==============================================
// script.js - فروشگاه آنلاین دکان - نسخه اصلاح شده
// ==============================================

// ==================== متغیرهای سراسری ====================
let products = [];
let cart = [];
let currentCategory = 'all';
let isCartOpen = false;

// ==================== توابع کمکی ====================

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) {
        console.error('❌ المنت cart-count پیدا نشد!');
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    console.log(`🔢 تعداد آیتم‌ها در سبد: ${totalItems}`);
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) {
        console.error('❌ المنت cart-items پیدا نشد!');
        return;
    }
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p id="empty-cart-message">سبد خرید شما خالی است</p>';
        return;
    }
    
    let itemsHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        itemsHTML += `
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
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
}

function updateCartTotal() {
    const totalElement = document.getElementById('total-price');
    if (!totalElement) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = total.toLocaleString('fa-IR');
}

function toggleCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    if (!cartSummary) return;
    
    if (cart.length === 0) {
        cartSummary.style.display = 'none';
    } else {
        cartSummary.style.display = 'block';
    }
}

// ==================== راه‌اندازی اولیه ====================

// اجرا پس از بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 فروشگاه آنلاین در حال راه‌اندازی...');
    
    try {
        // 1. بارگذاری داده‌ها
        loadInitialData();
        
        // 2. نمایش محصولات
        displayProducts();
        
        // 3. به‌روزرسانی سبد خرید
        updateCartDisplay();
        
        // 4. تنظیم رویدادها
        setTimeout(setupEventListeners, 100);
        
        console.log('✅ فروشگاه با موفقیت راه‌اندازی شد');
        
    } catch (error) {
        console.error('❌ خطا در راه‌اندازی:', error);
        showNotification('خطا در بارگذاری فروشگاه', 'error');
    }
});

// ==================== بارگذاری داده‌ها ====================

function loadInitialData() {
    console.log('📂 بارگذاری داده‌های اولیه...');
    
    // بارگذاری محصولات از localStorage
    const savedProducts = localStorage.getItem('shop_products');
    if (savedProducts) {
        try {
            products = JSON.parse(savedProducts);
            console.log(`✅ ${products.length} محصول بارگذاری شد`);
        } catch (error) {
            console.error('خطا در بارگذاری محصولات:', error);
            products = [];
        }
    } else {
        products = [];
    }
    
    // بارگذاری سبد خرید از localStorage
    const savedCart = localStorage.getItem('shop_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            console.log(`✅ ${cart.length} آیتم در سبد بارگذاری شد`);
        } catch (error) {
            console.error('خطا در بارگذاری سبد خرید:', error);
            cart = [];
        }
    } else {
        cart = [];
    }
    
    // اگر محصولی نبود، نمونه‌ها را بارگذاری کن
    if (products.length === 0) {
        loadSampleProducts();
    }
}

function loadSampleProducts() {
    console.log('📦 بارگذاری محصولات نمونه...');
    
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
        }
    ];
    
    console.log(`✅ ${products.length} محصول نمونه بارگذاری شد`);
    saveProducts();
}

function saveProducts() {
    try {
        localStorage.setItem('shop_products', JSON.stringify(products));
        console.log('💾 محصولات ذخیره شدند');
    } catch (error) {
        console.error('❌ خطا در ذخیره محصولات:', error);
    }
}

function saveCart() {
    try {
        localStorage.setItem('shop_cart', JSON.stringify(cart));
        console.log('💾 سبد خرید ذخیره شد');
    } catch (error) {
        console.error('❌ خطا در ذخیره سبد خرید:', error);
    }
}

// ==================== تنظیم رویدادها ====================

function setupEventListeners() {
    console.log('🔗 تنظیم رویدادها...');
    
    // 1. دکمه سبد خرید
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
        console.log('✅ دکمه سبد خرید متصل شد');
    } else {
        console.error('❌ دکمه سبد خرید پیدا نشد!');
    }
    
    // 2. دکمه بستن سبد خرید
    const closeCartBtn = document.querySelector('.close-cart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', toggleCart);
        console.log('✅ دکمه بستن متصل شد');
    }
    
    // 3. دکمه دسته‌بندی‌ها
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // 4. دکمه تکمیل سفارش
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
        console.log('✅ دکمه تکمیل سفارش متصل شد');
    }
    
    // 5. کلیک بیرون از سبد خرید
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggle = document.querySelector('.cart-toggle');
        
        if (isCartOpen && 
            cartSidebar && 
            !cartSidebar.contains(e.target) && 
            cartToggle && 
            !cartToggle.contains(e.target)) {
            toggleCart();
        }
    });
    
    console.log('✅ همه رویدادها تنظیم شدند');
}

// ==================== نمایش محصولات ====================

function displayProducts() {
    console.log('🎨 نمایش محصولات...');
    
    const container = document.getElementById('products-container');
    if (!container) {
        console.error('❌ المنت products-container پیدا نشد!');
        return;
    }
    
    container.innerHTML = '';
    
    // فیلتر محصولات
    let productsToShow = products;
    if (currentCategory !== 'all') {
        productsToShow = products.filter(p => p.category === currentCategory);
    }
    
    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>محصولی یافت نشد</h3>
                <p>لطفاً دسته‌بندی دیگری انتخاب کنید</p>
            </div>
        `;
        return;
    }
    
    // نمایش محصولات
    productsToShow.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });
    
    console.log(`✅ ${productsToShow.length} محصول نمایش داده شد`);
}

function createProductElement(product) {
    const isOutOfStock = product.stock === 0;
    const stockText = product.stock > 10 ? `موجود (${product.stock} عدد)` : 
                     product.stock > 0 ? `آخرین موجودی (${product.stock} عدد)` : 
                     'ناموجود';
    
    const div = document.createElement('div');
    div.className = 'product-card';
    div.setAttribute('data-id', product.id);
    div.setAttribute('data-category', product.category);
    
    div.innerHTML = `
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
            
            <div class="product-stock">
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
    `;
    
    return div;
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
    saveCart();
    showNotification(`"${product.name}" به سبد خرید اضافه شد`, 'success');
    animateCartButton();
}

function removeFromCart(productId) {
    console.log(`🗑️ حذف محصول ${productId} از سبد`);
    
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCart();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

function changeCartQuantity(productId, change) {
    console.log(`🔢 تغییر تعداد محصول ${productId}: ${change}`);
    
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
    saveCart();
}

function updateCartDisplay() {
    console.log('🔄 به‌روزرسانی نمایش سبد خرید');
    
    // 1. به‌روزرسانی شمارنده
    updateCartCount();
    
    // 2. به‌روزرسانی آیتم‌ها
    updateCartItems();
    
    // 3. به‌روزرسانی مجموع
    updateCartTotal();
    
    // 4. نمایش/مخفی خلاصه
    toggleCartSummary();
}

// ==================== توابع UI ====================

function toggleCart() {
    console.log('🔘 کلیک روی سبد خرید');
    
    const cartSidebar = document.getElementById('cart-sidebar');
    if (!cartSidebar) {
        console.error('❌ سبد خرید پیدا نشد!');
        return;
    }
    
    // بررسی وضعیت فعلی
    isCartOpen = !cartSidebar.classList.contains('active');
    
    if (isCartOpen) {
        // باز کردن سبد خرید
        cartSidebar.classList.add('active');
        document.body.classList.add('cart-open');
        updateCartDisplay(); // محتوا را به‌روز کن
        console.log('✅ سبد خرید باز شد');
    } else {
        // بستن سبد خرید
        cartSidebar.classList.remove('active');
        document.body.classList.remove('cart-open');
        console.log('✅ سبد خرید بسته شد');
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

function filterProducts(category) {
    console.log(`🔍 فیلتر محصولات: ${category}`);
    
    currentCategory = category;
    
    // به‌روزرسانی دکمه‌های فعال
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    displayProducts();
    
    // اسکرول به محصولات
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function checkout() {
    console.log('🚀 شروع فرآیند سفارش');
    
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!', 'error');
        return;
    }
    
    // نمایش فرم سفارش
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
            
            <form id="customer-form" onsubmit="submitOrder(event)">
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
    
    // اضافه کردن فرم به صفحه
    const formContainer = document.createElement('div');
    formContainer.innerHTML = orderFormHTML;
    formContainer.style.position = 'fixed';
    formContainer.style.top = '0';
    formContainer.style.right = '0';
    formContainer.style.bottom = '0';
    formContainer.style.left = '0';
    formContainer.style.background = 'rgba(0,0,0,0.7)';
    formContainer.style.zIndex = '3000';
    formContainer.style.display = 'flex';
    formContainer.style.alignItems = 'center';
    formContainer.style.justifyContent = 'center';
    formContainer.style.padding = '20px';
    
    document.body.appendChild(formContainer);
    
    // جلوگیری از اسکرول
    document.body.style.overflow = 'hidden';
}

function closeOrderForm() {
    const formContainer = document.querySelector('.order-form-container').parentElement;
    if (formContainer) {
        formContainer.remove();
        document.body.style.overflow = 'auto';
    }
}

function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const note = document.getElementById('customer-note').value;
    
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
    let orders = JSON.parse(localStorage.getItem('shop_orders') || '[]');
    orders.push(order);
    localStorage.setItem('shop_orders', JSON.stringify(orders));
    
    // خالی کردن سبد خرید
    cart = [];
    updateCartDisplay();
    saveCart();
    
    // بستن فرم
    closeOrderForm();
    
    // نمایش پیام موفقیت
    showSuccessMessage(order);
}

function showSuccessMessage(order) {
    const messageHTML = `
        <div style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0,0,0,0.8); z-index: 4000; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <i class="fas fa-check-circle" style="font-size: 4rem; color: #27ae60; margin-bottom: 20px;"></i>
                <h3 style="color: #2c3e50; margin-bottom: 15px;">سفارش شما با موفقیت ثبت شد!</h3>
                <p style="color: #666; margin-bottom: 10px;">شماره سفارش: <strong>#${order.id}</strong></p>
                <p style="color: #666; margin-bottom: 10px;">مبلغ قابل پرداخت: <strong>${order.total.toLocaleString('fa-IR')} افغانی</strong></p>
                <p style="color: #666; margin-bottom: 25px;">وضعیت: <span style="background: #f39c12; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">در انتظار تأیید</span></p>
                <button class="btn" style="background: #27ae60;" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow='auto';">
                    <i class="fas fa-check"></i> متوجه شدم
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageHTML);
}

// ==================== نوتیفیکیشن ====================

function showNotification(message, type = 'success') {
    console.log(`📢 نوتیفیکیشن: ${message}`);
    
    // حذف نوتیفیکیشن‌های قبلی
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    notification.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i> ${message}`;
    
    // استایل نوتیفیکیشن
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==================== توابع عمومی ====================

// اضافه کردن استایل‌های انیمیشن
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
`;
document.head.appendChild(style);

// ==================== حالت اضطراری ====================

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

// ==================== توابع برای دسترسی از کنسول ====================
window.debugCart = function() {
    console.log('🛒 سبد خرید:', cart);
    console.log('🎯 isCartOpen:', isCartOpen);
    console.log('📦 محصولات:', products.length);
    console.log('🔍 المنت‌ها:');
    console.log('- cart-toggle:', document.querySelector('.cart-toggle'));
    console.log('- cart-sidebar:', document.getElementById('cart-sidebar'));
    console.log('- cart-items:', document.getElementById('cart-items'));
    console.log('- cart-count:', document.getElementById('cart-count'));
    
    // تست نمایش سبد خرید
    if (document.getElementById('cart-sidebar')) {
        console.log('✅ المنت‌های سبد خرید وجود دارند');
    } else {
        console.error('❌ المنت‌های سبد خرید وجود ندارند!');
    }
    
    showNotification('اطلاعات دیباگ در کنسول', 'info');
};
