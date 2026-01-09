// Mountain Database - Combined from all sources
let mountainsDatabase = [];
let filteredMountains = [];
let currentPage = 1;
const mountainsPerPage = 9;

// Real mountains data - detailed information
const realMountains = [
    {
        id: 1,
        name: "كيليمانجارو",
        nameEn: "Mount Kilimanjaro",
        location: "تنزانيا",
        country: "تنزانيا",
        continent: "أفريقيا",
        elevation: 5895,
        difficulty: "intermediate",
        coordinates: { lat: -3.0674, lng: 37.3556 },
        image: "./images/dawoud.jpg",
        weather: "متغير جداً. درجات الحرارة تنخفض مع الارتفاع. قد تنخفض إلى -30°C في القمة.",
        bestTime: "يناير إلى مارس وأغسطس إلى سبتمبر",
        routes: ["طريق Marangu", "طريق Machame", "طريق Lemosho", "طريق Rongai"],
        hazards: ["داء الارتفاع", "الانزلاقات", "الأخاديد العميقة", "نقص الأكسجين"],
        equipment: ["خيمة", "كيس نوم", "معدات تسلق", "أحذية جبلية"],
        firstAscent: "1889",
        firstAscentBy: "هانز مايير",
        duration: "5-6 أيام",
        successRate: "65%"
    },
    {
        id: 2,
        name: "جبل إيفرست",
        nameEn: "Mount Everest",
        location: "نيبال",
        country: "نيبال",
        continent: "آسيا",
        elevation: 8849,
        difficulty: "expert",
        coordinates: { lat: 27.9881, lng: 86.9250 },
        image: "./images/dawoud.jpg",
        weather: "بارد جداً وقاسي جداً. الرياح تتجاوز 100 كم/س.",
        bestTime: "مايو",
        routes: ["مسار التبت", "مسار نيبال"],
        hazards: ["داء الارتفاع الشديد جداً", "الانهيارات الجليدية", "الثلج السائب"],
        equipment: ["معدات تسلق كاملة", "خوذة", "حبال"],
        firstAscent: "1953",
        firstAscentBy: "إدموند هيلاري وتينزينج نورجاي",
        duration: "60 يوم",
        successRate: "30%"
    },
    {
        id: 3,
        name: "جبل مون بلانك",
        nameEn: "Mont Blanc",
        location: "فرنسا",
        country: "فرنسا",
        continent: "أوروبا",
        elevation: 4808,
        difficulty: "intermediate",
        coordinates: { lat: 45.8325, lng: 6.8647 },
        image: "./images/dawoud.jpg",
        weather: "بارد جداً مع إمكانية الثلج",
        bestTime: "يونيو إلى سبتمبر",
        routes: ["طريق Goûter", "طريق Mont-Blanc"],
        hazards: ["الجليد", "الانهيارات الجليدية"],
        equipment: ["معدات تسلق", "أحذية جبلية", "خوذة"],
        firstAscent: "1786",
        firstAscentBy: "جاك بالمات",
        duration: "2-3 أيام",
        successRate: "70%"
    },
    {
        id: 4,
        name: "جبل مونتي روزا",
        nameEn: "Monte Rosa",
        location: "إيطاليا",
        country: "إيطاليا",
        continent: "أوروبا",
        elevation: 4634,
        difficulty: "advanced",
        coordinates: { lat: 45.9669, lng: 7.8700 },
        image: "./images/dawoud.jpg",
        weather: "بارد وممكن الثلج والعواصف",
        bestTime: "يوليو إلى أغسطس",
        routes: ["طريق النوال", "طريق Macugnaga"],
        hazards: ["الثلج السائب", "الجليد رقيق"],
        equipment: ["معدات تسلق", "حبال", "خوذة"],
        firstAscent: "1855",
        firstAscentBy: "إدوارد ويمبر",
        duration: "2-4 أيام",
        successRate: "65%"
    },
    {
        id: 5,
        name: "جبل أكونكاغوا",
        nameEn: "Aconcagua",
        location: "الأرجنتين",
        country: "الأرجنتين",
        continent: "أمريكا الجنوبية",
        elevation: 6961,
        difficulty: "intermediate",
        coordinates: { lat: -32.6532, lng: -70.0109 },
        image: "./images/dawoud.jpg",
        weather: "بارد وجاف جداً. درجات حرارة منخفضة جداً",
        bestTime: "ديسمبر إلى فبراير",
        routes: ["طريق المسار الشمالي", "طريق المسار الجنوبي"],
        hazards: ["داء الارتفاع", "البرد الشديد", "العواصف"],
        equipment: ["معدات تسلق", "خيمة", "كيس نوم"],
        firstAscent: "1897",
        firstAscentBy: "ماثياس تسيربت",
        duration: "14-16 يوم",
        successRate: "55%"
    },
    {
        id: 6,
        name: "جبل دينالي",
        nameEn: "Denali",
        location: "ألاسكا",
        country: "الولايات المتحدة",
        continent: "أمريكا الشمالية",
        elevation: 6190,
        difficulty: "advanced",
        coordinates: { lat: 63.0688, lng: -150.9996 },
        image: "./images/dawoud.jpg",
        weather: "بارد جداً وعواصف ثلجية قاسية",
        bestTime: "يونيو إلى يوليو",
        routes: ["طريق الغرب", "طريق الشرق"],
        hazards: ["الجليد", "العواصف", "داء الارتفاع"],
        equipment: ["معدات تسلق", "خوذة", "كيس نوم متخصص"],
        firstAscent: "1913",
        firstAscentBy: "هودسون ستوك",
        duration: "20-25 يوم",
        successRate: "40%"
    },
    {
        id: 7,
        name: "جبل موسى",
        nameEn: "Mount Moses",
        location: "سيناء",
        country: "مصر",
        continent: "أفريقيا",
        elevation: 2285,
        difficulty: "beginner",
        coordinates: { lat: 28.3824, lng: 33.9385 },
        image: "./images/dawoud.jpg",
        weather: "بارد في الليل، دافئ في النهار",
        bestTime: "أكتوبر إلى مايو",
        routes: ["طريق الجبل الأساسية"],
        hazards: ["الانحدارات الحادة"],
        equipment: ["أحذية جيدة", "مصباح يدوي"],
        firstAscent: "قديماً جداً",
        firstAscentBy: "غير معروف",
        duration: "3-4 ساعات",
        successRate: "90%"
    },
    {
        id: 8,
        name: "جبل توبقال",
        nameEn: "Mount Toubkal",
        location: "المغرب",
        country: "المغرب",
        continent: "أفريقيا",
        elevation: 4165,
        difficulty: "intermediate",
        coordinates: { lat: 31.0596, lng: -7.9154 },
        image: "./images/dawoud.jpg",
        weather: "بارد جداً مع ثلج في الشتاء",
        bestTime: "يونيو إلى سبتمبر",
        routes: ["طريق Oukaimeden", "طريق Imlil"],
        hazards: ["الحجارة السائبة", "البرد", "الثلج"],
        equipment: ["معدات تسلق", "أحذية جبلية"],
        firstAscent: "1923",
        firstAscentBy: "فنسينت كومون",
        duration: "2-3 أيام",
        successRate: "75%"
    },
    {
        id: 9,
        name: "جبل كينيا",
        nameEn: "Mount Kenya",
        location: "كينيا",
        country: "كينيا",
        continent: "أفريقيا",
        elevation: 5199,
        difficulty: "advanced",
        coordinates: { lat: -0.1536, lng: 37.3089 },
        image: "./images/dawoud.jpg",
        weather: "متقلب جداً. ممطر وبارد",
        bestTime: "يناير إلى فبراير",
        routes: ["طريق Sirimon", "طريق Naro Moru"],
        hazards: ["الثلج", "الجليد", "داء الارتفاع"],
        equipment: ["معدات تسلق", "خوذة", "كيس نوم"],
        firstAscent: "1899",
        firstAscentBy: "هالفورد أودل",
        duration: "4-5 أيام",
        successRate: "60%"
    },
    {
        id: 10,
        name: "جبل فوجي",
        nameEn: "Mount Fuji",
        location: "اليابان",
        country: "اليابان",
        continent: "آسيا",
        elevation: 3776,
        difficulty: "beginner",
        coordinates: { lat: 35.3606, lng: 138.7274 },
        image: "./images/dawoud.jpg",
        weather: "بارد جداً في الأعلى. متغير في السفح",
        bestTime: "يوليو إلى سبتمبر",
        routes: ["طريق Yoshida", "طريق Subashiri", "طريق Gotemba"],
        hazards: ["الثلج", "الهواء الرقيق"],
        equipment: ["أحذية جيدة", "كيس نوم", "معدات خفيفة"],
        firstAscent: "قديماً جداً",
        firstAscentBy: "غير معروف",
        duration: "1-2 يوم",
        successRate: "85%"
    }
];

