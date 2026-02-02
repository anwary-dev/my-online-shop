// ==================== توابع کمکی localStorage ====================
function saveToStorage() {
    try {
        localStorage.setItem('shop_products', JSON.stringify(products));
        localStorage.setItem('shop_cart', JSON.stringify(cart));
        console.log('💾 داده‌ها ذخیره شدند');
    } catch (error) {
        console.error('❌ خطا در ذخیره داده‌ها:', error);
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
