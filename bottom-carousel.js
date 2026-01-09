// Bottom Carousel - Display Mountains in a Scrollable Carousel
class MountainsCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.mountainsPerView = 4;
        this.currentPosition = 0;
        
        if (this.container) {
            this.init();
        }
    }

    init() {
        // Ensure we have mountains data
        if (typeof mountainsData === 'undefined' || mountainsData.length === 0) {
            console.error('No mountains data found');
            return;
        }

        // Render all mountains in carousel
        this.render();

        // Attach event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.scroll('prev'));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.scroll('next'));
        }

        // Handle responsive design
        window.addEventListener('resize', () => this.updateMountainsPerView());
    }

    render() {
        this.container.innerHTML = '';
        
        mountainsData.forEach((mountain) => {
            const card = this.createMountainCard(mountain);
            this.container.appendChild(card);
        });

        console.log(`تم عرض ${mountainsData.length} جبل في الكاروسيل`);
    }

    createMountainCard(mountain) {
        const card = document.createElement('div');
        card.className = 'mountain-card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${mountain.image}" alt="${mountain.name}" loading="lazy">
                <span class="difficulty-badge ${this.getDifficultyClass(mountain.difficulty)}">
                    ${mountain.difficulty}
                </span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${mountain.name}</h3>
                <p class="card-location">📍 ${mountain.location}</p>
                <p class="card-height">📏 ${mountain.height} متر</p>
                <p class="card-description">${mountain.description}</p>
            </div>
        `;

        // Add click event for details
        card.addEventListener('click', () => this.showDetails(mountain));

        return card;
    }

    getDifficultyClass(difficulty) {
        const classMap = {
            'مبتدئ': 'beginner',
            'متوسط': 'intermediate',
            'متقدم': 'advanced',
            'خبير': 'expert'
        };
        return classMap[difficulty] || 'intermediate';
    }

    scroll(direction) {
        const cardWidth = this.container.querySelector('.mountain-card').offsetWidth;
        const gap = 20;
        const scrollAmount = cardWidth + gap;

        if (direction === 'next') {
            this.currentPosition += scrollAmount;
        } else {
            this.currentPosition = Math.max(0, this.currentPosition - scrollAmount);
        }

        this.container.style.transform = `translateX(-${this.currentPosition}px)`;
    }

    updateMountainsPerView() {
        const width = window.innerWidth;
        if (width < 768) {
            this.mountainsPerView = 1;
        } else if (width < 1024) {
            this.mountainsPerView = 2;
        } else if (width < 1440) {
            this.mountainsPerView = 3;
        } else {
            this.mountainsPerView = 4;
        }
    }

    showDetails(mountain) {
        alert(`
جبل: ${mountain.name}
الموقع: ${mountain.location}
الارتفاع: ${mountain.height} متر
مستوى الصعوبة: ${mountain.difficulty}
الوصف: ${mountain.description}
        `);
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new MountainsCarousel();
});
