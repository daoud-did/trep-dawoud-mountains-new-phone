/* ═══════════════════════════════════════════════════════════════════════
   🏔️ TREP DAWOUD - Mountains Renderer
   ═══════════════════════════════════════════════════════════════════════
   يقوم هذا السكريبت بعرض جميع بيانات الجبال من data_tout_mountains.js
   باستخدام نفس التصميم الأصلي (بدون تغيير HTML أو CSS) */

class MountainsRenderer {
    constructor() {
        this.container = document.getElementById('carouselContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.modal = document.getElementById('modal3D');
        this.modalOverlay = document.getElementById('modalOverlay');
        this.closeBtn = document.getElementById('closeModalBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        
        this.currentIndex = 0;
        this.cardsPerView = 4;
        this.scrollDistance = 0;
        this.mountains = [];
        this.snowEffect = null;
        this.lightsEffect = null;
        
        this.init();
    }

    init() {
        // Check if mountains data is available from data_tout_mountains.js
        if (typeof mountainsData === 'undefined' || mountainsData.length === 0) {
            console.error('❌ Mountains data not loaded!');
            if (this.loadingIndicator) {
                this.loadingIndicator.querySelector('p').textContent = 'خطأ: لم يتم تحميل بيانات الجبال';
            }
            return;
        }

        this.mountains = mountainsData;
        console.log(`✅ تم تحميل ${this.mountains.length} جبل من data_tout_mountains.js`);
        
        this.renderCarousel();
        this.attachEventListeners();
        this.updateResponsive();
        
        // Hide loading indicator when done
        setTimeout(() => {
            if (this.loadingIndicator) {
                this.loadingIndicator.style.display = 'none';
            }
        }, 500);
    }

    renderCarousel() {
        if (!this.container) return;
        
        this.container.innerHTML = '';
        
        // Loop through all mountains from data_tout_mountains.js
        this.mountains.forEach((mountain, index) => {
            const card = this.createMountainCard(mountain, index);
            this.container.appendChild(card);
        });
        
        console.log(`✅ تم عرض ${this.mountains.length} بطاقة جبل`);
    }

    createMountainCard(mountain, index) {
        const card = document.createElement('div');
        card.className = 'mountain-card';
        card.style.cursor = 'pointer';
        
        const difficultyClass = this.getDifficultyClass(mountain.difficulty);
        
        // Use the same HTML structure as original design
        card.innerHTML = `
            <div class="card-image">
                <img src="./images/dawoud.jpg" alt="${mountain.name}" loading="lazy">
                <span class="difficulty-badge ${difficultyClass}">${mountain.difficulty}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${mountain.name}</h3>
                <p class="card-location">📍 ${mountain.location}</p>
                <p class="card-height">📏 ${mountain.height}م</p>
            </div>
        `;
        
        // Add click event to show modal (same as original)
        card.addEventListener('click', () => this.showModal(mountain));
        
        return card;
    }

    getDifficultyClass(difficulty) {
        // Map difficulty levels to CSS classes (same as original)
        const difficulties = {
            'مبتدئ': 'beginner',
            'متوسط': 'intermediate',
            'متقدم': 'advanced',
            'خبير': 'expert'
        };
        return difficulties[difficulty] || 'beginner';
    }

    showModal(mountain) {
        if (!this.modal) return;
        
        // Set modal content using same elements as original
        const modalImage = document.getElementById('modalImage');
        if (modalImage) {
            modalImage.src = './images/dawoud.jpg';
        }
        
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) modalTitle.textContent = mountain.name;
        
        const modalNameEn = document.getElementById('modalNameEn');
        if (modalNameEn) modalNameEn.textContent = mountain.nameEn || '';
        
        // Set difficulty badge (same as original)
        const difficultyBadge = document.getElementById('modalDifficulty');
        if (difficultyBadge) {
            difficultyBadge.textContent = mountain.difficulty;
            difficultyBadge.className = `difficulty-badge ${this.getDifficultyClass(mountain.difficulty)}`;
        }
        
        // Set info items (same as original)
        const modalHeight = document.getElementById('modalHeight');
        if (modalHeight) modalHeight.textContent = `${mountain.height} متر`;
        
        const modalLocation = document.getElementById('modalLocation');
        if (modalLocation) modalLocation.textContent = mountain.location;
        
        const modalClimate = document.getElementById('modalClimate');
        if (modalClimate) modalClimate.textContent = mountain.climate || 'متغير';
        
        const modalBestTime = document.getElementById('modalBestTime');
        if (modalBestTime) modalBestTime.textContent = mountain.bestTime || 'يونيو - سبتمبر';
        
        const modalDescription = document.getElementById('modalDescription');
        if (modalDescription) modalDescription.textContent = mountain.description;
        
        // Initialize snow effect if available (same as original)
        const snowContainer = document.getElementById('snowContainer');
        if (snowContainer && typeof SnowEffect !== 'undefined') {
            snowContainer.innerHTML = '';
            this.snowEffect = new SnowEffect(snowContainer, 30);
        }
        
        // Initialize lights effect if available (same as original)
        const neonGlow = document.getElementById('neonGlow');
        if (neonGlow && typeof LightsEffect !== 'undefined') {
            this.lightsEffect = new LightsEffect(neonGlow);
            this.lightsEffect.createLightRays();
            this.lightsEffect.createParticles(15);
        }
        
        // Show modal with animation (same as original)
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clean up effects (same as original)
        if (this.snowEffect) {
            this.snowEffect.clear();
        }
    }

    attachEventListeners() {
        // Carousel navigation buttons (same as original)
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.scroll('prev'));
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.scroll('next'));
        }
        
        // Modal close button (same as original)
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hideModal());
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', () => this.hideModal());
        }
        
        // Keyboard navigation (same as original)
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.classList.contains('active')) {
                if (e.key === 'Escape') this.hideModal();
            }
        });
        
        // Responsive resize (same as original)
        window.addEventListener('resize', () => this.updateResponsive());
        
        // Action buttons (same as original)
        const exploreBtn = document.getElementById('exploreBtn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                // Handle explore button action
                console.log('Explore button clicked');
            });
        }
        
        const shareBtn = document.getElementById('shareBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                // Handle share button action
                console.log('Share button clicked');
            });
        }
    }

    scroll(direction) {
        if (!this.container) return;
        
        const cardWidth = this.container.querySelector('.mountain-card')?.offsetWidth || 300;
        const gap = 20;
        const scrollAmount = cardWidth + gap;
        
        if (direction === 'next') {
            this.scrollDistance += scrollAmount;
        } else {
            this.scrollDistance = Math.max(0, this.scrollDistance - scrollAmount);
        }
        
        this.container.style.transform = `translateX(-${this.scrollDistance}px)`;
    }

    updateResponsive() {
        const width = window.innerWidth;
        
        if (width < 480) {
            this.cardsPerView = 1;
        } else if (width < 768) {
            this.cardsPerView = 2;
        } else if (width < 1024) {
            this.cardsPerView = 3;
        } else {
            this.cardsPerView = 4;
        }
    }
}

// Initialize the renderer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏔️ Initializing MountainsRenderer...');
    new MountainsRenderer();
});

// Also support manual initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('🏔️ Initializing MountainsRenderer (DOMContentLoaded)...');
        new MountainsRenderer();
    });
} else {
    // DOM is already ready
    console.log('🏔️ Initializing MountainsRenderer (DOM already ready)...');
    new MountainsRenderer();
}
