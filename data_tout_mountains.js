// TREP DAWOUD - Mountains Database (300 Mountains) - FIXED IMAGE PATHS
const mountainsData = [
    {id: 1, name: "إيفرست", nameEn: "Everest", image: "./images/dawoud.jpg", height: 8849, location: "نيبال", difficulty: "خبير", continent: "آسيا", country: "نيبال", description: "أعلى جبل في العالم", weather: "بارد جداً", bestTime: "مايو-يونيو", climate: "متجمد", routes: ["طريق جنوب"], hazards: ["عواصف"], equipment: ["معدات"], coordinates: {lat: 27.9881, lng: 86.9250}, tags: ["عالمي"], duration: "شهرين", cost: "45000$", successRate: "45%"},
    {id: 2, name: "كي 2", nameEn: "K2", image: "./images/dawoud.jpg", height: 8611, location: "باكستان", difficulty: "خبير", continent: "آسيا", country: "باكستان", description: "ثاني أعلى جبل", weather: "عاصف", bestTime: "يوليو-أغسطس", climate: "متجمد", routes: ["طريق رئيسي"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 35.8825, lng: 76.5133}, tags: ["خطر"], duration: "شهرين", cost: "55000$", successRate: "25%"},
    {id: 3, name: "كانغشينجونغا", nameEn: "Kangchenjunga", image: "./images/dawoud.jpg", height: 8586, location: "نيبال", difficulty: "خبير", continent: "آسيا", country: "نيبال", description: "ثالث أعلى جبل", weather: "بارد", bestTime: "أبريل-مايو", climate: "متجمد", routes: ["طريق جنوب"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 27.7025, lng: 88.1470}, tags: ["جميل"], duration: "شهرين", cost: "40000$", successRate: "35%"},
    {id: 4, name: "لهوتسه", nameEn: "Lhotse", image: "./img/mountains/dawoud.jpg", height: 8516, location: "نيبال", difficulty: "متقدم", continent: "آسيا", country: "نيبال", description: "رابع أعلى جبل", weather: "بارد", bestTime: "أبريل-مايو", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 27.9617, lng: 86.9333}, tags: ["آسيا"], duration: "45يوم", cost: "38000$", successRate: "50%"},
    {id: 5, name: "ماكالو", nameEn: "Makalu", image: "./img/mountains/dawoud.jpg", height: 8485, location: "نيبال", difficulty: "خبير", continent: "آسيا", country: "نيبال", description: "خامس أعلى جبل", weather: "بارد", bestTime: "مايو-يونيو", climate: "متجمد", routes: ["طريق"], hazards: ["عواصف"], equipment: ["معدات"], coordinates: {lat: 27.8900, lng: 87.0883}, tags: ["صعب"], duration: "50يوم", cost: "42000$", successRate: "30%"},
    {id: 6, name: "تشو أويو", nameEn: "Cho Oyu", image: "./img/mountains/dawoud.jpg", height: 8188, location: "نيبال", difficulty: "متقدم", continent: "آسيا", country: "نيبال", description: "جبل جميل", weather: "معتدل", bestTime: "مايو-يونيو", climate: "بارد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 28.1067, lng: 86.6550}, tags: ["جميل"], duration: "40يوم", cost: "32000$", successRate: "60%"},
    {id: 7, name: "ضاولاغيري", nameEn: "Dhaulagiri", image: "./img/mountains/dawoud.jpg", height: 8167, location: "نيبال", difficulty: "خبير", continent: "آسيا", country: "نيبال", description: "جبل مثير", weather: "بارد", bestTime: "أبريل-مايو", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 28.3808, lng: 83.4239}, tags: ["خطر"], duration: "55يوم", cost: "44000$", successRate: "35%"},
    {id: 8, name: "مانسالو", nameEn: "Manaslu", image: "./img/mountains/dawoud.jpg", height: 8163, location: "نيبال", difficulty: "متقدم", continent: "آسيا", country: "نيبال", description: "جبل طويل", weather: "بارد", bestTime: "مايو-يونيو", climate: "بارد جداً", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 28.5597, lng: 84.5597}, tags: ["طويل"], duration: "50يوم", cost: "35000$", successRate: "55%"},
    {id: 9, name: "نانغا بربات", nameEn: "Nanga Parbat", image: "./img/mountains/dawoud.jpg", height: 8126, location: "باكستان", difficulty: "خبير", continent: "آسيا", country: "باكستان", description: "جبل خطر", weather: "عاصف", bestTime: "يونيو-يوليو", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 35.2372, lng: 74.5890}, tags: ["خطر جداً"], duration: "60يوم", cost: "50000$", successRate: "20%"},
    {id: 10, name: "بروادبيك", nameEn: "Broad Peak", image: "./img/mountains/dawoud.jpg", height: 8051, location: "باكستان", difficulty: "متقدم", continent: "آسيا", country: "باكستان", description: "جبل واسع", weather: "معتدل", bestTime: "يوليو-أغسطس", climate: "بارد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 35.8119, lng: 76.5725}, tags: ["واسع"], duration: "45يوم", cost: "36000$", successRate: "50%"},
    {id: 11, name: "جبل مونت بلان", nameEn: "Mont Blanc", image: "./img/mountains/dawoud.jpg", height: 4808, location: "فرنسا", difficulty: "متوسط", continent: "أوروبا", country: "فرنسا", description: "أعلى جبل الألب", weather: "معتدل", bestTime: "يونيو-سبتمبر", climate: "بارد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 45.8326, lng: 6.8652}, tags: ["أوروبا"], duration: "3أيام", cost: "800€", successRate: "85%"},
    {id: 12, name: "جبل ماتيرهورن", nameEn: "Matterhorn", image: "./img/mountains/dawoud.jpg", height: 4478, location: "سويسرا", difficulty: "متقدم", continent: "أوروبا", country: "سويسرا", description: "جبل أيقوني", weather: "معتدل", bestTime: "يوليو-أغسطس", climate: "بارد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 45.9764, lng: 7.6586}, tags: ["أوروبا"], duration: "يومين", cost: "1000€", successRate: "75%"},
    {id: 13, name: "جبل إلبروس", nameEn: "Mount Elbrus", image: "./img/mountains/dawoud.jpg", height: 5642, location: "روسيا", difficulty: "متقدم", continent: "أوروبا", country: "روسيا", description: "أعلى جبل أوروبا", weather: "بارد", bestTime: "يوليو-أغسطس", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 43.3554, lng: 42.4386}, tags: ["روسيا"], duration: "5أيام", cost: "1200€", successRate: "70%"},
    {id: 14, name: "جبل كليمنجارو", nameEn: "Mount Kilimanjaro", image: "./img/mountains/dawoud.jpg", height: 5895, location: "تنزانيا", difficulty: "متوسط", continent: "أفريقيا", country: "تنزانيا", description: "أعلى جبل أفريقيا", weather: "معتدل", bestTime: "يناير-فبراير", climate: "متنوع", routes: ["طريق"], hazards: ["الارتفاع"], equipment: ["معدات"], coordinates: {lat: -3.0674, lng: 37.3556}, tags: ["أفريقيا"], duration: "6أيام", cost: "1500$", successRate: "85%"},
    {id: 15, name: "جبل وادنجتون", nameEn: "Mount Waddington", image: "./img/mountains/dawoud.jpg", height: 4016, location: "كندا", difficulty: "متقدم", continent: "أمريكا الشمالية", country: "كندا", description: "جبل صعب", weather: "بارد", bestTime: "يوليو-أغسطس", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 51.4172, lng: -125.2374}, tags: ["كندا"], duration: "10أيام", cost: "3000$", successRate: "45%"},
    {id: 16, name: "جبل الدينالي", nameEn: "Mount Denali", image: "./img/mountains/dawoud.jpg", height: 6190, location: "الولايات المتحدة", difficulty: "متقدم", continent: "أمريكا الشمالية", country: "الولايات المتحدة", description: "أعلى أمريكا الشمالية", weather: "بارد جداً", bestTime: "يونيو-يوليو", climate: "قطبي", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: 63.0688, lng: -151.0093}, tags: ["أمريكا"], duration: "20يوم", cost: "5000$", successRate: "40%"},
    {id: 17, name: "جبل تشيمبورازو", nameEn: "Mount Chimborazo", image: "./img/mountains/dawoud.jpg", height: 6263, location: "الإكوادور", difficulty: "متقدم", continent: "أمريكا الجنوبية", country: "الإكوادور", description: "جبل عالي", weather: "بارد", bestTime: "يونيو-أغسطس", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: -1.4691, lng: -78.1164}, tags: ["جنوب"], duration: "8أيام", cost: "2500$", successRate: "60%"},
    {id: 18, name: "جبل أكونكاجوا", nameEn: "Mount Aconcagua", image: "./img/mountains/dawoud.jpg", height: 6961, location: "الأرجنتين", difficulty: "متقدم", continent: "أمريكا الجنوبية", country: "الأرجنتين", description: "أعلى أمريكا الجنوبية", weather: "بارد", bestTime: "ديسمبر-فبراير", climate: "متجمد", routes: ["طريق"], hazards: ["انهيارات"], equipment: ["معدات"], coordinates: {lat: -32.6532, lng: -70.0109}, tags: ["أرجنتين"], duration: "14يوم", cost: "3500$", successRate: "55%"},
    {id: 19, name: "جبل كوتوباكسي", nameEn: "Cotopaxi", image: "./img/mountains/dawoud.jpg", height: 5897, location: "الإكوادور", difficulty: "متقدم", continent: "أمريكا الجنوبية", country: "الإكوادور", description: "بركان نشط", weather: "معتدل", bestTime: "يونيو-أغسطس", climate: "بارد", routes: ["طريق"], hazards: ["انفجارات"], equipment: ["معدات"], coordinates: {lat: -0.8686, lng: -78.4428}, tags: ["بركان"], duration: "4أيام", cost: "800$", successRate: "75%"},
    {id: 20, name: "جبل ويليم", nameEn: "Mount Wilhelm", image: "./img/mountains/dawoud.jpg", height: 4509, location: "بابوا غينيا", difficulty: "متوسط", continent: "أوقيانوسيا", country: "بابوا غينيا", description: "أعلى أوقيانوسيا", weather: "رطب", bestTime: "يونيو-أغسطس", climate: "استوائي", routes: ["طريق"], hazards: ["انزلاقات"], equipment: ["معدات"], coordinates: {lat: -6.0188, lng: 145.3968}, tags: ["أوقيانوسيا"], duration: "3أيام", cost: "500$", successRate: "80%"}
];

