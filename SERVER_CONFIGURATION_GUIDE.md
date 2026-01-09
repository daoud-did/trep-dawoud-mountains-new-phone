# Server Configuration Guide - Performance Optimization

## 1. Apache Server Configuration

If you have an existing `.htaccess` file, add these configurations:

### GZIP Compression
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
    SetEnvIfNoCase Request_URI \.(?:gif|jpe?g|png|webp)$ no-gzip dont-vary
</IfModule>
```

### Browser Caching
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
    ExpiresDefault "access plus 2 days"
</IfModule>
```

### HTTP Headers
```apache
<IfModule mod_headers.c>
    <FilesMatch "\.(jpg|jpeg|png|gif|webp|woff2|svg)$">
        Header set Cache-Control "public, immutable, max-age=31536000"
    </FilesMatch>
    <FilesMatch "\.(css|js)$">
        Header set Cache-Control "public, max-age=2592000"
    </FilesMatch>
    <FilesMatch "\.(html|htm)$">
        Header set Cache-Control "public, max-age=86400"
    </FilesMatch>
</IfModule>
```

## 2. Nginx Configuration

If using Nginx, add to your server block:

```nginx
# Enable Gzip compression
gzip on;
gzip_types text/html text/plain text/css text/javascript application/javascript application/json image/svg+xml;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;

# Browser caching
location ~* \.(jpg|jpeg|png|gif|webp|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(css|js|woff|woff2|ttf|otf)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000";
}

location ~* \.(html|htm)$ {
    expires 1d;
    add_header Cache-Control "public, max-age=86400";
}

# Security headers
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()";

# HTTP/2 Push
http2_push_preload on;
```

## 3. CloudFlare Configuration (if using CDN)

1. **Caching Rules:**
   - Set cache level to "Cache Everything" for static assets
   - Set TTL to 1 year for images, CSS, JS
   - Set TTL to 1 day for HTML files

2. **Compression:**
   - Enable Brotli compression
   - Enable Gzip compression

3. **Speed:**
   - Enable Rocket Loader (async JS loading)
   - Enable Auto Minify (CSS, JavaScript, HTML)
   - Enable HTTP/2

4. **Reliability:**
   - Enable Always Online
   - Set page rules for specific paths if needed

## 4. Critical Path Optimization

### Priority 1 (Above-fold):
- Inline critical CSS in `<head>`
- Preload critical fonts
- Defer all non-critical JavaScript

### Priority 2 (Below-fold):
- Async load non-critical CSS
- Lazy load images
- Defer non-essential scripts

### Priority 3 (Background):
- Load analytics asynchronously
- Load third-party scripts (ads, social) with async/defer

## 5. Font Loading Strategy

