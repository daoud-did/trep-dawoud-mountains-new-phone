document.addEventListener('DOMContentLoaded', () => {
    // Service Modal
    const serviceModal = document.getElementById('service-modal');
    const modalContent = serviceModal?.querySelector('.modal-content');

    // Close modal
    function closeModal() {
        if (serviceModal) {
            serviceModal.classList.remove('active');
        }
    }

    // Click outside modal to close
    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                closeModal();
            }
        });
    }

    // Add close button handler
    document.addEventListener('click', (e) => {
        if (e.target.closest('.modal-close')) {
            closeModal();
        }
    });

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreServices();
        });
    }
});

function openServiceModal(service) {
    const serviceModal = document.getElementById('service-modal');
    const modalContent = serviceModal?.querySelector('.modal-content');
    
    if (!modalContent) return;

    const html = `
        <div class="modal-header">
            <div>
                <i class="modal-icon ${service.icon}"></i>
                <h2 class="modal-title">${service.name}</h2>
                <p class="modal-description">${service.shortDesc}</p>
            </div>
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="modal-features">
            <h4>المميزات الرئيسية</h4>
            <ul class="feature-list">
                ${service.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
        </div>
        <p>${service.fullDesc}</p>
        <button class="modal-button">احجز الآن</button>
    `;

    modalContent.innerHTML = html;
    serviceModal.classList.add('active');
}

function loadMoreServices() {
    const app = window.ServicesApp;
    if (!app.services.length) return;

    const servicesGrid = document.getElementById('servicesGrid');
    const nextItems = app.services.slice(
        app.displayedCount,
        app.displayedCount + app.itemsPerLoad
    );

    nextItems.forEach((service, index) => {
        const delay = index * 0.1;
        const card = createServiceCard(service, delay);
        servicesGrid.appendChild(card);
    });

    app.displayedCount += app.itemsPerLoad;

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (app.displayedCount >= app.services.length && loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

function createServiceCard(service, delay = 0) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.style.animationDelay = `${delay}s`;
    card.innerHTML = `
        <i class="${service.icon}"></i>
        <h3>${service.name}</h3>
        <p>${service.shortDesc}</p>
    `;
    card.addEventListener('click', () => openServiceModal(service));
    return card;
}
