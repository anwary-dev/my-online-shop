// script.js - نسخه اصلاح شده با سبد خرید پیشرفته

// ==================== متغیرهای عمومی ====================
let products = [];
let cart = [];
let currentCategory = 'all';

// ==================== بارگذاری داده‌ها ====================

function loadFromStorage() {
    try {
        // بارگذاری محصولات
        const savedProducts = localStorage.getItem('shop_products');
        if (savedProducts) {
            products = JSON.parse(savedProducts);
        } else {
            // داده‌های اولیه
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
        }
        
        // بارگذاری سبد خرید
        const savedCart = localStorage.getItem('shop_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        
        // نمایش محصولات
        displayProducts();
        
        // آپدیت سبد خرید
        updateCart();
        
    } catch (error) {
        console.error('خطا در بارگذاری داده‌ها:', error);
        products = [];
        cart = [];
    }
}

// ==================== ذخیره داده‌ها ====================

function saveToStorage() {
    try {
        localStorage.setItem('shop_cart', JSON.stringify(cart));
        localStorage.setItem('shop_products', JSON.stringify(products));
    } catch (error) {
        console.error('خطا در ذخیره داده‌ها:', error);
    }
}

// ==================== نمایش محصولات ====================

function displayProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
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
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-stock">
                        <i class="fas fa-cubes"></i> موجودی: 
                        <span style="color: ${product.stock > 10 ? '#27ae60' : product.stock > 0 ? '#f39c12' : '#e74c3c'}; font-weight: bold;">
                            ${product.stock} عدد
                        </span>
                    </div>
                    <div class="product-price">
                        <div>
                            <span class="price">${product.price.toLocaleString('fa-IR')}</span>
                            <span class="price-currency">افغانی</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i> ${product.stock === 0 ? 'ناموجود' : 'افزودن'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// ==================== مدیریت سبد خرید ====================

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
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            stock: product.stock
        });
    }
    
    updateCart();
    saveToStorage();
    showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
    animateCartButton();
}

// تغییر تعداد آیتم در سبد خرید
function changeCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    
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
    updateCart();
    saveToStorage();
}

// حذف از سبد خرید
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveToStorage();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

// آپدیت نمایش سبد خرید
function updateCart() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('total-price');
    const cartSubtotalElement = document.getElementById('subtotal-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartCountElement || !cartItemsContainer) return;
    
    // آپدیت تعداد
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // آپدیت لیست
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        cartItemsContainer.innerHTML = '';
    } else {
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'block';
        
        let cartHTML = '';
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" 
                             onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${item.price.toLocaleString('fa-IR')} افغانی</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" onclick="changeCartQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-number">${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="changeCartQuantity(${item.id}, 1)" ${item.quantity >= item.stock ? 'disabled' : ''}>
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
        
        cartItemsContainer.innerHTML = cartHTML;
        
        // محاسبه مجموع
        if (cartTotalElement) {
            cartTotalElement.textContent = subtotal.toLocaleString('fa-IR');
        }
        if (cartSubtotalElement) {
            cartSubtotalElement.textContent = subtotal.toLocaleString('fa-IR');
        }
    }
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

// ==================== فرم سفارش ====================