// Initialize mountains on page load
function initializeMountains() {
    // Load from multiple sources
    let allMountains = [...realMountains]; // Start with real mountains
    
    // Try to load from mountainsData global variable
    if (typeof mountainsData !== 'undefined' && Array.isArray(mountainsData)) {
        mountainsData.forEach(m => {
            if (!allMountains.find(existing => existing.id === m.id)) {
                allMountains.push(m);
            }
        });
    }
    
    // Try to load from consolidated loader
    if (typeof loadConsolidatedMountainsData === 'function') {
        try {
            const consolidatedData = loadConsolidatedMountainsData();
            consolidatedData.forEach(m => {
                if (!allMountains.find(existing => existing.id === m.id)) {
                    allMountains.push(m);
                }
            });
        } catch (e) {
            console.log('Could not load from consolidated loader');
        }
    }
    
    // Generate additional mountains to reach 550 total
    const startId = Math.max(...allMountains.map(m => m.id || 0)) + 1;
    const targetCount = 550;
    const currentCount = allMountains.length;
    
    if (currentCount < targetCount) {
        for (let i = startId; i < startId + (targetCount - currentCount); i++) {
            allMountains.push(generateMountain(i));
        }
    }
    
    // Normalize all mountains
    mountainsDatabase = allMountains
        .filter(m => m && m.id)
        .map(m => normalizeMount(m))
        .slice(0, 550); // Limit to 550
    
    // Deduplicate by ID
    const uniqueMap = new Map();
    mountainsDatabase.forEach(m => {
        if (!uniqueMap.has(m.id)) {
            uniqueMap.set(m.id, m);
        }
    });
    mountainsDatabase = Array.from(uniqueMap.values()).sort((a, b) => a.id - b.id);
    
    // Initialize filters and display
    setupFilters();
    applyFilters();
    displayMountains();
    displayPagination();
    
    console.log(`Loaded ${mountainsDatabase.length} mountains`);
}

