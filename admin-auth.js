// admin-auth.js - سیستم احراز هویت مرکزی

const ADMIN_CONFIG_URL = 'admin-config.json';

class AdminAuth {
    constructor() {
        this.config = null;
        this.isAuthenticated = false;
    }

    // بارگذاری تنظیمات از فایل JSON
    async loadConfig() {
        try {
            const response = await fetch(ADMIN_CONFIG_URL + '?t=' + Date.now());
            if (!response.ok) {
                throw new Error('فایل تنظیمات یافت نشد');
            }
            this.config = await response.json();
            console.log('تنظیمات مدیریت بارگذاری شد');
            return true;
        } catch (error) {
            console.error('خطا در بارگذاری تنظیمات:', error);
            // تنظیمات پیش‌فرض
            this.config = {
                username: "admin",
                password: "123456",
                last_updated: new Date().toISOString()
            };
            return false;
        }
    }

    // بررسی ورود
    async login(username, password) {
        await this.loadConfig();
        
        if (username === this.config.username && password === this.config.password) {
            // ایجاد توکن موقت
            const token = this.generateToken();
            sessionStorage.setItem('admin_token', token);
            sessionStorage.setItem('admin_username', username);
            sessionStorage.setItem('admin_logged_in', 'true');
            sessionStorage.setItem('login_time', Date.now());
            
            // افزایش بازدید
            this.incrementViews();
            
            return { success: true, message: 'ورود موفق' };
        }
        
        return { success: false, message: 'نام کاربری یا رمز عبور نادرست' };
    }

    // تغییر رمز عبور
    async changePassword(oldPassword, newPassword) {
        await this.loadConfig();
        
        if (oldPassword !== this.config.password) {
            return { success: false, message: 'رمز عبور فعلی نادرست است' };
        }
        
        if (newPassword.length < 6) {
            return { success: false, message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' };
        }
        
        // در حالت واقعی، اینجا باید به سرور ارسال شود
        // اما چون GitHub Pages استراتیک است، از localStorage استفاده می‌کنیم
        // و به کاربر آموزش می‌دهیم که فایل config را دستی آپدیت کند
        
        // ذخیره در localStorage به عنوان کش
        localStorage.setItem('admin_password_cache', newPassword);
        localStorage.setItem('admin_password_updated', Date.now());
        
        // ذخیره در session برای این نشست
        sessionStorage.setItem('admin_new_password', newPassword);
        
        return { 
            success: true, 
            message: 'رمز عبور تغییر یافت (برای ذخیره دائمی، مراحل زیر را انجام دهید)',
            instructions: this.getPasswordChangeInstructions(newPassword)
        };
    }

    // تولید توکن امنیتی
    generateToken() {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // بررسی اعتبار توکن
    validateToken() {
        const token = sessionStorage.getItem('admin_token');
        const loginTime = sessionStorage.getItem('login_time');
        
        if (!token || !loginTime) return false;
        
        // بررسی زمان (30 دقیقه)
        const timeDiff = Date.now() - parseInt(loginTime);
        if (timeDiff > 30 * 60 * 1000) {
            this.logout();
            return false;
        }
        
        return true;
    }

    // خروج
    logout() {
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_username');
        sessionStorage.removeItem('admin_logged_in');
        sessionStorage.removeItem('login_time');
        sessionStorage.removeItem('admin_new_password');
    }

    // افزایش شمارنده بازدید
    incrementViews() {
        let views = parseInt(localStorage.getItem('admin_views') || '0');
        views++;
        localStorage.setItem('admin_views', views.toString());
        return views;
    }

    // گرفتن دستورالعمل تغییر رمز
    getPasswordChangeInstructions(newPassword) {
        return `
📝 <strong>برای ذخیره دائمی رمز عبور جدید:</strong>

1. به ریپوی GitHub خود بروید:
   https://github.com/[نام-کاربری]/[نام-ریپو]

2. فایل <strong>admin-config.json</strong> را پیدا کنید

3. روی آیکون ✏️ (Edit) کلیک کنید

4. خط "password" را به این تغییر دهید:
   <pre>"password": "${newPassword}"</pre>

5. در پایین صفحه، روی <strong>Commit changes</strong> کلیک کنید

6. 1-2 دقیقه صبر کنید تا تغییرات اعمال شود

⚠️ <strong>توجه:</strong>
تا زمانی که فایل را آپدیت نکنید، رمز جدید فقط در این مرورگر کار می‌کند.
        `;
    }

    // بررسی اگر رمز جدید در session ذخیره شده
    checkNewPassword() {
        const newPassword = sessionStorage.getItem('admin_new_password');
        const cachePassword = localStorage.getItem('admin_password_cache');
        
        if (newPassword && this.validateToken()) {
            // اگر کاربر با رمز جدید لاگین کرده، از آن استفاده کن
            this.config.password = newPassword;
            return true;
        } else if (cachePassword && this.validateToken()) {
            // از کش استفاده کن
            this.config.password = cachePassword;
            return true;
        }
        
        return false;
    }
}

// ایجاد نمونه جهانی
window.adminAuth = new AdminAuth();