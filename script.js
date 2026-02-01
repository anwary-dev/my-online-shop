// تغییر تعداد آیتم در سبد خرید - نسخه اصلاح شده
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
    
    // اطمینان از باز ماندن سبد خرید
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && !cartSidebar.classList.contains('active')) {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
