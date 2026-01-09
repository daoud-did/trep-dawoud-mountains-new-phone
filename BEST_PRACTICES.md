# 🏆 أفضل الممارسات - تحسين الأداء

## 1️⃣ تحسين HTML

### ✅ الهيكل الأمثل
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <!-- Meta Tags الحاسمة أولاً -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="...">
    
    <!-- Critical CSS inline -->
    <style>
        /* فقط CSS الضروري للعرض الأولي */
        /* الحد الأقصى 15KB -->
    </style>
    
    <!-- Non-critical CSS async -->
    <link rel="stylesheet" href="main.css" 
          media="print" 
          onload="this.media='all'">
    
    <!-- Preload الموارد الحاسمة -->
    <link rel="preload" href="fonts/cairo.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- DNS Prefetch للموارد الخارجية -->
    <link rel="dns-prefetch" href="https://cdn.example.com">
</head>
<body>
    <!-- المحتوى -->
    
    <!-- Scripts الحاسمة -->
    <script src="critical.js"></script>
    
    <!-- Scripts العادية مع defer -->
    <script src="main.js" defer></script>
    
    <!-- Service Worker -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js');
            });
        }
    </script>
</body>
</html>
```

---

## 2️⃣ تحسين CSS

### ✅ القواعد الذهبية
```css
/* 1. استخدم Custom Properties للألوان المتكررة */
:root {
    --primary: #D4845C;
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 2. استخدم Calc بدلاً من Preprocessors */
.element {
    width: calc(100% - 20px);
    font-size: clamp(16px, 2vw, 20px);
}

/* 3. تجنب الـ Specificity العالية */
/* ❌ سيء */
body div.container .item > span { color: red; }

/* ✅ جيد */
.item__text { color: red; }

/* 4. استخدم will-change بحذر */
.animate-element {
    will-change: transform; /* فقط للعناصر المتحركة */
}

/* 5. تجنب الـ Reflows */
/* ❌ سيء */
.card {
    width: 100%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* ✅ جيد - استخدم shorthand */
.card {
    width: 100%;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    box-shadow: var(--shadow-sm);
}
```

### ✅ التحسينات المحددة

```css
/* للهواتف الضعيفة */
@media (hover: none) and (pointer: coarse) {
    /* تعطيل الأنيميشنات على اللمس */
    * {
        animation: none !important;
        transition: none !important;
    }
}

/* احترام تفضيلات الحركة */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

/* الاتصالات البطيئة */
@media (prefers-reduced-data: reduce) {
    img {
        /* استخدم صور مبسطة */
        background-image: url('low-res.jpg');
    }
}
```

---

## 3️⃣ تحسين JavaScript

### ✅ الممارسات الفضلى

```javascript
// ❌ تجنب الـ Global Variables
window.myVar = 'value'; // سيء

// ✅ استخدم Modules
const myModule = (() => {
    const privateVar = 'value';
    return {
        publicMethod() { /* ... */ }
    };
})();

// ❌ تجنب DOM Queries المتكررة
for (let i = 0; i < 1000; i++) {
    document.querySelector('.item').textContent = i;
}

// ✅ احفظ المراجع
const element = document.querySelector('.item');
for (let i = 0; i < 1000; i++) {
    element.textContent = i;
}

// ❌ تجنب synchronous operations
data.forEach(item => {
    const element = document.createElement('div');
    element.textContent = item;
    document.body.appendChild(element); // Reflow في كل iteration
});

// ✅ استخدم DocumentFragment
const fragment = document.createDocumentFragment();
data.forEach(item => {
    const element = document.createElement('div');
    element.textContent = item;
    fragment.appendChild(element);
});
document.body.appendChild(fragment); // Reflow مرة واحدة فقط

// ❌ تجنب البلوكينج
fetch('/data').then(r => r.json()).then(data => {
    processData(data); // يحجب الـ UI
});

// ✅ استخدم Web Workers
// main.js
const worker = new Worker('worker.js');
worker.postMessage(data);
worker.onmessage = (e) => {
    console.log(e.data); // النتيجة بدون حجب UI
};

// worker.js
self.onmessage = (e) => {
    const result = processData(e.data);
    self.postMessage(result);
};

// ❌ تجنب setInterval
setInterval(() => {
    updateUI();
}, 1000); // استهلاك طاقة عالي

// ✅ استخدم requestAnimationFrame
function update() {
    updateUI();
    requestAnimationFrame(update);
}
update();

// ❌ تجنب الـ Debounce السيء
window.addEventListener('scroll', () => {
    handleScroll(); // يُستدعى مئات المرات
});

// ✅ استخدم Debounce/Throttle
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

window.addEventListener('scroll', debounce(handleScroll, 200));
```

### ✅ كشف الجهاز بذكاء

```javascript
// كشف الموارد المتاحة
const capabilities = {
    // الذاكرة
    lowMemory: navigator.deviceMemory <= 2,
    
    // الاتصال
    slowConnection: !navigator.connection || 
                   ['2g', '3g'].includes(navigator.connection.effectiveType),
    
    // المعالج
    lowPower: navigator.hardwareConcurrency <= 2,
    
    // الشاشة
    lowResolution: window.devicePixelRatio < 1.5,
    
    // الإمكانيات
    supportsWebP: (() => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
    })(),
    
    supportsServiceWorker: 'serviceWorker' in navigator,
    supportsIndexedDB: !!window.indexedDB
};

// التطبيق بناءً على الموارد
if (capabilities.lowMemory) {
    // تحميل موارد محدودة
    document.documentElement.classList.add('low-memory');
}

if (capabilities.slowConnection) {
    // صور مبسطة
    document.documentElement.classList.add('slow-connection');
}
```

---

## 4️⃣ تحسين الصور

### ✅ الاستراتيجية المثالية

```html
<!-- 1. استخدم Picture Element -->
<picture>
    <!-- WebP للمتصفحات الحديثة -->
    <source srcset="hero-large.webp 1200w,
                    hero-medium.webp 800w,
                    hero-small.webp 400w" 
            type="image/webp"
            media="(min-width: 768px)">
    
    <!-- JPEG للمتصفحات الأقدم -->
    <source srcset="hero-large.jpg 1200w,
                    hero-medium.jpg 800w,
                    hero-small.jpg 400w" 
            media="(min-width: 768px)">
    
    <!-- Fallback mobile -->
    <img src="hero-small.jpg" 
         loading="lazy"
         decoding="async"
         alt="Hero image">
</picture>

<!-- 2. استخدم SVG للأيقونات -->
<svg aria-hidden="true" class="icon">
    <use href="#icon-menu"></use>
</svg>

<!-- 3. استخدم CSS Sprites أو SVG Symbols -->
<svg style="display: none;">
    <symbol id="icon-menu"><!-- ... --></symbol>
    <symbol id="icon-search"><!-- ... --></symbol>
</svg>
```

### ✅ تحسين الأداء

```javascript
// Lazy Loading images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.srcset = img.dataset.srcset;
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
```

---

## 5️⃣ تحسين الخطوط

### ✅ تحميل محسّن

```css
/* استخدم font-display */
@font-face {
    font-family: 'Cairo';
    src: url('cairo.woff2') format('woff2'),
         url('cairo.woff') format('woff');
    font-display: swap; /* يظهر النص فوراً ثم يستبدل الخط */
}

/* font-display الخيارات:
   - auto: السلوك الافتراضي (3 ثواني انتظار)
   - block: 3 ثواني انتظار، ثم fallback
   - swap: ظهور فوري، استبدال فوري
   - fallback: انتظار 100ms، ثم fallback محسّن
   - optional: انتظار 100ms، قد لا يُستخدم
*/
```

### ✅ تقليل الأوزان

```bash
# استخدم Font Subsetting
# قم بـ subset فقط الأحرف المستخدمة

# قبل: cairo.woff2 = 200KB
# بعد (Arabic + Latin): = 80KB

# أدوات:
# - Google Fonts (مع subsetting مدمج)
# - FontTools
# - Glyphhanger
```

---

## 6️⃣ تحسين الشبكة

### ✅ تقليل الطلبات

```javascript
// ❌ طلبات متعددة
fetch('/api/user');
fetch('/api/settings');
fetch('/api/notifications');

// ✅ طلب واحد
fetch('/api/init').then(r => r.json()).then(data => {
    // {user, settings, notifications}
});

// ❌ صور منفصلة
<img src="icon-home.png">
<img src="icon-search.png">
<img src="icon-menu.png">

// ✅ SVG Sprite
<svg><use href="#icon-home"></use></svg>
<svg><use href="#icon-search"></use></svg>
<svg><use href="#icon-menu"></use></svg>
```

### ✅ استراتيجيات الـ Caching

```javascript
// Cache First (للملفات الثابتة)
async function cacheFirst(request) {
    const cache = await caches.open('static');
    const cached = await cache.match(request);
    if (cached) return cached;
    
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
}

// Network First (للبيانات الحية)
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        const cache = await caches.open('dynamic');
        cache.put(request, response.clone());
        return response;
    } catch {
        return await caches.match(request);
    }
}

