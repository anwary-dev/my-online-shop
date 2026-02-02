// script.js - فروشگاه آنلاین دکان - نسخه پایدار
// ==============================================

// ==================== متغیرهای عمومی ====================
let products = [];
let cart = [];
let currentCategory = 'all';

// ==================== بارگذاری داده‌ها ====================

function loadFromStorage() {
    console.log('📦 شروع بارگذاری داده‌ها از localStorage...');
    
    try {
        // 1. بارگذاری محصولات
        const savedProducts = localStorage.getItem('shop_products');
        console.log('📋 محصولات ذخیره شده:', savedProducts ? 'بله' : 'خیر');
        
        if (savedProducts) {
            products = JSON.parse(savedProducts);
            console.log('✅ محصولات بارگذاری شد:', products.length, 'محصول');
        } else {
            console.log('⚠️ محصولی یافت نشد، بارگذاری نمونه...');
            loadDefaultProducts();
        }
        
        // 2. بارگذاری سبد خرید
        const savedCart = localStorage.getItem('shop_cart');
        console.log('🛒 سبد خرید ذخیره شده:', savedCart ? 'بله' : 'خیر');
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('✅ سبد خرید بارگذاری شد:', cart.length, 'آیتم');
        } else {
            cart = [];
            console.log('✅ سبد خرید جدید ایجاد شد');
        }
        
        // 3. نمایش در صفحه
        displayProducts();
        updateCart();
        
    } catch (error) {
        console.error('❌ خطا در بارگذاری داده‌ها:', error);
        console.log('🔄 بارگذاری مجدد با داده‌های پیش‌فرض...');
        
        // بازنشانی کامل در صورت خطا
        localStorage.removeItem('shop_products');
        localStorage.removeItem('shop_cart');
        
        loadDefaultProducts();
        cart = [];
        
        displayProducts();
        updateCart();
    }
    
    console.log('🎉 بارگذاری داده‌ها کامل شد');
}

// بارگذاری محصولات پیش‌فرض
function loadDefaultProducts() {
    console.log('🔧 بارگذاری محصولات پیش‌فرض...');
    
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
    
    console.log('✅ محصولات پیش‌فرض بارگذاری شد:', products.length, 'محصول');
    saveToStorage();
}

// ==================== ذخیره داده‌ها ====================

function saveToStorage() {
    try {
        localStorage.setItem('shop_products', JSON.stringify(products));
        localStorage.setItem('shop_cart', JSON.stringify(cart));
        console.log('💾 داده‌ها ذخیره شد:', products.length, 'محصول،', cart.length, 'آیتم در سبد');
    } catch (error) {
        console.error('❌ خطا در ذخیره داده‌ها:', error);
    }
}

// ==================== نمایش محصولات ====================

function displayProducts() {
    console.log('🖼️ شروع نمایش محصولات...');
    const container = document.getElementById('products-container');
    
    if (!container) {
        console.error('❌ المنت products-container یافت نشد!');
        return;
    }
    
    console.log('🎯 فیلتر محصولات بر اساس دسته:', currentCategory);
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    console.log('📊 تعداد محصولات فیلتر شده:', filteredProducts.length);
    
    // پاک کردن محتوا
    container.innerHTML = '';
    
    // اگر محصولی وجود ندارد
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-box-open" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">محصولی در این دسته‌بندی وجود ندارد</h3>
                <button class="btn" onclick="filterProducts('all')" style="margin-top: 20px;">
                    <i class="fas fa-eye"></i> مشاهده همه محصولات
                </button>
            </div>
        `;
        console.log('ℹ️ پیام "بدون محصول" نمایش داده شد');
        return;
    }
    
    // نمایش محصولات
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.innerHTML += productCard;
    });
    
    console.log('✅ محصولات نمایش داده شدند');
}

// ایجاد کارت محصول
function createProductCard(product) {
    const isOutOfStock = product.stock === 0;
    const stockColor = product.stock > 10 ? '#27ae60' : product.stock > 0 ? '#f39c12' : '#e74c3c';
    
    return `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-stock" style="font-size: 0.9rem; color: ${stockColor}; margin-bottom: 10px;">
                    <i class="fas fa-cubes"></i> موجودی: ${product.stock} عدد
                </div>
                <div class="product-price">
                    <div>
                        <span class="price">${product.price.toLocaleString('fa-IR')}</span>
                        <span class="price-currency">افغانی</span>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})" 
                            ${isOutOfStock ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                        <i class="fas fa-cart-plus"></i> ${isOutOfStock ? 'ناموجود' : 'افزودن'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ==================== مدیریت سبد خرید ====================

// اضافه کردن به سبد خرید
function addToCart(productId) {
    console.log('➕ افزودن محصول به سبد:', productId);
    
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
        console.log('📈 تعداد محصول افزایش یافت:', product.name, '=', existingItem.quantity);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
            quantity: 1
        });
        console.log('🆕 محصول جدید به سبد اضافه شد:', product.name);
    }
    
    updateCart();
    saveToStorage();
    showNotification(`"${product.name}" به سبد خرید اضافه شد`, 'success');
    
    // انیمیشن دکمه سبد خرید
    animateCartButton();
}

