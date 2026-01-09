// Network and Resource Optimization
// Detects network conditions and optimizes accordingly

(function() {
    'use strict';

    class NetworkOptimizer {
        constructor() {
            this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            this.initialized = false;
        }

        init() {
            if (this.initialized) return;
            this.initialized = true;

            // Check network type
            this.checkNetworkType();
            
            // Monitor connection changes
            if (this.connection) {
                this.connection.addEventListener('change', () => {
                    this.checkNetworkType();
                });
            }

            // Optimize images based on connection
            this.optimizeImages();
            
            // Prefetch based on connection speed
            this.prefetchResources();
            
            // Lazy load based on network
            this.setupLazyLoading();
        }

        checkNetworkType() {
            if (!this.connection) return;

            const effectiveType = this.connection.effectiveType;
            const saveData = this.connection.saveData;

            // Add classes based on connection type
            const html = document.documentElement;
            html.classList.remove('connection-slow-2g', 'connection-2g', 'connection-3g', 'connection-4g');
            html.classList.add(`connection-${effectiveType}`);

            if (saveData) {
                html.classList.add('save-data-enabled');
                this.reduceBandwidth();
            }

            console.log(`Network: ${effectiveType}${saveData ? ' (Data Saver Enabled)' : ''}`);
        }

        optimizeImages() {
            const images = document.querySelectorAll('img');
            
            images.forEach(img => {
                // Add loading="lazy" for native lazy loading
                if (!img.loading) {
                    img.loading = 'lazy';
                }

                // Optimize based on connection
                if (this.connection && this.connection.effectiveType === 'slow-2g') {
                    // Disable images on very slow connections
                    img.style.opacity = '0.5';
                }
            });
        }

        prefetchResources() {
            if (!this.connection) return;

            const effectiveType = this.connection.effectiveType;

            if (effectiveType === '4g') {
                // Prefetch additional resources on fast connections
                this.prefetchLink('blog.html');
                this.prefetchLink('services.html');
            }
        }

        prefetchLink(href) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        }

        setupLazyLoading() {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                }, {
                    rootMargin: '50px'
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }

        reduceBandwidth() {
            // Reduce quality and complexity
            document.documentElement.classList.add('reduce-bandwidth');
            
            // Disable background images
            document.querySelectorAll('[style*="background-image"]').forEach(el => {
                el.style.backgroundImage = 'none';
            });

            // Remove/reduce animations
            document.querySelectorAll('[class*="animate"]').forEach(el => {
                el.style.animation = 'none';
            });
        }
    }

    class PerformanceMonitor {
        constructor() {
            this.metrics = {};
        }

        recordMetric(name, value) {
            this.metrics[name] = value;
            console.log(`[Performance] ${name}: ${value}ms`);
        }

        reportMetrics() {
            if (!window.performance || !window.performance.timing) return;

            const timing = window.performance.timing;
            const navigation = window.performance.navigation;

            const metrics = {
                'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
                'TCP Connection': timing.connectEnd - timing.connectStart,
                'Request Time': timing.responseStart - timing.requestStart,
                'Response Time': timing.responseEnd - timing.responseStart,
                'DOM Processing': timing.domComplete - timing.domLoading,
                'DOM Interactive': timing.domInteractive - timing.navigationStart,
                'Page Load Time': timing.loadEventEnd - timing.navigationStart,
                'Resource Timing': timing.responseEnd - timing.fetchStart
            };

            console.group('[Performance Metrics]');
            Object.entries(metrics).forEach(([key, value]) => {
                if (value > 0) {
                    console.log(`${key}: ${value}ms`);
                }
            });
            console.groupEnd();

            return metrics;
        }
    }

    class DeviceOptimizer {
        constructor() {
            this.isWeakDevice = this.detectWeakDevice();
            this.deviceMemory = navigator.deviceMemory || 'unknown';
            this.hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
        }

        detectWeakDevice() {
            // Check user agent for old devices
            const ua = navigator.userAgent.toLowerCase();
            const oldDevices = /android [1-5]|iphone os [1-9]_/;
            
            if (oldDevices.test(ua)) {
                return true;
            }

            // Check available memory
            if (navigator.deviceMemory && navigator.deviceMemory < 2) {
                return true;
            }

            // Check CPU cores
            if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
                return true;
            }

            return false;
        }

        init() {
            if (this.isWeakDevice) {
                console.warn('[Device] Weak device detected - applying aggressive optimizations');
                document.documentElement.classList.add('weak-device');
            }

            console.log(`[Device] Memory: ${this.deviceMemory}GB, CPU: ${this.hardwareConcurrency} cores`);
        }

        optimizeForWeakDevice() {
            // Disable complex features
            document.querySelectorAll('[style*="animation"]').forEach(el => {
                el.style.animation = 'none';
            });

            // Simplify CSS
            document.querySelectorAll('*').forEach(el => {
                el.style.transition = 'none';
            });
        }
    }

    // Initialize on page load
    function initialize() {
        const networkOptimizer = new NetworkOptimizer();
        networkOptimizer.init();

        const deviceOptimizer = new DeviceOptimizer();
        deviceOptimizer.init();

        const performanceMonitor = new PerformanceMonitor();
        
        // Report metrics after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                performanceMonitor.reportMetrics();
            }, 0);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Export for testing
    window.NetworkOptimizer = NetworkOptimizer;
    window.DeviceOptimizer = DeviceOptimizer;
    window.PerformanceMonitor = PerformanceMonitor;
})();
