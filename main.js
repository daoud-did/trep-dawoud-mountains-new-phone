// Dark Mode Toggle
const themeBtn = document.getElementById('themeBtn');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
});

function updateThemeIcon(isDark) {
    const icon = themeBtn.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Prevent multiple function definitions
if (typeof ServicesApp === 'undefined') {
    window.ServicesApp = {
        services: [],
        displayedCount: 0,
        itemsPerLoad: 6
    };
}