// تغییر تعداد آیتم در سبد خرید
function changeCartQuantity(productId, change) {
    console.log('🔢 تغییر تعداد در سبد:', productId, 'تغییر:', change);
    
    const item = cart.find(item => item.id === productId);
    if (!item) {
        console.log('❌ آیتم در سبد یافت نشد');
        return;
    }
    
    const newQuantity = item.quantity + change;
    
    // اگر تعداد به صفر رسید
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    // بررسی موجودی
    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
        showNotification(`حداکثر ${product.stock} عدد از این محصول قابل خرید است!`, 'error');
        return;
    }
    
    item.quantity = newQuantity;
    console.log('✅ تعداد به‌روز شد:', product.name, '=', newQuantity);
    
    updateCart();
    saveToStorage();
    
    // مطمئن شویم سبد خرید باز بماند
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('active')) {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// حذف از سبد خرید
function removeFromCart(productId) {
    console.log('🗑️ حذف محصول از سبد:', productId);
    
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveToStorage();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

// به‌روزرسانی نمایش سبد خرید
function updateCart() {
    console.log('🔄 به‌روزرسانی نمایش سبد خرید...');
    
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('total-price');
    const cartSubtotalElement = document.getElementById('subtotal-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');
    
    // اگر المنت‌ها وجود ندارند
    if (!cartCountElement || !cartItemsContainer) {
        console.error('❌ المنت‌های سبد خرید یافت نشدند!');
        return;
    }
    
    // محاسبه تعداد کل آیتم‌ها
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    console.log('🛒 تعداد آیتم‌ها در سبد:', totalItems);
    
    // اگر سبد خرید خالی است
    if (cart.length === 0) {
        console.log('🛒 سبد خرید خالی است');
        
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    // سبد خرید خالی نیست
    console.log('📦 نمایش آیتم‌های سبد:', cart.length, 'آیتم');
    
    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    let cartHTML = '';
    let subtotal = 0;
    
    // ایجاد HTML برای هر آیتم
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" 
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('fa-IR')} افغانی</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" onclick="changeCartQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-number">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="changeCartQuantity(${item.id}, 1)" 
                                ${item.quantity >= item.stock ? 'disabled' : ''}>
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-total">
                        ${itemTotal.toLocaleString('fa-IR')} <small>افغانی</small>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    // نمایش آیتم‌ها
    cartItemsContainer.innerHTML = cartHTML;
    
    // نمایش مبالغ
    if (cartTotalElement) {
        cartTotalElement.textContent = subtotal.toLocaleString('fa-IR');
    }
    if (cartSubtotalElement) {
        cartSubtotalElement.textContent = subtotal.toLocaleString('fa-IR');
    }
    
    console.log('💰 مجموع سبد خرید:', subtotal.toLocaleString('fa-IR'), 'افغانی');
}

// انیمیشن دکمه سبد خرید
function animateCartButton() {
    const cartBtn = document.querySelector('.cart-toggle');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    }
}

// ==================== عملکردهای سبد خرید ====================

// نمایش/مخفی کردن سبد خرید
function toggleCart() {
    console.log('🔘 کلیک روی دکمه سبد خرید');
    
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        const isOpening = !cartSidebar.classList.contains('active');
        cartSidebar.classList.toggle('active');
        
        if (isOpening) {
            document.body.style.overflow = 'hidden';
            console.log('📖 سبد خرید باز شد');
        } else {
            document.body.style.overflow = 'auto';
            console.log('📕 سبد خرید بسته شد');
        }
    }
}

// شروع فرآیند سفارش
function checkout() {
    console.log('🚀 شروع فرآیند سفارش...');
    
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!', 'error');
        return;
    }
    
    // نمایش فرم اطلاعات مشتری
    showCustomerForm();
}

// خالی کردن کامل سبد خرید
function clearCart() {
    console.log('🧹 خالی کردن کامل سبد خرید');
    
    if (cart.length === 0) {
        showNotification('سبد خرید از قبل خالی است!', 'info');
        return;
    }
    
    if (confirm('آیا می‌خواهید همه آیتم‌های سبد خرید را حذف کنید؟')) {
        cart = [];
        updateCart();
        saveToStorage();
        showNotification('سبد خرید با موفقیت خالی شد', 'success');
    }
}

// ==================== سایر عملکردها ====================

