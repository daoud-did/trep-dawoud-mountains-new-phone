/**
 * TREP DAWOUD - Performance Analytics & Monitoring
 * قياس الأداء والمراقبة الحقيقية
 */

(function() {
    'use strict';

    const PerformanceMonitor = {
        // ============================================
        // 1️⃣ قياس الأداء الأساسية
        // ============================================
        
        metrics: {},
        
        init() {
            this.measurePerformance();
            this.monitorVitals();
            this.reportMetrics();
        },
        
        measurePerformance() {
            if (!window.performance) return;
            
            const perfData = window.performance.timing;
            const perfEntries = performance.getEntriesByType('navigation')[0];
            
            this.metrics = {
                // الأوقات الرئيسية
                navigationStart: perfData.navigationStart,
                domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                pageLoadComplete: perfData.loadEventEnd - perfData.navigationStart,
                timeToFirstByte: perfData.responseStart - perfData.navigationStart,
                domInteractive: perfData.domInteractive - perfData.navigationStart,
                
                // تفاصيل التحميل
                dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
                tcpConnection: perfData.connectEnd - perfData.connectStart,
                requestTime: perfData.responseStart - perfData.requestStart,
                responseTime: perfData.responseEnd - perfData.responseStart,
                renderTime: perfData.domComplete - perfData.domLoading,
                
                // معلومات الموارد
                resourcesCount: performance.getEntriesByType('resource').length,
                totalResourceSize: this.getTotalResourceSize()
            };
            
            // الموارد الثقيلة
            this.metrics.heavyResources = this.getHeavyResources();
        },
        
        getTotalResourceSize() {
            let total = 0;
            const resources = performance.getEntriesByType('resource');
            
            resources.forEach(resource => {
                if (resource.transferSize !== undefined) {
                    total += resource.transferSize;
                } else if (resource.encodedBodySize !== undefined) {
                    total += resource.encodedBodySize;
                }
            });
            
            return (total / 1024).toFixed(2) + ' KB';
        },
        
        getHeavyResources() {
            const resources = performance.getEntriesByType('resource')
                .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
                .slice(0, 5);
            
            return resources.map(r => ({
                name: r.name.split('/').pop(),
                size: ((r.transferSize || 0) / 1024).toFixed(2) + ' KB',
                duration: r.duration.toFixed(2) + 'ms'
            }));
        },
        
        // ============================================
        // 2️⃣ مراقبة Core Web Vitals
        // ============================================
        
        monitorVitals() {
            // Largest Contentful Paint (LCP)
            this.observeLCP();
            
            // First Input Delay (FID)
            this.observeFID();
            
            // Cumulative Layout Shift (CLS)
            this.observeCLS();
            
            // First Contentful Paint (FCP)
            this.observeFCP();
        },
        
        observeLCP() {
            if (!window.PerformanceObserver) return;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.LCP = {
                    time: lastEntry.renderTime || lastEntry.loadTime,
                    element: lastEntry.element?.tagName || 'N/A'
                };
                
                console.log(`📊 LCP: ${this.metrics.LCP.time.toFixed(0)}ms`);
            });
            
            try {
                observer.observe({type: 'largest-contentful-paint', buffered: true});
            } catch (e) {
                console.warn('LCP observer not supported');
            }
        },
        
        observeFID() {
            if (!window.PerformanceObserver) return;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                
                entries.forEach((entry) => {
                    this.metrics.FID = entry.processingDuration;
                    console.log(`⚡ FID: ${entry.processingDuration.toFixed(0)}ms`);
                });
            });
            
            try {
                observer.observe({type: 'first-input', buffered: true});
            } catch (e) {
                // FID قد لا يكون متاحاً في بعض المتصفحات
                console.warn('FID observer not supported');
            }
        },
        
        observeCLS() {
            if (!window.PerformanceObserver) return;
            
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                
                this.metrics.CLS = clsValue;
                console.log(`🔄 CLS: ${clsValue.toFixed(3)}`);
            });
            
            try {
                observer.observe({type: 'layout-shift', buffered: true});
            } catch (e) {
                console.warn('CLS observer not supported');
            }
        },
        
        observeFCP() {
            if (!window.PerformanceObserver) return;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                
                entries.forEach((entry) => {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.FCP = entry.startTime;
                        console.log(`🎨 FCP: ${entry.startTime.toFixed(0)}ms`);
                    }
                });
            });
            
            try {
                observer.observe({entryTypes: ['paint']});
            } catch (e) {
                console.warn('FCP observer not supported');
            }
        },
        
        // ============================================
        // 3️⃣ مراقبة الذاكرة والبطارية
        // ============================================
        
        monitorMemory() {
            if (performance.memory) {
                this.metrics.memory = {
                    usedHeap: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                    totalHeap: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
                    jsHeapLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
                };
                
                console.log(`💾 Memory:`, this.metrics.memory);
            }
        },
        
        monitorBattery() {
            if ('getBattery' in navigator) {
                navigator.getBattery().then(battery => {
                    this.metrics.battery = {
                        level: (battery.level * 100).toFixed(0) + '%',
                        charging: battery.charging ? 'Yes' : 'No',
                        chargingTime: battery.chargingTime,
                        dischargingTime: (battery.dischargingTime / 3600).toFixed(0) + ' hours'
                    };
                    
                    console.log(`🔋 Battery:`, this.metrics.battery);
                });
            }
        },
        
        // ============================================
        // 4️⃣ تقارير شاملة
        // ============================================
        
        reportMetrics() {
            // تقرير بعد تحميل الصفحة
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.monitorMemory();
                    this.monitorBattery();
                    this.printReport();
                }, 1000);
            });
        },
        
        printReport() {
            const report = `
╔════════════════════════════════════════════════════════════╗
║          TREP DAWOUD - PERFORMANCE REPORT                  ║
╚════════════════════════════════════════════════════════════╝

📊 CORE WEB VITALS:
   ✓ FCP (First Contentful Paint): ${(this.metrics.FCP || 0).toFixed(0)}ms
   ✓ LCP (Largest Contentful Paint): ${(this.metrics.LCP?.time || 0).toFixed(0)}ms
   ✓ FID (First Input Delay): ${(this.metrics.FID || 0).toFixed(0)}ms
   ✓ CLS (Cumulative Layout Shift): ${(this.metrics.CLS || 0).toFixed(3)}

⏱️ TIMING METRICS:
   ✓ DNS Lookup: ${this.metrics.dnsLookup.toFixed(0)}ms
   ✓ TCP Connection: ${this.metrics.tcpConnection.toFixed(0)}ms
   ✓ Request Time: ${this.metrics.requestTime.toFixed(0)}ms
   ✓ Response Time: ${this.metrics.responseTime.toFixed(0)}ms
   ✓ DOM Interactive: ${this.metrics.domInteractive.toFixed(0)}ms
   ✓ DOM Content Loaded: ${this.metrics.domContentLoaded.toFixed(0)}ms
   ✓ Page Load Complete: ${this.metrics.pageLoadComplete.toFixed(0)}ms
   ✓ Total Render Time: ${this.metrics.renderTime.toFixed(0)}ms

📦 RESOURCES:
   ✓ Total Requests: ${this.metrics.resourcesCount}
   ✓ Total Size: ${this.metrics.totalResourceSize}
   
   Top 5 Heavy Resources:
${this.metrics.heavyResources.map(r => `      - ${r.name}: ${r.size} (${r.duration})`).join('\n')}

${this.metrics.memory ? `💾 MEMORY USAGE:
   ✓ Used Heap: ${this.metrics.memory.usedHeap}
   ✓ Total Heap: ${this.metrics.memory.totalHeap}
   ✓ Heap Limit: ${this.metrics.memory.jsHeapLimit}
` : ''}

${this.metrics.battery ? `🔋 BATTERY STATUS:
   ✓ Level: ${this.metrics.battery.level}
   ✓ Charging: ${this.metrics.battery.charging}
   ✓ Discharging Time: ${this.metrics.battery.dischargingTime}
` : ''}

🎯 PERFORMANCE SCORE:
   ${this.calculatePerformanceScore()}

═══════════════════════════════════════════════════════════════
            Generated at ${new Date().toLocaleString()}
═══════════════════════════════════════════════════════════════
            `;
            
            console.log(report);
            
            // حفظ البيانات محلياً
            this.saveMetrics();
        },
        
        calculatePerformanceScore() {
            let score = 100;
            
            // نقص النقاط بناءً على الأداء
            if (this.metrics.FCP > 1500) score -= 10;
            if (this.metrics.LCP?.time > 2500) score -= 20;
            if (this.metrics.pageLoadComplete > 5000) score -= 15;
            if (this.metrics.resourcesCount > 50) score -= 10;
            if (this.metrics.CLS > 0.1) score -= 10;
            
            const rating = score >= 90 ? '🟢 ممتاز' : 
                          score >= 70 ? '🟡 جيد' : 
                          score >= 50 ? '🔴 متوسط' : '🔴 ضعيف';
            
            return `${score}/100 - ${rating}`;
        },
        
        saveMetrics() {
            const metrics = {
                timestamp: new Date().toISOString(),
                ...this.metrics
            };
            
            try {
                let history = JSON.parse(localStorage.getItem('performance-history') || '[]');
                history.push(metrics);
                
                // احتفظ بآخر 10 قياسات فقط
                if (history.length > 10) {
                    history = history.slice(-10);
                }
                
                localStorage.setItem('performance-history', JSON.stringify(history));
                console.log('💾 Metrics saved to localStorage');
            } catch (e) {
                console.warn('Could not save metrics:', e);
            }
        },
        
        // عرض السجل التاريخي
        showHistory() {
            try {
                const history = JSON.parse(localStorage.getItem('performance-history') || '[]');
                console.table(history.map(m => ({
                    Date: new Date(m.timestamp).toLocaleString(),
                    'FCP (ms)': m.FCP?.toFixed(0),
                    'LCP (ms)': m.LCP?.time.toFixed(0),
                    'Load Time (ms)': m.pageLoadComplete.toFixed(0),
                    Score: m.score
                })));
            } catch (e) {
                console.log('No history found');
            }
        }
    };
    
    // تهيئة المراقبة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => PerformanceMonitor.init());
    } else {
        PerformanceMonitor.init();
    }
    
    // تصدير للاستخدام
    window.PerformanceMonitor = PerformanceMonitor;
    
    console.log('✅ Performance Monitor Initialized');
    console.log('💡 Tip: Use PerformanceMonitor.showHistory() to view metrics');
})();