// نمایش فرم اطلاعات مشتری
function showCustomerForm() {
    const formHTML = `
        <div class="customer-form-overlay" id="customer-form">
            <div class="customer-form-container">
                <div class="customer-form-header">
                    <h3><i class="fas fa-user-circle"></i> اطلاعات مشتری</h3>
                    <button class="close-form-btn" onclick="closeCustomerForm()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="customer-info-form">
                    <div class="form-group">
                        <label for="customer-name"><i class="fas fa-user"></i> نام و نام خانوادگی</label>
                        <input type="text" id="customer-name" class="form-control" placeholder="نام کامل خود را وارد کنید" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer-phone"><i class="fas fa-phone"></i> شماره تماس</label>
                        <input type="tel" id="customer-phone" class="form-control" placeholder="مثال: 0798123456" required pattern="[0-9]{10}">
                        <small style="color: #666;">شماره تماس باید ۱۰ رقمی باشد</small>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer-address"><i class="fas fa-map-marker-alt"></i> آدرس تحویل</label>
                        <textarea id="customer-address" class="form-control" rows="3" placeholder="آدرس کامل خود را وارد کنید" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="customer-note"><i class="fas fa-sticky-note"></i> یادداشت (اختیاری)</label>
                        <textarea id="customer-note" class="form-control" rows="2" placeholder="یادداشت یا توضیح اضافی"></textarea>
                    </div>
                    
                    <div class="form-buttons">
                        <button type="button" class="btn btn-cancel" onclick="closeCustomerForm()">
                            <i class="fas fa-times"></i> انصراف
                        </button>
                        <button type="submit" class="btn btn-confirm">
                            <i class="fas fa-check"></i> تأیید و ادامه
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // حذف فرم قبلی اگر وجود دارد
    const existingForm = document.getElementById('customer-form');
    if (existingForm) existingForm.remove();
    
    // اضافه کردن فرم جدید
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // تنظیم رویداد فرم
    document.getElementById('customer-info-form').addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });
}

// بستن فرم مشتری
function closeCustomerForm() {
    const form = document.getElementById('customer-form');
    if (form) form.remove();
}

// پردازش سفارش
function processOrder() {
    // دریافت اطلاعات مشتری
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    const customerNote = document.getElementById('customer-note').value.trim();
    
    // اعتبارسنجی
    if (!customerName || !customerPhone || !customerAddress) {
        showNotification('لطفاً تمام اطلاعات ضروری را وارد کنید', 'error');
        return;
    }
    
    if (!/^[0-9]{10}$/.test(customerPhone)) {
        showNotification('شماره تماس باید ۱۰ رقمی باشد', 'error');
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
    
    // کسر از موجودی
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    
    // محاسبه مجموع
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // ثبت سفارش
    const order = {
        id: Date.now(),
        date: new Date().toLocaleString('fa-IR'),
        customer: {
            name: customerName,
            phone: customerPhone,
            address: customerAddress,
            note: customerNote
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: total,
        status: 'در انتظار تأیید'
    };
    
    // ذخیره سفارش
    const orders = JSON.parse(localStorage.getItem('shop_orders') || '[]');
    orders.push(order);
    localStorage.setItem('shop_orders', JSON.stringify(orders));
    
    // ذخیره محصولات به‌روزشده
    saveProducts();
    
    // نمایش تأیید نهایی
    showOrderConfirmation(order);
    
    // بستن فرم مشتری
    closeCustomerForm();
    
    // بستن سبد خرید
    toggleCart();
}

// نمایش تأیید سفارش
function showOrderConfirmation(order) {
    let orderDetails = `✅ <strong>سفارش شما با موفقیت ثبت شد!</strong>\n\n`;
    orderDetails += `🔢 <strong>شماره سفارش:</strong> ${order.id}\n`;
    orderDetails += `📅 <strong>تاریخ:</strong> ${order.date}\n`;
    orderDetails += `👤 <strong>مشتری:</strong> ${order.customer.name}\n`;
    orderDetails += `📞 <strong>تماس:</strong> ${order.customer.phone}\n\n`;
    orderDetails += `🛍️ <strong>محصولات:</strong>\n`;
    
    order.items.forEach((item, index) => {
        orderDetails += `${index + 1}. ${item.name} (${item.quantity} عدد)\n`;
    });
    
    orderDetails += `\n💰 <strong>مبلغ کل:</strong> ${order.total.toLocaleString('fa-IR')} افغانی\n\n`;
    orderDetails += `🏠 <strong>آدرس تحویل:</strong>\n${order.customer.address}\n\n`;
    
    if (order.customer.note) {
        orderDetails += `📝 <strong>یادداشت:</strong>\n${order.customer.note}\n\n`;
    }
    
    orderDetails += `📊 <strong>وضعیت:</strong> ${order.status}\n\n`;
    orderDetails += `با تشکر از خرید شما! سفارش شما طی ۲۴ ساعت بررسی خواهد شد.`;
    
    // نمایش جزئیات
    const confirmationHTML = `
        <div class="order-confirmation-overlay">
            <div class="order-confirmation">
                <div class="confirmation-header">
                    <i class="fas fa-check-circle" style="color: #27ae60; font-size: 3rem;"></i>
                    <h3>سفارش شما ثبت شد!</h3>
                </div>
                <div class="confirmation-body">
                    <div class="order-summary">
                        <div class="summary-item">
                            <span>شماره سفارش:</span>
                            <strong>${order.id}</strong>
                        </div>
                        <div class="summary-item">
                            <span>مبلغ کل:</span>
                            <strong style="color: #27ae60; font-size: 1.2rem;">${order.total.toLocaleString('fa-IR')} افغانی</strong>
                        </div>
                        <div class="summary-item">
                            <span>وضعیت:</span>
                            <span class="status-badge">در انتظار تأیید</span>
                        </div>
                    </div>
                    
                    <div class="customer-info">
                        <h4><i class="fas fa-user"></i> اطلاعات مشتری</h4>
                        <p><strong>نام:</strong> ${order.customer.name}</p>
                        <p><strong>تماس:</strong> ${order.customer.phone}</p>
                        <p><strong>آدرس:</strong> ${order.customer.address}</p>
                    </div>
                    
                    <div class="order-actions">
                        <button class="btn btn-print" onclick="printOrder(${order.id})">
                            <i class="fas fa-print"></i> چاپ رسید
                        </button>
                        <button class="btn btn-continue" onclick="continueShopping()">
                            <i class="fas fa-shopping-bag"></i> ادامه خرید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // حذف تأیید قبلی اگر وجود دارد
    const existingConfirm = document.querySelector('.order-confirmation-overlay');
    if (existingConfirm) existingConfirm.remove();
    
    // اضافه کردن تأیید جدید
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
    
    // خالی کردن سبد خرید
    cart = [];
    updateCart();
    saveToStorage();
    displayProducts();
}