// فیلتر محصولات بر اساس دسته‌بندی
function filterProducts(category) {
    console.log('🔍 فیلتر محصولات:', category);
    
    currentCategory = category;
    
    // به‌روزرسانی دکمه‌های فعال
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    displayProducts();
    
    // اسکرول به بخش محصولات
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// جستجوی محصولات
function searchProducts() {
    console.log('🔎 شروع جستجو...');
    
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    console.log('📝 عبارت جستجو:', searchTerm);
    
    // اگر جستجو خالی است، نمایش همه
    if (!searchTerm) {
        displayProducts();
        return;
    }
    
    const container = document.getElementById('products-container');
    if (!container) return;
    
    // فیلتر محصولات
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    console.log('📊 نتایج جستجو:', filtered.length, 'محصول');
    
    // پاک کردن و نمایش نتایج
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666;">هیچ محصولی با عبارت "${searchTerm}" یافت نشد</h3>
                <button class="btn" onclick="searchInput.value=''; searchProducts();" style="margin-top: 20px;">
                    <i class="fas fa-times"></i> پاک کردن جستجو
                </button>
            </div>
        `;
        return;
    }
    
    // نمایش محصولات پیدا شده
    filtered.forEach(product => {
        const productCard = createProductCard(product);
        container.innerHTML += productCard;
    });
}

// ==================== نوتیفیکیشن ====================

function showNotification(message, type = 'success') {
    console.log(`📢 نوتیفیکیشن [${type}]:`, message);
    
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
    
    // حذف نوتیفیکیشن‌های قبلی
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());
    
    // ایجاد نوتیفیکیشن جدید
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
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
    
    // حذف خودکار پس از 3 ثانیه
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==================== راه‌اندازی اولیه ====================

// اجرا پس از بارگذاری کامل صفحه
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 فروشگاه آنلاین در حال راه‌اندازی...');
    console.log('🔗 آدرس صفحه:', window.location.href);
    
    try {
        // 1. بارگذاری داده‌ها
        loadFromStorage();
        
        // 2. تنظیم رویدادهای دسته‌بندی
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                filterProducts(this.dataset.category);
            });
        });
        
        // 3. تنظیم رویداد جستجو
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', searchProducts);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') searchProducts();
            });
        }
        
        // 4. بستن سبد خرید با کلیک بیرون
        document.addEventListener('click', function(e) {
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartToggle = document.querySelector('.cart-toggle');
            
            if (cartSidebar && cartSidebar.classList.contains('active') &&
                !cartSidebar.contains(e.target) && 
                !cartToggle.contains(e.target)) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('🖱️ بستن سبد خرید با کلیک بیرون');
            }
        });
        
        // 5. ذخیره خودکار هر 30 ثانیه
        setInterval(saveToStorage, 30000);
        
        // 6. نمایش پیام موفقیت
        setTimeout(() => {
            console.log('✅ فروشگاه با موفقیت راه‌اندازی شد');
            console.log('📊 وضعیت سیستم:', {
                products: products.length,
                cartItems: cart.length,
                totalCartItems: cart.reduce((sum, item) => sum + item.quantity, 0)
            });
            
            showNotification('فروشگاه آماده است! خوش آمدید 🛍️', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('❌ خطای شدید در راه‌اندازی:', error);
        showNotification('خطایی در بارگذاری فروشگاه رخ داد. لطفاً صفحه را رفرش کنید.', 'error');
    }
});

// ==================== توابع کمکی ====================

// تابع برای نمایش محصولات تخفیف‌دار
function showPromoProducts() {
    console.log('🎁 نمایش محصولات تخفیف‌دار');
    const promoProducts = products.filter(p => p.badge === 'تخفیف');
    
    if (promoProducts.length > 0) {
        filterProducts('all');
        showNotification(`${promoProducts.length} محصول تخفیف‌دار یافت شد`, 'info');
    } else {
        showNotification('در حال حاضر محصول تخفیف‌دار موجود نیست', 'info');
    }
}

// تابع برای اسکرول به محصولات
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        console.log('⬇️ اسکرول به بخش محصولات');
    }
}

// ==================== استایل‌های انیمیشن ====================

// اضافه کردن استایل‌های انیمیشن به صفحه
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .product-card {
        animation: fadeIn 0.5s ease;
    }
    
    .cart-sidebar {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(animationStyles);

// ==================== تست و دیباگ ====================

// تابع برای تست سیستم (فقط در حالت توسعه)
function debugSystem() {
    console.group('🔧 دیباگ سیستم فروشگاه');
    console.log('📦 محصولات:', products);
    console.log('🛒 سبد خرید:', cart);
    console.log('💾 localStorage محصولات:', localStorage.getItem('shop_products'));
    console.log('💾 localStorage سبد:', localStorage.getItem('shop_cart'));
    console.groupEnd();
}

// در صورت نیاز، دیباگ را فعال کنید
// debugSystem();