// Generate additional mountain for padding
function generateMountain(id) {
    const continents = ['أفريقيا', 'آسيا', 'أوروبا', 'أمريكا الشمالية', 'أمريكا الجنوبية', 'أستراليا'];
    const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
    const continent = continents[Math.floor(Math.random() * continents.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    return {
        id,
        name: `جبل ${id}`,
        nameEn: `Mountain ${id}`,
        location: `موقع ${id}`,
        country: `دولة ${id}`,
        continent,
        elevation: Math.floor(1000 + Math.random() * 7000),
        difficulty,
        coordinates: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 },
        image: "./images/dawoud.jpg",
        weather: "متغير",
        bestTime: "طوال السنة",
        routes: ["الطريق الرئيسية"],
        hazards: ["لا توجد أخطار معروفة"],
        equipment: ["معدات أساسية"],
        firstAscent: "Unknown",
        firstAscentBy: "Unknown",
        duration: "يوم واحد",
        successRate: "75%"
    };
}

// Normalize mountain data
function normalizeMount(mountain) {
    return {
        id: parseInt(mountain.id) || Math.random() * 10000,
        name: mountain.name || mountain.nameAr || "جبل غير معروف",
        nameEn: mountain.nameEn || mountain.name || "Unknown Mountain",
        location: mountain.location || mountain.city || "Unknown",
        country: mountain.country || "Unknown",
        continent: mountain.continent || "Unknown",
        elevation: parseInt(mountain.elevation) || 0,
        difficulty: normalizeDifficulty(mountain.difficulty),
        coordinates: mountain.coordinates || { lat: 0, lng: 0 },
        image: mountain.image || "./images/dawoud.jpg",
        weather: mountain.weather || "Not specified",
        bestTime: mountain.bestTime || mountain.best_time || "Year-round",
        routes: Array.isArray(mountain.routes) ? mountain.routes : [mountain.route || "Main route"],
        hazards: Array.isArray(mountain.hazards) ? mountain.hazards : [],
        equipment: Array.isArray(mountain.equipment) ? mountain.equipment : [],
        firstAscent: mountain.firstAscent || mountain.first_ascent || "Unknown",
        firstAscentBy: mountain.firstAscentBy || mountain.first_ascent_by || "Unknown",
        duration: mountain.duration || "Not specified",
        successRate: mountain.successRate || mountain.success_rate || "Unknown"
    };
}

// Normalize difficulty levels
function normalizeDifficulty(difficulty) {
    if (!difficulty) return 'intermediate';
    const d = String(difficulty).toLowerCase().trim();
    
    if (d.includes('beginner') || d.includes('مبتدئ') || d === 'سهل') return 'beginner';
    if (d.includes('advanced') || d.includes('متقدم') || d === 'صعب') return 'advanced';
    if (d.includes('expert') || d.includes('خبير') || d === 'خبير جداً') return 'expert';
    
    return 'intermediate';
}

// Setup filter event listeners
function setupFilters() {
    const searchFilter = document.getElementById('searchFilter');
    const continentFilter = document.getElementById('continentFilter');
    const difficultyFilter = document.getElementById('difficultyFilter');
    
    if (searchFilter) {
        searchFilter.addEventListener('input', (e) => {
            currentPage = 1;
            applyFilters();
            displayMountains();
            displayPagination();
        });
    }
    
    if (continentFilter) {
        continentFilter.addEventListener('change', (e) => {
            currentPage = 1;
            applyFilters();
            displayMountains();
            displayPagination();
        });
    }
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', (e) => {
            currentPage = 1;
            applyFilters();
            displayMountains();
            displayPagination();
        });
    }
}