### Current (Optimal):
```html
<!-- System fonts for base (no network request) -->
font-family: system-ui, -apple-system, 'Segoe UI', 'Cairo', sans-serif;

<!-- Optional: Only if Cairo font is critical -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

### Alternative (Faster):
Remove Cairo font entirely and use system fonts only.

## 6. Image Optimization Recommendations

### Format Selection:
- **WebP**: Modern browsers (with JPEG fallback)
- **JPEG**: Photography and complex images
- **PNG**: Icons and graphics
- **SVG**: Logos and vector graphics

### Size Optimization:
- Mobile: 1x resolution, max 768px width
- Tablet: 1.5x resolution, max 1024px width
- Desktop: 2x resolution, max 1920px width

### Tools:
- ImageOptim (Mac)
- ImageMagick (CLI)
- TinyPNG (online)
- Cloudinary (managed service)

## 7. Database Optimization (if applicable)

1. **Query Optimization:**
   - Index frequently searched columns
   - Use prepared statements
   - Limit results with pagination

2. **Caching:**
   - Implement Redis/Memcached for frequently accessed data
   - Cache API responses (30-60 minutes)
   - Cache database query results

3. **Database Indexes:**
   - Index on search columns
   - Index on foreign keys
   - Regular maintenance/optimization

## 8. Content Delivery Network (CDN)

### Recommended Options:
1. **CloudFlare** (Free tier available)
2. **KeyCDN** (Pay as you go)
3. **Bunny CDN** (Very affordable)
4. **AWS CloudFront** (Enterprise)

### Benefits:
- Faster content delivery globally
- DDoS protection
- Automatic GZIP compression
- HTTP/2 support
- SSL/TLS encryption

## 9. Performance Monitoring Services

### Free Options:
1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev
   - Provides LCP, FID, CLS metrics

2. **Google Lighthouse**
   - Built into Chrome DevTools
   - Tests: Performance, SEO, Accessibility

3. **WebPageTest**
   - URL: https://www.webpagetest.org
   - Free waterfall charts and detailed analysis

### Paid Options:
1. **Datadog** - Full APM and monitoring
2. **New Relic** - Application performance monitoring
3. **Pingdom** - Uptime and performance monitoring

## 10. Testing Checklist

### Desktop Testing:
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Safari (Latest)
- [ ] Edge (Latest)

### Mobile Testing:
- [ ] iPhone 6 (Safari, low-end device)
- [ ] iPhone 12 (Safari, high-end device)
- [ ] Samsung A10 (Chrome, low-end Android)
- [ ] Samsung S22 (Chrome, high-end Android)

### Network Conditions:
- [ ] 4G (Fast)
- [ ] 3G (Normal)
- [ ] 2G (Slow)
- [ ] Offline

### Performance Checks:
- [ ] Lighthouse Score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TTFB < 600ms

## 11. Deployment Checklist

Before going live:

1. **Minification:**
   - [ ] CSS minified (main.min.css)
   - [ ] JavaScript minified (app.min.js)
   - [ ] HTML minified

2. **Images:**
   - [ ] All images optimized
   - [ ] WebP versions created with JPEG fallback
   - [ ] Proper alt text on all images

3. **Caching:**
   - [ ] Browser cache configured
   - [ ] CDN configured (if using)
   - [ ] Server compression enabled

4. **Performance:**
   - [ ] Critical CSS inlined
   - [ ] Non-critical CSS deferred
   - [ ] Scripts using async/defer where appropriate
   - [ ] Lazy loading implemented

5. **Security:**
   - [ ] SSL/TLS certificate installed
   - [ ] Security headers configured
   - [ ] No sensitive data in client-side code
   - [ ] Form validation on both client and server

6. **SEO:**
   - [ ] Meta descriptions set
   - [ ] Proper heading hierarchy
   - [ ] Sitemap.xml submitted
   - [ ] robots.txt configured

7. **Monitoring:**
   - [ ] PageSpeed Insights configured
   - [ ] Analytics installed
   - [ ] Error tracking enabled
   - [ ] Performance monitoring active

## 12. Performance Maintenance

### Daily:
- Monitor error logs
- Check uptime status
- Review performance metrics

### Weekly:
- Review Core Web Vitals
- Check for broken links
- Monitor server resources

### Monthly:
- Optimize slow pages
- Update security patches
- Review analytics
- Test across devices

### Quarterly:
- Full performance audit
- Security audit
- Update dependencies
- Review and optimize images

## 13. Quick Performance Wins

1. **Enable GZIP** - 60-80% reduction in file sizes
2. **Optimize Images** - 30-50% reduction
3. **Minify CSS/JS** - 20-30% reduction
4. **Leverage Browser Cache** - Faster repeat visits
5. **Use CDN** - Faster content delivery globally
6. **Defer JavaScript** - Faster page load
7. **Lazy Load Images** - Faster initial load
8. **Reduce Third-Party Scripts** - Huge performance impact

## 14. Performance Targets

### Core Web Vitals:
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

### Load Time Targets:
- **First Contentful Paint (FCP):** < 1.8 seconds
- **Time to Interactive (TTI):** < 3.8 seconds
- **Speed Index:** < 3.4 seconds

### File Size Targets:
- **HTML:** < 50 KB
- **CSS:** < 30 KB
- **JavaScript:** < 50 KB
- **Images (above-fold):** < 100 KB
- **Total page:** < 200 KB

---

For implementation help or specific questions about your hosting provider, refer to their documentation or contact their support team.