// Stale While Revalidate (للمحتوى)
async function staleWhileRevalidate(request) {
    const cache = await caches.open('content');
    const cached = await cache.match(request);
    
    const fresh = fetch(request).then(r => {
        cache.put(request, r.clone());
        return r;
    });
    
    return cached || fresh;
}
```

---

## 7️⃣ اختبار الأداء

### ✅ الأدوات والقياسات

```javascript
// قياس الأداء يدوياً
console.time('operation');
// ... code ...
console.timeEnd('operation');

// استخدام Performance API
const mark1 = performance.mark('start');
// ... code ...
const mark2 = performance.mark('end');
performance.measure('duration', 'start', 'end');

const measure = performance.getEntriesByName('duration')[0];
console.log(`Duration: ${measure.duration}ms`);

// قياس الـ Long Tasks
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        console.log('Long Task:', entry.duration);
    }
});

observer.observe({entryTypes: ['longtask']});
```

---

## 8️⃣ الأمان والأداء

### ✅ توازن الأمان والسرعة

```javascript
// ❌ قد يكون بطيء
const sanitize = (html) => {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
};

// ✅ استخدم DOMPurify
<script src="https://cdn.jsdelivr.net/npm/dompurify@2/dist/purify.min.js"></script>

const clean = DOMPurify.sanitize(userInput);
```

---

## 🎯 قائمة التحقق النهائية

```
HTML:
☐ Meta viewport صحيح
☐ CSS حاسم inline
☐ JS حاسم في النهاية
☐ لا توجد render-blocking resources

CSS:
☐ Minified و Compressed
☐ Critical CSS منفصل
☐ لا توجد CSS غير مستخدمة
☐ استخدام Custom Properties

JavaScript:
☐ Minified و Compressed
☐ تأجيل غير الضروري (defer/async)
☐ لا توجد memory leaks
☐ Event delegation بدلاً من listeners متعددة

الصور:
☐ WebP format
☐ Responsive sizes
☐ Lazy Loading
☐ Compressed

الخطوط:
☐ Font subsetting
☐ font-display: swap
☐ محدود العدد (2-3 فقط)
☐ Hosted locally أو CDN محسّن

السيرفر:
☐ Gzip enabled
☐ Caching headers
☐ HTTPS/HTTP2
☐ CDN configured
```

---

**الهدف: تحقيق نتائج Lighthouse 90+**

✅ Performance: 90+  
✅ Accessibility: 90+  
✅ Best Practices: 95+  
✅ SEO: 95+  

---

**آخر تحديث:** يناير 2026