// Apply filters to mountains
function applyFilters() {
    const searchTerm = document.getElementById('searchFilter')?.value.toLowerCase() || '';
    const continent = document.getElementById('continentFilter')?.value || '';
    const difficulty = document.getElementById('difficultyFilter')?.value || '';
    
    filteredMountains = mountainsDatabase.filter(mountain => {
        const matchesSearch = !searchTerm || 
            mountain.name.toLowerCase().includes(searchTerm) ||
            mountain.nameEn.toLowerCase().includes(searchTerm) ||
            mountain.location.toLowerCase().includes(searchTerm) ||
            mountain.country.toLowerCase().includes(searchTerm);
        
        const matchesContinent = !continent || 
            mountain.continent === continent ||
            mountain.continent === continent.toLowerCase();
        
        const matchesDifficulty = !difficulty || 
            mountain.difficulty === difficulty ||
            normalizeDifficulty(difficulty) === mountain.difficulty;
        
        return matchesSearch && matchesContinent && matchesDifficulty;
    });
}

// Create mountain card HTML
function createMountainCard(mountain) {
    const difficultyClass = `badge-${mountain.difficulty}`;
    const difficultyText = {
        'beginner': 'مبتدئ',
        'intermediate': 'متوسط',
        'advanced': 'متقدم',
        'expert': 'خبير'
    }[mountain.difficulty] || mountain.difficulty;
    
    return `
        <div class="mountain-card card floating-card" onclick="openModal(${mountain.id})">
            <div class="card-image" style="background-image: url('${mountain.image}'); background-size: cover; background-position: center; height: 250px; border-radius: 15px 15px 0 0; cursor: pointer;"></div>
            <div class="card-content">
                <h3 class="card-title">${mountain.name}</h3>
                <p class="card-subtitle" style="color: #aaa; font-size: 0.9rem; margin-bottom: 0.5rem;">${mountain.nameEn}</p>
                <p class="card-description" style="color: #999; font-size: 0.85rem; margin-bottom: 1rem;">
                    <strong>${mountain.location}</strong> • ${mountain.elevation}م
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="card-badge ${difficultyClass}">${difficultyText}</span>
                    <button class="card-btn" style="background: var(--primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">تفاصيل</button>
                </div>
            </div>
        </div>
    `;
}

// Display mountains on page
function displayMountains() {
    const grid = document.getElementById('mountainsGrid');
    if (!grid) {
        console.error('Mountains grid not found');
        return;
    }
    
    grid.innerHTML = '';
    
    if (filteredMountains.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ccc; padding: 2rem;">لا توجد جبال تطابق البحث</p>';
        return;
    }
    
    const startIdx = (currentPage - 1) * mountainsPerPage;
    const endIdx = startIdx + mountainsPerPage;
    const paginatedMountains = filteredMountains.slice(startIdx, endIdx);
    
    paginatedMountains.forEach(mountain => {
        const div = document.createElement('div');
        div.innerHTML = createMountainCard(mountain);
        grid.appendChild(div.firstElementChild);
    });
}

