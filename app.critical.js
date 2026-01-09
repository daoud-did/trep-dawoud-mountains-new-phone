/**
 * TREP DAWOUD - Mobile Performance & Light Theme Script
 * محسّن للهواتف الضعيفة والاتصالات البطيئة
 * 
 * استراتيجية:
 * 1. كشف قوة الجهاز والاتصال
 * 2. تعطيل الأنيميشنات على الهواتف الضعيفة
 * 3. تحميل الموارد بذكاء (Lazy Loading)
 * 4. إدارة LocalStorage بكفاءة
 * 5. معالجة الأخطاء بشكل آمن
 */

(function() {
    'use strict';

    // ============================================
    // 1️⃣ كشف الجهاز والاتصال
    // ============================================
    
    const DeviceDetector = {
        isLowEnd: false,
        isSlowConnection: false,
        isMobile: false,
        
        init() {
            this.checkDeviceMemory();
            this.checkConnection();
            this.checkMobile();
            this.applyOptimizations();
        },
        
        checkDeviceMemory() {
            // كشف ذاكرة الجهاز
            if (navigator.deviceMemory) {
                this.isLowEnd = navigator.deviceMemory <= 2;
                if (this.isLowEnd) {
                    console.log('🔧 جهاز ضعيف - تفعيل الوضع الخفيف');
                    document.documentElement.classList.add('low-end-device');
                }
            }
        },
        
        checkConnection() {
            // كشف سرعة الاتصال
            if (navigator.connection) {
                const type = navigator.connection.effectiveType;
                this.isSlowConnection = ['2g', '3g', '4g-slow'].includes(type);
                
                if (this.isSlowConnection) {
                    console.log('📡 اتصال بطيء - تحميل محسّن');
                    document.documentElement.classList.add('slow-connection');
                }
            }
        },
        
        checkMobile() {
            // كشف الهاتف
            this.isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (this.isMobile) {
                document.documentElement.classList.add('is-mobile');
            }
        },
        
        applyOptimizations() {
            if (this.isLowEnd || this.isSlowConnection) {
                // تقليل تأثيرات CSS
                document.documentElement.style.setProperty('--transition-duration', '0.1s');
                
                // تعطيل الظلال الثقيلة
                this.disableHeavyShadows();
                
                // تحميل صور مبسطة
                this.loadLiteImages();
            }
        }
    };
    
    DeviceDetector.init();

    // ============================================
    // 2️⃣ إدارة النمط الليلي (Dark Mode)
    // ============================================
    
    const ThemeManager = {
        STORAGE_KEY: 'theme-preference',
        THEME_DARK: 'dark',
        THEME_LIGHT: 'light',
        
        init() {
            this.loadSavedTheme();
            this.setupToggle();
            this.setupMediaQuery();
        },
        
        loadSavedTheme() {
            // قراءة التفضيل المحفوظ
            const saved = localStorage.getItem(this.STORAGE_KEY);
            const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? this.THEME_DARK 
                : this.THEME_LIGHT;
            
            const theme = saved || preferred;
            this.setTheme(theme);
        },
        
        setTheme(theme) {
            if (theme === this.THEME_DARK) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            localStorage.setItem(this.STORAGE_KEY, theme);
            this.updateThemeIcon(theme === this.THEME_DARK);
        },
        
        setupToggle() {
            const btn = document.getElementById('themeBtn');
            if (btn) {
                btn.addEventListener('click', () => {
                    const isDark = document.body.classList.contains('dark-mode');
                    this.setTheme(isDark ? this.THEME_LIGHT : this.THEME_DARK);
                });
            }
        },
        
        setupMediaQuery() {
            // تحديث تلقائي عند تغيير إعدادات النظام
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.STORAGE_KEY)) {
                    this.setTheme(e.matches ? this.THEME_DARK : this.THEME_LIGHT);
                }
            });
        },
        
        updateThemeIcon(isDark) {
            const icon = document.querySelector('#themeBtn i');
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
    } else {
        ThemeManager.init();
    }

    // ============================================
    // 3️⃣ Lazy Loading للصور
    // ============================================
    
    const LazyImageLoader = {
        // استخدم Intersection Observer API للأداء العالية
        init() {
            if ('IntersectionObserver' in window) {
                this.setupIntersectionObserver();
            } else {
                this.setupFallback();
            }
        },
        
        setupIntersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px' // تحميل قبل الوصول بـ 50px
            });
            
            document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
                observer.observe(img);
            });
        },
        
        loadImage(img) {
            const src = img.dataset.src || img.src;
            const srcSet = img.dataset.srcset;
            
            if (srcSet) img.srcset = srcSet;
            if (src) img.src = src;
            
            img.removeAttribute('data-src');
            img.removeAttribute('data-srcset');
            img.classList.add('loaded');
        },
        
        setupFallback() {
            // بديل للمتصفحات القديمة
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.loadImage(img);
            });
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => LazyImageLoader.init());
    } else {
        LazyImageLoader.init();
    }

    // ============================================
    // 4️⃣ Preload الموارد الحرجة
    // ============================================
    
    const ResourcePreloader = {
        init() {
            // Preload الخطوط المهمة فقط
            this.preloadFonts();
            
            // Prefetch الصفحات المتوقعة
            this.prefetchPages();
        },
        
        preloadFonts() {
            const fonts = [
                { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap', as: 'style' }
            ];
            
            fonts.forEach(font => {
                const link = document.createElement('link');
                Object.assign(link, font);
                document.head.appendChild(link);
            });
        },
        
        prefetchPages() {
            // Prefetch الصفحات الشائعة على الهاتف
            const pages = ['mountains.html', 'blog.html', 'services.html'];
            pages.forEach(page => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
            });
        }
    };
    
    ResourcePreloader.init();

    // ============================================
    // 5️⃣ تعطيل الظلال الثقيلة على الأجهزة الضعيفة
    // ============================================
    
    DeviceDetector.disableHeavyShadows = function() {
        const style = document.createElement('style');
        style.textContent = `
            low-end-device .shadow-lg,
            low-end-device [class*="shadow-"],
            low-end-device .card,
            low-end-device .elevation {
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12) !important;
            }
            
            low-end-device *::before,
            low-end-device *::after {
                box-shadow: none !important;
            }
        `;
        document.head.appendChild(style);
    };

    // ============================================
    // 6️⃣ تحميل الصور المبسطة على الاتصالات البطيئة
    // ============================================
    
    DeviceDetector.loadLiteImages = function() {
        document.querySelectorAll('img').forEach(img => {
            const liteSrc = img.dataset.liteSrc || img.src.replace(/\.jpg/, '-lite.jpg');
            if (DeviceDetector.isSlowConnection) {
                img.src = liteSrc;
            }
        });
    };

    // ============================================
    // 7️⃣ معالجة الأخطاء والـ Offline
    // ============================================
    
    const ErrorHandler = {
        init() {
            window.addEventListener('error', this.handleError.bind(this));
            window.addEventListener('unhandledrejection', this.handleRejection.bind(this));
            
            // التحقق من الاتصال
            this.checkConnectivity();
        },
        
        handleError(event) {
            console.error('🚨 خطأ:', event.error);
            // لا تعرض رسائل خطأ مزعجة للمستخدم
        },
        
        handleRejection(event) {
            console.warn('⚠️ رفض Promise:', event.reason);
            event.preventDefault(); // منع الخطأ الافتراضي
        },
        
        checkConnectivity() {
            window.addEventListener('offline', () => {
                console.log('📵 بدون اتصال إنترنت');
                document.documentElement.classList.add('offline');
            });
            
            window.addEventListener('online', () => {
                console.log('📶 اتصال إنترنت متاح');
                document.documentElement.classList.remove('offline');
            });
        }
    };
    
    ErrorHandler.init();

    // ============================================
    // 8️⃣ وسيط Navigation ذكي
    // ============================================
    
    const SmartNavigation = {
        init() {
            this.setupPrefetch();
            this.setupHistoryState();
        },
        
        setupPrefetch() {
            document.addEventListener('mouseover', (e) => {
                const link = e.target.closest('a[href]:not([href^="#"])');
                if (link && link.hostname === window.location.hostname) {
                    this.prefetchLink(link.href);
                }
            });
        },
        
        prefetchLink(url) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        },
        
        setupHistoryState() {
            // حفظ حالة الصفحة للعودة السريعة
            window.addEventListener('beforeunload', () => {
                sessionStorage.setItem('pageState', JSON.stringify({
                    scroll: window.scrollY,
                    time: new Date().getTime()
                }));
            });
        }
    };
    
    SmartNavigation.init();

    // ============================================
    // 9️⃣ تحسين الأداء: تقليل الـ Reflows
    // ============================================
    
    const PerformanceOptimizer = {
        // استخدام requestAnimationFrame لتحديثات الـ DOM
        throttledUpdate: function(callback, delay = 16) {
            let lastTime = 0;
            return function() {
                const now = new Date().getTime();
                if (now - lastTime >= delay) {
                    callback();
                    lastTime = now;
                }
            };
        },
        
        // تجميع تحديثات الـ DOM
        batchDOMUpdates: function(updates) {
            requestAnimationFrame(() => {
                updates.forEach(update => update());
            });
        }
    };

    // ============================================
    // 🔟 تصدير للاستخدام العام
    // ============================================
    
    window.TREP = {
        DeviceDetector,
        ThemeManager,
        LazyImageLoader,
        ErrorHandler,
        PerformanceOptimizer
    };

})();

console.log('✅ App Critical Script Loaded - Mobile Optimized');
