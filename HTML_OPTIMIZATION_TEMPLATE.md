# HTML Optimization Template

Use this template for all HTML pages (mountains.html, dashboard.html, blog.html, services.html, courses.html, question.html, login.html, signup.html, profile.html, verify.sh)

## Head Section Template

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="description" content="PAGE_DESCRIPTION">
    <meta name="theme-color" content="#D4845C">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title>PAGE_TITLE</title>
    
    <!-- Critical CSS - Inline for faster rendering -->
    <style>
        /* Include the same critical CSS from index.html */
        :root{--primary:#D4845C;--primary-dark:#B8623D;--primary-light:#E8A876;--secondary:#067e66;--accent:#E8C547;--gray-dark:#6B6966;--off-white:#F8F7F2;--black:#2F2D2A}
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
        body{font-family:system-ui,-apple-system,'Segoe UI','Cairo',sans-serif;line-height:1.6;color:var(--black);background:var(--off-white);transition:background-color 0.3s ease;min-height:100vh}
        body.dark-mode{background-color:#1a1a18;color:#f8f7f2}
        .header{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(248,247,242,.95);backdrop-filter:blur(10px);box-shadow:0 2px 8px rgba(0,0,0,.08)}
        .header-content{max-width:1200px;margin:0 auto;padding:1rem 20px;display:flex;justify-content:space-between;align-items:center}
        .logo{display:flex;align-items:center;gap:.5rem;font-size:1.5rem;font-weight:700;color:var(--primary-dark);text-decoration:none}
        .nav-menu{display:flex;gap:2rem;list-style:none;flex-wrap:wrap}
        .nav-link{color:var(--black);font-weight:500;transition:color 0.3s ease;padding:.5rem 0;text-decoration:none}
        .nav-link:hover{color:var(--primary)}
        .theme-btn{background:0;border:2px solid var(--primary);color:var(--primary);width:40px;height:40px;border-radius:50%;cursor:pointer;transition:all 0.3s ease}
        .menu-toggle{display:none;flex-direction:column;gap:5px;cursor:pointer}
        @media(max-width:768px){
            .nav-menu{display:none}
            .menu-toggle{display:flex}
        }
    </style>
    
    <!-- Main stylesheet -->
    <link rel="stylesheet" href="css/main.min.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="css/main.min.css"></noscript>
    
    <!-- Font Awesome - Async load -->
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></noscript>
</head>
```

## Body & Footer Section Template

```html
<body>
    <!-- Navigation Header -->
    <header class="header">
        <div class="header-content">
            <a href="index.html" class="logo">
                <i class="fas fa-mountain"></i>
                <span>TREP DAWOUD</span>
            </a>
            <nav class="nav-menu">
                <a href="index.html" class="nav-link">الرئيسية</a>
                <a href="mountains.html" class="nav-link">الجبال</a>
                <a href="dashboard.html" class="nav-link">لوحة التحكم</a>
                <a href="blog.html" class="nav-link">المدونة</a>
                <a href="courses.html" class="nav-link">الدورات</a>
                <a href="services.html" class="nav-link">الخدمات</a>
                <a href="question.html" class="nav-link">أسئلة</a>
                <a href="login.html" class="nav-link">تسجيل الدخول</a>
                <a href="signup.html" class="nav-link">إنشاء حساب</a>
            </nav>
            <div class="theme-toggle">
                <button class="theme-btn" id="themeBtn" aria-label="تبديل الوضع الليلي">
                    <i class="fas fa-moon"></i>
                </button>
            </div>
            <button class="menu-toggle" aria-label="فتح القائمة" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- MAIN CONTENT AREA -->
    <!-- [PAGE-SPECIFIC CONTENT HERE] -->

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>TREP DAWOUD</h3>
                <p>نظام عرض متقدم لأجمل الجبال حول العالم</p>
            </div>
            <div class="footer-section">
                <h3>الروابط السريعة</h3>
                <ul>
                    <li><a href="index.html">الرئيسية</a></li>
                    <li><a href="mountains.html">الجبال</a></li>
                    <li><a href="services.html">الخدمات</a></li>
                    <li><a href="blog.html">المدونة</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>معلومات</h3>
                <ul>
                    <li><a href="#">عن الموقع</a></li>
                    <li><a href="#">سياسة الخصوصية</a></li>
                    <li><a href="#">الشروط والأحكام</a></li>
                    <li><a href="#">اتصل بنا</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>تابعنا</h3>
                <div class="social-links">
                    <a href="#" title="Facebook" aria-label="تابعنا على فيسبوك"><i class="fab fa-facebook"></i></a>
                    <a href="#" title="Instagram" aria-label="تابعنا على انستجرام"><i class="fab fa-instagram"></i></a>
                    <a href="#" title="Twitter" aria-label="تابعنا على تويتر"><i class="fab fa-twitter"></i></a>
                    <a href="#" title="YouTube" aria-label="تابعنا على يوتيوب"><i class="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 TREP DAWOUD. جميع الحقوق محفوظة.</p>
        </div>
    </footer>

    <!-- Scripts - Essential only -->
    <script async src="js/app.min.js"></script>
    <script defer src="js/performance.js"></script>
    
    <!-- Page-specific scripts (if needed) -->
    <!-- <script defer src="js/page-specific.js"></script> -->
</body>
</html>
```

## Key Changes from Old Structure

1. **Removed 14+ separate CSS files**
   - Now using single optimized `main.min.css`

2. **Reduced JavaScript loading**
   - Only essential `app.min.js` and `performance.js`
   - Removed individual page scripts unless critical

3. **Critical CSS Inlined**
   - All critical above-fold styles inline in `<head>`
   - Non-critical CSS loaded asynchronously

4. **Improved Semantics**
   - Header is now a semantic `<header>` element
   - Logo is now a link instead of div
   - Added ARIA labels

5. **Better Mobile Support**
   - Hamburger menu added
   - Touch-friendly navigation
   - Responsive typography

6. **Performance Enhancements**
   - Async Font Awesome loading
   - Deferred non-critical scripts
   - Connection speed detection
   - Web Vitals monitoring

## Migration Steps

For each HTML page:
1. Replace `<head>` section completely with template above
2. Update `<header>` to use new semantic structure
3. Replace `<footer>` with template footer
4. Update `<script>` tags to use only `app.min.js` and `performance.js`
5. Test navigation and functionality
6. Verify in mobile and desktop
7. Run PageSpeed Insights

## Files to Update
- [ ] index.html ✅
- [ ] mountains.html
- [ ] dashboard.html
- [ ] blog.html
- [ ] courses.html
- [ ] services.html
- [ ] question.html
- [ ] login.html
- [ ] signup.html
- [ ] profile.html
