# 🚀 إعدادات السيرفر لتحسين الأداء

## ⚡ إعدادات Apache (.htaccess)

ضع هذا الملف في جذر الموقع:

```apache
# تفعيل Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# تخزين مؤقت (Caching)
<IfModule mod_expires.c>
    ExpiresActive On
    
    # HTML - لا تخزن
    ExpiresByType text/html "access"
    
    # CSS و JavaScript - سنة واحدة
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    
    # الصور - 30 يوم
    ExpiresByType image/jpeg "access plus 30 days"
    ExpiresByType image/gif "access plus 30 days"
    ExpiresByType image/png "access plus 30 days"
    ExpiresByType image/webp "access plus 30 days"
    ExpiresByType image/svg+xml "access plus 30 days"
    
    # الخطوط - سنة واحدة
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/otf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    
    # Default
    ExpiresDefault "access plus 2 days"
</IfModule>

# تعطيل ETags
<IfModule mod_headers.c>
    Header Unset ETag
    FileETag None
</IfModule>

# إضافة Headers للأمان والأداء
<IfModule mod_headers.c>
    # Allow cross-origin for fonts
    <FilesMatch "\.(ttf|ttc|otf|eot|woff|woff2)$">
        Header add Access-Control-Allow-Origin "*"
    </FilesMatch>
    
    # Cache Control Headers
    <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$">
        Header set Cache-Control "public, max-age=31536000, immutable"
    </FilesMatch>
    
    # HTML No Cache
    <FilesMatch "\.(html|htm)$">
        Header set Cache-Control "public, max-age=3600"
    </FilesMatch>
</IfModule>

# قبول الضغط
<IfModule mod_headers.c>
    Header append Vary Accept-Encoding
</IfModule>

# تمكين HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# تعطيل الوصول للملفات الحساسة
<FilesMatch "\.env$|\.htaccess$|\.git">
    Order allow,deny
    Deny from all
</FilesMatch>
```

---

## 🔧 إعدادات Nginx

ضع هذا في `nginx.conf`:

```nginx
# Gzip Compression
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types 
    text/plain 
    text/css 
    text/xml 
    text/javascript 
    application/json 
    application/javascript 
    application/xml+rss 
    application/rss+xml 
    application/atom+xml 
    image/svg+xml 
    text/x-component 
    text/x-cross-domain-policy;

# Caching Headers
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML Files
location ~* \.(html|htm)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}

# Disable ETags
etag off;

# Add Vary Header
add_header Vary "Accept-Encoding";

# Security Headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

# HTTPS Redirect
server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    server_name _;
    
    # SSL Configuration
    ssl_certificate /path/to/cert.crt;
    ssl_certificate_key /path/to/key.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # ... باقي الإعدادات
}
```

---

## 🟢 Node.js / Express

```javascript
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// ============================================
// MIDDLEWARE للأداء
// ============================================

// Gzip Compression
app.use(compression({
    level: 6,
    threshold: 1024, // ضغط الملفات > 1KB
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// أمان
app.use(helmet());

// Logging
app.use(morgan('combined'));

// ============================================
// STATIC FILES مع تخزين مؤقت محسّن
// ============================================

const staticOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 365, // سنة واحدة
    etag: false,
    lastModified: false,
    setHeaders: (res, path) => {
        // إضافة headers مخصصة للملفات المختلفة
        if (path.endsWith('.css') || path.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (path.match(/\.(jpg|jpeg|png|gif|ico|woff|woff2|ttf)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        } else {
            res.setHeader('Cache-Control', 'public, max-age=3600');
        }
    }
};

app.use(express.static('public', staticOptions));

// ============================================
// API ROUTES مع معالجة الأخطاء
// ============================================

app.get('/api/data', (req, res) => {
    // إرسال JSON مضغوط
    res.json({
        success: true,
        data: [],
        timestamp: new Date().toISOString()
    });
});

// ============================================
// معالجة الأخطاء
// ============================================

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});

// ============================================
// بدء السيرفر
// ============================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Compression enabled`);
    console.log(`🔒 Security headers enabled`);
});
```

---

## 🐳 Docker Optimization

```dockerfile
# استخدم صورة خفيفة
FROM node:18-alpine

# اضبط متغيرات البيئة
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

WORKDIR /app

# نسخ الملفات الضرورية فقط
COPY package*.json ./
RUN npm ci --only=production

COPY . .

# تعريض المنفذ
EXPOSE 3000

# تشغيل التطبيق
CMD ["node", "server.js"]
```

---

## 📊 مثال: قياس الأداء بعد التحسينات

```bash
# 1️⃣ قياس استخدام Gzip
curl -I -H "Accept-Encoding: gzip,deflate" https://yoursite.com

# يجب أن ترى:
# Content-Encoding: gzip
# Transfer-Encoding: chunked

# 2️⃣ اختبار سرعة التحميل
time curl -o /dev/null -s -w '%{time_total}\n' https://yoursite.com

# 3️⃣ اختبار الكاشينج
curl -I https://yoursite.com/js/app.min.js

# يجب أن ترى:
# Cache-Control: public, max-age=31536000, immutable
```

---

## 🎯 قائمة تحقق الإعدادات

- [ ] ✅ Gzip Compression مفعّل
- [ ] ✅ Browser Caching محسّن
- [ ] ✅ ETags معطّل
- [ ] ✅ HTTPS/SSL مفعّل
- [ ] ✅ Security Headers مضافة
- [ ] ✅ CDN مستخدم (اختياري)
- [ ] ✅ Database Queries محسّنة
- [ ] ✅ Image Optimization مفعّل
- [ ] ✅ Minification مفعّل

---

## 🚀 النتائج المتوقعة

```
قبل التحسينات:
- حجم التحميل: 2.5 MB
- وقت التحميل: 5-8 ثواني
- Lighthouse Score: 35-45

بعد التحسينات:
- حجم التحميل: 400-600 KB (↓ 75%)
- وقت التحميل: 1-2 ثانية (↓ 70%)
- Lighthouse Score: 90+ (↑ 100%+)
```
