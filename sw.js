/**
 * TREP DAWOUD - Service Worker
 * للتخزين المؤقت والعمل بدون اتصال
 * محسّن للأداء على الهواتف الضعيفة
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `trep-dawoud-${CACHE_VERSION}`;

// الموارد الضرورية للتخزين المؤقت
const CRITICAL_ASSETS = [
    '/',
    '/index.html',
    '/css/critical.css',
    '/css/main.min.css',
    '/js/app.critical.js',
    '/js/app.min.js',
    '/favicon.ico'
];

// أنماط الموارد للتخزين الذكي
const CACHE_STRATEGIES = {
    // Cache first (ملفات ثابتة)
    statics: [
        /\.js$/,
        /\.css$/,
        /\.woff2?$/,
        /\.ttf$/,
        /\.eot$/,
        /\.svg$/,
        /\.png$/,
        /\.jpg$/,
        /\.jpeg$/,
        /\.webp$/
    ],
    
    // Network first (بيانات حية)
    dynamic: [
        /\/api\//,
        /\/data\//,
        /\.json$/
    ],
    
    // Stale while revalidate (محتوى الموقع)
    content: [
        /\.html$/
    ]
};

// ============================================
// 1️⃣ INSTALL EVENT - تخزين الموارد الضرورية
// ============================================

self.addEventListener('install', event => {
    console.log(`🔧 Service Worker Installing: ${CACHE_NAME}`);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching critical assets...');
                return cache.addAll(CRITICAL_ASSETS)
                    .catch(err => {
                        console.warn('⚠️ Some assets failed to cache:', err);
                        // تجاهل الأخطاء - لا نريد فشل التثبيت
                    });
            })
            .then(() => self.skipWaiting()) // تفعيل فوراً
    );
});

// ============================================
// 2️⃣ ACTIVATE EVENT - تنظيف الـ Caches القديمة
// ============================================

self.addEventListener('activate', event => {
    console.log(`✅ Service Worker Activating: ${CACHE_NAME}`);
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => {
                            console.log(`🗑️ Deleting old cache: ${name}`);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim()) // تحكم فوري
    );
});

// ============================================
// 3️⃣ FETCH EVENT - الاستراتيجيات الذكية
// ============================================

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // تجاهل الطلبات غير الـ GET
    if (event.request.method !== 'GET') {
        return;
    }
    
    // تجاهل الطلبات الخارجية تماماً (CDN)
    if (url.origin !== self.location.origin) {
        return event.respondWith(fetch(event.request));
    }
    
    const pathname = url.pathname;
    
    // تحديد الاستراتيجية المناسبة
    if (isStaticAsset(pathname)) {
        // استراتيجية Cache First (لا تتغير)
        event.respondWith(cacheFirst(event.request));
    } else if (isDynamicAsset(pathname)) {
        // استراتيجية Network First (بيانات حية)
        event.respondWith(networkFirst(event.request));
    } else if (isContent(pathname)) {
        // استراتيجية Stale While Revalidate (محتوى)
        event.respondWith(staleWhileRevalidate(event.request));
    }
});

// ============================================
// 4️⃣ CACHE STRATEGIES
// ============================================

/**
 * استراتيجية Cache First
 * للملفات الثابتة (JS, CSS, الخطوط)
 */
async function cacheFirst(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        
        if (cached) {
            console.log(`📦 Cache hit: ${request.url}`);
            return cached;
        }
        
        // ليس في الـ Cache، جلب من الشبكة
        const response = await fetch(request);
        
        // تخزين النتيجة إذا كانت ناجحة
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        console.warn(`❌ Cache first failed for ${request.url}:`, error);
        
        // محاولة إرجاع من الـ Cache حتى بدون اتصال
        const cache = await caches.open(CACHE_NAME);
        return await cache.match(request) || offlineResponse();
    }
}

/**
 * استراتيجية Network First
 * للبيانات الحية (API)
 */
async function networkFirst(request) {
    try {
        // محاولة الشبكة أولاً
        const response = await fetch(request);
        
        if (response.ok) {
            // تخزين النسخة الحديثة
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
            console.log(`🌐 Network fresh: ${request.url}`);
        }
        
        return response;
    } catch (error) {
        console.warn(`❌ Network first failed for ${request.url}:`, error);
        
        // إذا فشل الشبكة، استخدم الـ Cache
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        
        if (cached) {
            console.log(`📦 Using cached (offline): ${request.url}`);
            return cached;
        }
        
        // لا شيء متاح
        return offlineResponse();
    }
}

/**
 * استراتيجية Stale While Revalidate
 * للمحتوى (HTML Pages)
 */
async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    
    // إرجاع النسخة المخزنة فوراً
    const freshResponse = fetch(request).then(response => {
        if (response.ok) {
            cache.put(request, response.clone());
            console.log(`🔄 Revalidated: ${request.url}`);
        }
        return response;
    }).catch(() => {
        console.log(`❌ Revalidation failed for ${request.url}`);
        return cached || offlineResponse();
    });
    
    return cached || freshResponse;
}

// ============================================
// 5️⃣ HELPER FUNCTIONS
// ============================================

function isStaticAsset(pathname) {
    return CACHE_STRATEGIES.statics.some(pattern => pattern.test(pathname));
}

function isDynamicAsset(pathname) {
    return CACHE_STRATEGIES.dynamic.some(pattern => pattern.test(pathname));
}

function isContent(pathname) {
    return CACHE_STRATEGIES.content.some(pattern => pattern.test(pathname));
}

/**
 * صفحة offline بسيطة
 */
function offlineResponse() {
    return new Response(
        `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>بدون اتصال</title>
    <style>
        body { 
            font-family: system-ui; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
            margin: 0; 
            background: #f5f5f5;
        }
        .offline { 
            text-align: center; 
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 { color: #333; }
        p { color: #666; margin: 1rem 0; }
        button { 
            padding: 10px 20px; 
            background: #D4845C; 
            color: white; 
            border: none; 
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
        }
        button:hover { background: #B8623D; }
    </style>
</head>
<body>
    <div class="offline">
        <h1>📵 بدون اتصال إنترنت</h1>
        <p>يرجى التحقق من اتصال الإنترنت والمحاولة مجدداً</p>
        <button onclick="location.reload()">إعادة محاولة</button>
    </div>
</body>
</html>`,
        {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        }
    );
}

// ============================================
// 6️⃣ MESSAGE HANDLING (للتحديثات من الـ Client)
// ============================================

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(CACHE_NAME).then(() => {
            console.log('🗑️ Cache cleared');
        });
    }
});

console.log(`✅ Service Worker loaded: ${CACHE_NAME}`);
