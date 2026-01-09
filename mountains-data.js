const MOUNTAINS_DATA = [
    {
        id: 1,
        name: 'جبل إيفرست',
        location: 'الهيمالايا، نيبال',
        height: '8,849 م',
        description: 'أعلى جبل في العالم وأشهر وجهة لمتسلقي الجبال المحترفين',
        image: 'images/logo.jpg',
        difficulty: 'صعب جداً'
    },
    {
        id: 2,
        name: 'جبل كليمانجارو',
        location: 'تنزانيا',
        height: '5,895 م',
        description: 'أعلى جبل في أفريقيا وأسهل للتسلق من الجبال العالية الأخرى',
        image: 'images/logo.jpg',
        difficulty: 'متوسط'
    },
    {
        id: 3,
        name: 'جبل مونت بلان',
        location: 'الألب، فرنسا',
        height: '4,808 م',
        description: 'أعلى قمة في الألب الغربية وتحفة طبيعية خلابة',
        image: 'images/logo.jpg',
        difficulty: 'متوسط'
    },
    {
        id: 4,
        name: 'جبل فوجي',
        location: 'اليابان',
        height: '3,776 م',
        description: 'جبل مقدس في اليابان معروف برمزيته الثقافية والدينية',
        image: 'images/logo.jpg',
        difficulty: 'سهل'
    },
    {
        id: 5,
        name: 'جبل كينيا',
        location: 'كينيا',
        height: '5,199 م',
        description: 'ثاني أعلى جبل في أفريقيا مع مناظر طبيعية رائعة',
        image: 'images/logo.jpg',
        difficulty: 'متوسط'
    },
    {
        id: 6,
        name: 'جبل دينالي',
        location: 'ألاسكا، الولايات المتحدة',
        height: '6,190 م',
        description: 'أعلى قمة في أمريكا الشمالية وتحدي مشهور للمتسلقين',
        image: 'images/logo.jpg',
        difficulty: 'صعب'
    }
];

// Initialize mountains display on dashboard
document.addEventListener('DOMContentLoaded', () => {
    const mountainsGrid = document.getElementById('mountainsGrid');
    
    if (mountainsGrid) {
        MOUNTAINS_DATA.forEach((mountain, index) => {
            const card = createMountainCard(mountain, index);
            mountainsGrid.appendChild(card);
        });
    }
});

function createMountainCard(mountain, index) {
    const card = document.createElement('div');
    card.className = 'mountain-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="./images/dawoud.jpg" alt="${mountain.name}" class="mountain-image" onerror="this.src='./images/dawoud.jpg'">
        <div class="mountain-content">
            <h3 class="mountain-name">${mountain.name}</h3>
            <div class="mountain-location">
                <i class="fas fa-map-marker-alt"></i>
                ${mountain.location}
            </div>
            <div class="mountain-height">
                <i class="fas fa-ruler-vertical"></i>
                ${mountain.height}
            </div>
            <p class="mountain-description">${mountain.description}</p>
            <div class="mountain-card-action">
                <i class="fas fa-arrow-left"></i>
                اكتشف المزيد
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        showMountainModal(mountain);
    });

    return card;
}

function showMountainModal(mountain) {
    const modal = document.getElementById('mountain-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    const html = `
        <button class="mountain-modal-close" onclick="closeMountainModal()">
            <i class="fas fa-times"></i>
        </button>
        <img src="./images/dawoud.jpg" alt="${mountain.name}" class="mountain-modal-image">
        <h2 class="mountain-modal-title">${mountain.name}</h2>
        <div class="mountain-modal-location">
            <i class="fas fa-map-marker-alt"></i>
            ${mountain.location}
        </div>
        <div class="mountain-modal-height">
            <i class="fas fa-ruler-vertical"></i>
            <strong>${mountain.height}</strong>
        </div>
        <p class="mountain-modal-description">${mountain.description}</p>
        <div class="mountain-modal-difficulty">
            <strong>مستوى الصعوبة:</strong> ${mountain.difficulty}
        </div>
    `;
    
    modalContent.innerHTML = html;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close button
    modalContent.querySelector('.mountain-modal-close').addEventListener('click', closeMountainModal);
}

function closeMountainModal() {
    const modal = document.getElementById('mountain-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('mountain-modal');
    if (e.target === modal) {
        closeMountainModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMountainModal();
    }
});
