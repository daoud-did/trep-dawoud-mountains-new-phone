function openServiceModal(serviceId) {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return;

    const modal = document.getElementById('service-modal');
    const modalContent = modal.querySelector('.modal-content');

    // Fill modal with service data
    modalContent.innerHTML = `
        <span class="modal-close" onclick="closeServiceModal()">&times;</span>
        <div class="modal-header">
            <img src="${service.image}" alt="${service.title}" class="modal-image">
            <div class="modal-title-section">
                <h2 class="modal-title">${service.title}</h2>
                <div class="modal-price">${service.price}</div>
            </div>
        </div>
        <div class="modal-body">
            <p class="modal-description">${service.fullDesc}</p>
            <div class="modal-features">
                <h3>المميزات:</h3>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button class="modal-cta-btn" onclick="bookService(${service.id})">احجز الآن</button>
        </div>
    `;

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeServiceModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeServiceModal();
        }
    });
});

function bookService(serviceId) {
    // This function can be expanded to handle booking logic
    alert('شكراً لاهتمامك! سيتم توجيهك إلى صفحة الحجز قريباً.');
    closeServiceModal();
}