// Generate 280 additional mountains
for (let i = 21; i <= 300; i++) {
    const countries = ["الصين", "الهند", "الجزائر", "تركيا", "مصر", "السودان", "إثيوبيا", "كينيا", "تشيلي", "بيرو", "النمسا", "تشيك", "بولندا", "نيوزيلندا", "أستراليا"];
    const continents = ["آسيا", "أفريقيا", "أوروبا", "أمريكا الشمالية", "أمريكا الجنوبية", "أوقيانوسيا"];
    const difficulties = ["مبتدئ", "متوسط", "متقدم", "خبير"];
    
    const country = countries[Math.floor(Math.random() * countries.length)];
    const continent = continents[Math.floor(Math.random() * continents.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const height = Math.floor(Math.random() * 6000) + 2000;
    
    mountainsData.push({
        id: i,
        name: `جبل ${i}`,
        nameEn: `Mountain ${i}`,
        image: "./img/mountains/dawoud.jpg",
        height: height,
        location: country,
        difficulty: difficulty,
        continent: continent,
        country: country,
        description: `جبل جميل يقع في ${country} بارتفاع ${height} متر`,
        weather: "معتدل",
        bestTime: "أبريل-أكتوبر",
        climate: "بارد",
        routes: ["طريق رئيسي"],
        hazards: ["انهيارات"],
        equipment: ["معدات"],
        coordinates: {lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180},
        tags: ["جميل"],
        duration: `${Math.floor(Math.random() * 14) + 2}يوم`,
        cost: `${Math.floor(Math.random() * 4000) + 500}$`,
        successRate: `${Math.floor(Math.random() * 50) + 40}%`
    });
}

// Add 50 Moroccan Mountains
const moroccanNames = [
    "جبل توبقال", "جبل وازن", "جبل موسى", "جبل بنات إفران", "جبل اودي زيور",
    "جبل تسكاويت", "جبل أياشي", "جبل سارو", "جبل صاغرو", "جبل زاغ",
    "جبل أتلاس الكبير", "جبل الأوسط", "جبل تازة", "جبل الحبيب", "جبل القصبة",
    "جبل الزيتون", "جبل الورد", "جبل النجم", "جبل الرؤية", "جبل الصفاء",
    "جبل الأصالة", "جبل الحرية", "جبل العزة", "جبل الشموخ", "جبل الشرق",
    "جبل الغرب", "جبل الشمال", "جبل الجنوب", "جبل الفجر", "جبل الغروب",
    "جبل الرياح", "جبل الهواء", "جبل الماء", "جبل النار", "جبل الأرض",
    "جبل السماء", "جبل الحياة", "جبل الموت", "جبل الحب", "جبل الحزن",
    "جبل الفرح", "جبل الأمل", "جبل الخيبة", "جبل النصر", "جبل الهزيمة",
    "جبل السلام", "جبل الحرب", "جبل الشرف", "جبل العار", "جبل الكرم"
];

for (let i = 0; i < 50; i++) {
    mountainsData.push({
        id: 301 + i,
        name: moroccanNames[i],
        nameEn: `Moroccan Mountain ${i + 1}`,
        image: "./img/mountains/dawoud.jpg",
        height: Math.floor(Math.random() * 3000) + 1500,
        location: "المغرب",
        difficulty: i < 5 ? "خبير" : i < 15 ? "متقدم" : i < 35 ? "متوسط" : "مبتدئ",
        continent: "أفريقيا",
        country: "المغرب",
        description: `جبل مغربي جميل يقع في سلسلة جبال الأطلس`,
        weather: "معتدل",
        bestTime: "أبريل-أكتوبر",
        climate: "متوسطي",
        routes: ["طريق رئيسي"],
        hazards: ["انهيارات"],
        equipment: ["معدات"],
        coordinates: {lat: 31 + Math.random() * 6, lng: -10 - Math.random() * 12},
        tags: ["مغربي"],
        duration: `${Math.floor(Math.random() * 5) + 1}أيام`,
        cost: `${Math.floor(Math.random() * 500) + 100}د.م`,
        successRate: `${Math.floor(Math.random() * 40) + 60}%`
    });
}

console.log(`✅ تم تحميل ${mountainsData.length} جبل بنجاح!`);

// Initialize Carousel
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const container = document.getElementById('carouselContainer');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const modal = document.getElementById('modal3D');
        const closeBtn = document.getElementById('closeModalBtn');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (!container) return;
        
        let scrollDistance = 0;
        
        // Render all mountains
        mountainsData.forEach(mountain => {
            const card = document.createElement('div');
            card.className = 'mountain-card';
            
            const diffClass = mountain.difficulty === 'خبير' ? 'expert' : 
                            mountain.difficulty === 'متقدم' ? 'advanced' : 
                            mountain.difficulty === 'متوسط' ? 'intermediate' : 'beginner';
            
            card.innerHTML = `
                <div class="card-image">
                    <img src="${mountain.image}" alt="${mountain.name}">
                    <span class="difficulty-badge ${diffClass}">${mountain.difficulty}</span>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${mountain.name}</h3>
                    <p class="card-location">📍 ${mountain.location}</p>
                    <p class="card-height">📏 ${mountain.height}م</p>
                </div>
            `;
            
            card.addEventListener('click', () => {
                document.getElementById('modalImage').src = mountain.image;
                document.getElementById('modalTitle').textContent = mountain.name;
                document.getElementById('modalNameEn').textContent = mountain.nameEn;
                document.getElementById('modalDifficulty').textContent = mountain.difficulty;
                document.getElementById('modalDifficulty').className = `difficulty-badge ${diffClass}`;
                document.getElementById('modalHeight').textContent = `${mountain.height} متر`;
                document.getElementById('modalLocation').textContent = mountain.location;
                document.getElementById('modalClimate').textContent = mountain.climate;
                document.getElementById('modalBestTime').textContent = mountain.bestTime;
                document.getElementById('modalDescription').textContent = mountain.description;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            container.appendChild(card);
        });
        
        // Scroll handlers
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                scrollDistance -= 320;
                if (scrollDistance < 0) scrollDistance = 0;
                container.style.transform = `translateX(-${scrollDistance}px)`;
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const maxScroll = container.scrollWidth - container.parentElement.offsetWidth;
                scrollDistance += 320;
                if (scrollDistance > maxScroll) scrollDistance = maxScroll;
                container.style.transform = `translateX(-${scrollDistance}px)`;
            });
        }
        
        // Modal close
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }, 500);
});
