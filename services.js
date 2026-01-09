document.addEventListener('DOMContentLoaded', () => {
    const app = window.ServicesApp;
    app.services = SERVICES_DATA;
    app.displayedCount = 0;
    app.itemsPerLoad = 6;

    // Load initial services
    const servicesGrid = document.getElementById('servicesGrid');
    const initialServices = app.services.slice(0, app.itemsPerLoad);

    initialServices.forEach((service, index) => {
        const delay = index * 0.1;
        const card = createServiceCard(service, delay);
        servicesGrid.appendChild(card);
    });

    app.displayedCount = app.itemsPerLoad;

    // Handle load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (app.displayedCount >= app.services.length) {
        loadMoreBtn.style.display = 'none';
    }
});
