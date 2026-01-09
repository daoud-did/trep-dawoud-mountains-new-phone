/**
 * TREP DAWOUD - Global Configuration
 * Central configuration for all pages and features
 */

// API Configuration
const CONFIG = {
    // App info
    APP_NAME: 'TREP DAWOUD',
    VERSION: '1.0.0',
    API_URL: 'https://api.example.com',
    
    // Storage keys
    STORAGE_USERS: 'trep_users',
    STORAGE_CURRENT_USER: 'trep_current_user',
    STORAGE_COURSES: 'trep_courses',
    STORAGE_BLOG_POSTS: 'trep_blog_posts',
    THEME_STORAGE_KEY: 'theme',
    USER_STORAGE_KEY: 'user',
    
    // Page routes
    ROUTES: {
        HOME: 'index.html',
        LOGIN: 'login.html',
        SIGNUP: 'signup.html',
        BLOG: 'pages/blog.html',
        COURSES: 'pages/courses.html',
        DASHBOARD: 'pages/dashboard.html',
        QUESTION: 'pages/question.html',
        CHAT: 'pages/chat.html',
        SERVICES: 'pages/services.html'
    },
    
    // Feature flags
    FEATURES: {
        SOCIAL_LOGIN: true,
        COURSES_ENABLED: true,
        BLOG_ENABLED: true,
        DASHBOARD_ENABLED: true,
        CHAT_ENABLED: false
    },
    
    // Debug mode
    DEBUG: true,
    LANGUAGE: 'ar',
    
    // Log function
    log: function(message, data = null) {
        if (this.DEBUG) {
            if (data) {
                console.log(`[${this.APP_NAME}] ${message}`, data);
            } else {
                console.log(`[${this.APP_NAME}] ${message}`);
            }
        }
    },
    
    // Navigate to route
    navigateTo: function(routeName) {
        const route = this.ROUTES[routeName.toUpperCase()];
        if (route) {
            window.location.href = route;
        } else {
            this.log(`Invalid route: ${routeName}`);
        }
    }
};

// Initialize config on load
document.addEventListener('DOMContentLoaded', function() {
    CONFIG.log('Configuration loaded');
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
