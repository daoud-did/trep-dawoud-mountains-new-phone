const DASHBOARD_ITEMS = [
    {
        id: 'mountains',
        title: 'الجبال',
        description: 'استكشف 700+ جبل حول العالم بتقنية 3D',
        icon: 'fas fa-mountain',
        link: 'mountains.html'
    },
    {
        id: 'blog',
        title: 'المدونة',
        description: 'اقرأ المقالات والمعلومات عن الجبال',
        icon: 'fas fa-book',
        link: 'blog.html'
    },
    {
        id: 'courses',
        title: 'الدورات',
        description: 'تعلم المزيد عن الجبال والتسلق',
        icon: 'fas fa-graduation-cap',
        link: 'courses.html'
    },
    {
        id: 'questions',
        title: 'أسئلة',
        description: 'اختبر معلوماتك عن الجبال',
        icon: 'fas fa-question-circle',
        link: 'question.html'
    },
    {
        id: 'services',
        title: 'الخدمات',
        description: 'خدمات متخصصة للمتسلقين',
        icon: 'fas fa-concierge-bell',
        link: 'services.html'
    },
    {
        id: 'profile',
        title: 'حسابي',
        description: 'إدارة حسابك الشخصي',
        icon: 'fas fa-user',
        link: '#'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

function initializeDashboard() {
    const dashboardGrid = document.getElementById('dashboardGrid');
    
    DASHBOARD_ITEMS.forEach((item, index) => {
        const card = createDashboardCard(item, index);
        dashboardGrid.appendChild(card);
    });
}

function createDashboardCard(item, index) {
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <i class="dashboard-card-icon ${item.icon}"></i>
        <h3 class="dashboard-card-title">${item.title}</h3>
        <p class="dashboard-card-text">${item.description}</p>
        <span class="card-link-arrow">
            <i class="fas fa-arrow-left"></i>
        </span>
    `;

    // Click handler
    card.addEventListener('click', () => {
        handleCardClick(card, item);
    });

    // Touch gesture handlers
    let touchStartX = 0;
    let touchStartY = 0;

    card.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    card.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        handleSwipeGesture(touchStartX, touchStartY, touchEndX, touchEndY, card, item);
    });

    // Pointer events for desktop
    card.addEventListener('pointerdown', (e) => {
        card.classList.add('gesture-tap');
    });

    card.addEventListener('pointerup', (e) => {
        setTimeout(() => {
            card.classList.remove('gesture-tap');
        }, 300);
    });

    return card;
}

function handleCardClick(card, item) {
    if (item.link && item.link !== '#') {
        // Add click animation
        card.style.animation = 'fadeOut 0.3s ease-out forwards';
        
        setTimeout(() => {
            window.location.href = item.link;
        }, 300);
    }
}

function handleSwipeGesture(startX, startY, endX, endY, card, item) {
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe left (RTL: means navigate)
            card.classList.add('gesture-swipe');
            setTimeout(() => {
                if (item.link && item.link !== '#') {
                    window.location.href = item.link;
                }
            }, 400);
        }
    }
    // Vertical swipe (up)
    else if (diffY > 50) {
        card.classList.add('gesture-tap');
        setTimeout(() => {
            if (item.link && item.link !== '#') {
                window.location.href = item.link;
            }
        }, 300);
    }
}
