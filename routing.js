/**
 * TREP DAWOUD - Routing System
 * Handles navigation between pages and routes
 */

// Page routing configuration
const ROUTES = {
    '/': 'index.html',
    '/home': 'index.html',
    '/login': 'login.html',
    '/signup': 'signup.html',
    '/blog': 'pages/blog.html',
    '/courses': 'pages/courses.html',
    '/dashboard': 'pages/dashboard.html',
    '/question': 'pages/question.html',
    '/questions': 'pages/question.html',
    '/chat': 'pages/chat.html',
    '/services': 'pages/services.html'
};

// Navigation function
function navigateTo(path) {
    const route = ROUTES[path] || ROUTES['/'];
    if (route) {
        window.location.href = route;
    }
}

// Initialize navigation
function initNavigation() {
    // Get current page info
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight active nav link
    const navLinks = document.querySelectorAll('a[href*=".html"]');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || href.endsWith(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Check if user is logged in, redirect if needed
function checkAuth(requireAuth = false) {
    const user = getCurrentUser();
    
    if (requireAuth && !user) {
        navigateTo('/login');
        return false;
    }
    
    return user;
}

// Get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
}

// Navigate to dashboard (with auth check)
function goToDashboard() {
    if (checkAuth(true)) {
        navigateTo('/dashboard');
    }
}

// Navigate to home
function goHome() {
    navigateTo('/home');
}

// Navigate from pages folder (with ../)
function navigateFromPages(path) {
    if (path === '/home') {
        window.location.href = '../index.html';
    } else if (path === '/login') {
        window.location.href = '../login.html';
    } else if (path === '/signup') {
        window.location.href = '../signup.html';
    } else {
        navigateTo(path);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initNavigation);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { navigateTo, checkAuth, goToDashboard, goHome };
}