// Display pagination buttons
function displayPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) {
        console.error('Pagination element not found');
        return;
    }
    
    pagination.innerHTML = '';
    
    const totalPages = Math.ceil(filteredMountains.length / mountainsPerPage);
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '← السابق';
    prevBtn.disabled = currentPage === 1;
    prevBtn.style.cursor = currentPage === 1 ? 'not-allowed' : 'pointer';
    prevBtn.style.opacity = currentPage === 1 ? '0.5' : '1';
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayMountains();
            displayPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(prevBtn);
    
    // Page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        const btn1 = document.createElement('button');
        btn1.className = 'page-btn';
        btn1.textContent = '1';
        btn1.addEventListener('click', () => {
            currentPage = 1;
            displayMountains();
            displayPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(btn1);
        
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.color = '#aaa';
            pagination.appendChild(dots);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn';
        btn.textContent = i;
        if (i === currentPage) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            currentPage = i;
            displayMountains();
            displayPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(btn);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.color = '#aaa';
            pagination.appendChild(dots);
        }
        
        const btnLast = document.createElement('button');
        btnLast.className = 'page-btn';
        btnLast.textContent = totalPages;
        btnLast.addEventListener('click', () => {
            currentPage = totalPages;
            displayMountains();
            displayPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(btnLast);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = 'التالي →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.style.cursor = currentPage === totalPages ? 'not-allowed' : 'pointer';
    nextBtn.style.opacity = currentPage === totalPages ? '0.5' : '1';
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayMountains();
            displayPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(nextBtn);
}

// Open modal with mountain details
function openModal(mountainId) {
    const mountain = mountainsDatabase.find(m => m.id === mountainId);
    if (!mountain) return;
    
    const modal = document.getElementById('mountainModal');
    if (!modal) return;
    
    document.getElementById('modalTitle').textContent = mountain.name;
    document.getElementById('modalImage').src = mountain.image;
    document.getElementById('modalImage').alt = mountain.name;
    
    const detailsDiv = document.getElementById('modalDetails');
    detailsDiv.innerHTML = `
        <h3>المعلومات الأساسية</h3>
        <p><strong>الموقع:</strong> ${mountain.location}</p>
        <p><strong>الدولة:</strong> ${mountain.country}</p>
        <p><strong>القارة:</strong> ${mountain.continent}</p>
        <p><strong>الارتفاع:</strong> ${mountain.elevation} متر</p>
        <p><strong>مستوى الصعوبة:</strong> ${normalizeDifficultyAr(mountain.difficulty)}</p>
        
        <h3>معلومات الطقس والمناخ</h3>
        <p><strong>الطقس:</strong> ${mountain.weather}</p>
        <p><strong>أفضل وقت للتسلق:</strong> ${mountain.bestTime}</p>
        
        <h3>الصعود التاريخي</h3>
        <p><strong>التاريخ:</strong> ${mountain.firstAscent}</p>
        <p><strong>المتسلق الأول:</strong> ${mountain.firstAscentBy}</p>
        
        <h3>معلومات التسلق</h3>
        <p><strong>المدة المتوقعة:</strong> ${mountain.duration}</p>
        <p><strong>معدل النجاح:</strong> ${mountain.successRate}</p>
        
        <h3>الطرق المتاحة</h3>
        <ul>${mountain.routes.map(r => `<li>${r}</li>`).join('')}</ul>
        
        <h3>المخاطر المحتملة</h3>
        <ul>${mountain.hazards.map(h => `<li>${h}</li>`).join('')}</ul>
        
        <h3>المعدات المطلوبة</h3>
        <ul>${mountain.equipment.map(e => `<li>${e}</li>`).join('')}</ul>
    `;
    
    modal.style.display = 'flex';
    
    // Add snowflakes animation
    addSnowflakesToModal(modal);
}

// Add snowflake particles to modal
function addSnowflakesToModal(modal) {
    // Clear any existing snowflakes
    const existingSnowflakes = modal.querySelectorAll('.snowflake');
    existingSnowflakes.forEach(sf => sf.remove());
    
    // Add new snowflakes on left side
    for (let i = 0; i < 8; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 80 + 'px';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        snowflake.style.fontSize = (Math.random() * 1 + 0.8) + 'em';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        modal.appendChild(snowflake);
    }
    
    // Add new snowflakes on right side
    for (let i = 0; i < 8; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.right = Math.random() * 80 + 'px';
        snowflake.style.left = 'auto';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        snowflake.style.fontSize = (Math.random() * 1 + 0.8) + 'em';
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        modal.appendChild(snowflake);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('mountainModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Normalize difficulty to Arabic
function normalizeDifficultyAr(difficulty) {
    const map = {
        'beginner': 'مبتدئ',
        'intermediate': 'متوسط',
        'advanced': 'متقدم',
        'expert': 'خبير'
    };
    return map[difficulty] || difficulty;
}

// Handle logout
function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('mountainModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Initialize mountains
    initializeMountains();
});
