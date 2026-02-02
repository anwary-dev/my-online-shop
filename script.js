// ==================== راه‌اندازی اولیه ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 فروشگاه آنلاین در حال راه‌اندازی...');
    
    try {
        // 1. بارگذاری داده‌ها از localStorage
        loadInitialData();
        
        // 2. تنظیم رویدادهای index.html
        setupEventListeners();
        
        // 3. نمایش محصولات
        displayProducts();
        
        // 4. به‌روزرسانی سبد خرید
        updateCartDisplay();
        
        console.log('✅ فروشگاه با موفقیت راه‌اندازی شد');
        
    } catch (error) {
        console.error('❌ خطا در راه‌اندازی:', error);
        emergencyMode();
    }
});

// ==================== بارگذاری داده‌ها ====================
function loadInitialData() {
    console.log('📂 بارگذاری داده‌های اولیه...');
    
    // بارگذاری محصولات
    const savedProducts = getFromStorage('shop_products');
    products = savedProducts || [];
    
    // بارگذاری سبد خرید
    const savedCart = getFromStorage('shop_cart');
    cart = savedCart || [];
    
    // اگر محصولی وجود نداشت، نمونه‌ها را بارگذاری کن
    if (products.length === 0) {
        loadSampleProducts();
    }
}

// ==================== تنظیم رویدادها ====================
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
            // حذف active از همه
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // اضافه کردن active به این دکمه
            this.classList.add('active');
            
            // فیلتر کردن محصولات
            const category = this.getAttribute('data-category');
            currentCategory = category;
            displayProducts();
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }
}

function setupCartEvents() {
    // دکمه باز