// چاپ رسید
function printOrder(orderId) {
    // در نسخه واقعی اینجا رسید چاپ می‌شود
    alert('قابلیت چاپ به زودی اضافه خواهد شد');
}

// ادامه خرید
function continueShopping() {
    const confirmation = document.querySelector('.order-confirmation-overlay');
    if (confirmation) confirmation.remove();
    
    // اسکرول به بخش محصولات
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ==================== عملکردهای سبد خرید ====================

// نمایش/مخفی کردن سبد خرید
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        
        // جلوگیری از اسکرول پشت سبد خرید
        if (cartSidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// تکمیل سفارش (قدیمی - برای سازگاری)
function checkout() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است!', 'error');
        return;
    }
    
    // نمایش فرم اطلاعات مشتری
    showCustomerForm();
}

// ==================== سایر عملکردها ====================

function saveProducts() {
    localStorage.setItem('shop_products', JSON.stringify(products));
}

function filterProducts(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    displayProducts();
}

function searchProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const container = document.getElementById('products-container');
    
    if (!searchTerm) {
        displayProducts();
        return;
    }
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = `
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
                <img src="${product.image}" alt="${product.name}" class="product-image"
                     onerror="this.src='https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-stock">
                        <i class="fas fa-cubes"></i> موجودی: 
                        <span style="color: ${product.stock > 10 ? '#27ae60' : product.stock > 0 ? '#f39c12' : '#e74c3c'};">
                            ${product.stock} عدد
                        </span>
                    </div>
                    <div class="product-price">
                        <div>
                            <span class="price">${product.price.toLocaleString('fa-IR')}</span>
                            <span class="price-currency">افغانی</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i> ${product.stock === 0 ? 'ناموجود' : 'افزودن'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// ==================== نوتیفیکیشن ====================

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
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ==================== راه‌اندازی اولیه ====================

document.addEventListener('DOMContentLoaded', function() {
    // بارگذاری داده‌ها
    loadFromStorage();
    
    // رویداد دسته‌بندی‌ها
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterProducts(this.dataset.category);
        });
    });
    
    // رویداد جستجو
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') searchProducts();
        });
    }
    
    // بستن سبد خرید با کلیک بیرون
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggle = document.querySelector('.cart-toggle');
        
        if (cartSidebar && cartSidebar.classList.contains('active') &&
            !cartSidebar.contains(e.target) && 
            !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // ذخیره خودکار
    setInterval(saveToStorage, 30000);
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
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);
