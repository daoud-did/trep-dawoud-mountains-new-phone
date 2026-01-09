/**
 * TREP DAWOUD - Breadcrumb Navigation System
 * Automatically generates breadcrumb navigation for all pages
 */

class BreadcrumbNavigator {
    constructor() {
        this.pageNames = {
            'index.html': 'الرئيسية',
            'mountains.html': 'الجبال',
            'blog.html': 'المدونة',
            'courses.html': 'الدورات',
            'services.html': 'الخدمات',
            'question.html': 'أسئلة',
            'dashboard.html': 'لوحة التحكم',
            'login.html': 'تسجيل الدخول',
            'signup.html': 'إنشاء حساب',
            'profile.html': 'الملف الشخصي',
            'mountains.html': 'الجبال'
        };
    }

    /**
     * Get current page name
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        return fileName;
    }

    /**
     * Get page display name
     */
    getPageDisplayName(fileName) {
        return this.pageNames[fileName] || fileName.replace('.html', '');
    }

    /**
     * Create breadcrumb HTML
     */
    createBreadcrumb() {
        const currentPage = this.getCurrentPage();
        const displayName = this.getPageDisplayName(currentPage);

        const breadcrumbHTML = `
            <div class="breadcrumb">
                <div class="breadcrumb-content">
                    <span class="breadcrumb-item">
                        <a href="index.html" class="breadcrumb-link">
                            <i class="fas fa-home"></i>
                            الرئيسية
                        </a>
                    </span>
                    <span class="breadcrumb-separator">/</span>
                    <span class="breadcrumb-item">
                        <span class="breadcrumb-text active">${displayName}</span>
                    </span>
                </div>
            </div>
        `;

        return breadcrumbHTML;
    }

    /**
     * Insert breadcrumb after header
     */
    insertBreadcrumb() {
        const header = document.querySelector('.header');
        if (header) {
            const breadcrumbHTML = this.createBreadcrumb();
            header.insertAdjacentHTML('afterend', breadcrumbHTML);
        } else {
            console.warn('Header element not found. Breadcrumb not inserted.');
        }
    }

    /**
     * Initialize breadcrumb
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.insertBreadcrumb());
        } else {
            this.insertBreadcrumb();
        }
    }
}

// Auto-initialize breadcrumb on page load
const breadcrumbNav = new BreadcrumbNavigator();
breadcrumbNav.init();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BreadcrumbNavigator };
}
