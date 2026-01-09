// Performance Optimization Script
// Implements lazy loading, efficient event handling, and memory management

(function() {
    'use strict';

    // Lazy Loading for Images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px'
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Debounce function for event handlers
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for frequent events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimize scroll events
    function initScrollOptimization() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Handle scroll effects here
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Reduce DOM queries by caching selectors
    const cachedElements = {};
    
    function getElement(selector) {
        if (!cachedElements[selector]) {
            cachedElements[selector] = document.querySelector(selector);
        }
        return cachedElements[selector];
    }

    // Optimize animations for weak devices
    function checkDevicePerformance() {
        const ua = navigator.userAgent;
        const isWeakDevice = /Android 4|Android 5|iPhone 5|iPhone 6/.test(ua);
        
        if (isWeakDevice) {
            document.body.classList.add('weak-device');
        }

        // Check memory
        if (performance.memory) {
            const usedMemory = performance.memory.usedJSHeapSize;
            const totalMemory = performance.memory.jsHeapSizeLimit;
            const usagePercent = (usedMemory / totalMemory) * 100;
            
            if (usagePercent > 80) {
                console.warn('High memory usage detected');
                document.body.classList.add('high-memory-usage');
            }
        }
    }

    // Defer non-critical script loading
    function deferNonCriticalScripts() {
        const nonCriticalScripts = [
            'js/blog.js',
            'js/services.js',
            'js/mountains.js',
            'js/interactions.js'
        ];

        nonCriticalScripts.forEach(script => {
            const el = document.createElement('script');
            el.src = script;
            el.defer = true;
            document.head.appendChild(el);
        });
    }

    // Optimize event listeners with event delegation
    function initEventDelegation() {
        // Delegate click events to parent container
        const container = document.body;
        
        if (container) {
            container.addEventListener('click', function(event) {
                // Handle delegated events
                if (event.target.matches('.blog-card')) {
                    // Handle blog card click
                }
                if (event.target.matches('.service-card')) {
                    // Handle service card click
                }
            });
        }
    }

    // Prefetch critical resources
    function prefetchResources() {
        const criticalLinks = [
            'index.html',
            'blog.html',
            'services.html'
        ];

        criticalLinks.forEach(link => {
            const el = document.createElement('link');
            el.rel = 'prefetch';
            el.href = link;
            document.head.appendChild(el);
        });
    }

    // Monitor performance
    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                const renderTime = perfData.domComplete - perfData.domLoading;
                
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`Connect Time: ${connectTime}ms`);
                console.log(`Render Time: ${renderTime}ms`);
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initLazyLoading();
        initScrollOptimization();
        checkDevicePerformance();
        initEventDelegation();
        prefetchResources();
        logPerformanceMetrics();
    }

    // Export for use in other scripts
    window.PerformanceOptimization = {
        debounce,
        throttle,
        getElement
    };
})();
