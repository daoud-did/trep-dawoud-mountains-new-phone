// 550 Mountains Database - Complete Collection
const mountainsData = [
    // Real Mountains (1-10)
    {
        id: 1,
        name: "جبل إيفرست",
        nameEn: "Mount Everest",
        image: "images/dawoud.jpg",
        difficulty: "خبير",
        difficultyEn: "expert",
        location: "نيبال",
        height: 8849,
        climate: "بارد جداً، ثلوج دائمة",
        bestTime: "مايو - يونيو",
        description: "أعلى جبل في العالم، يقع في نطاق جبال الهيمالايا بين نيبال والصين. يشتهر بندرته وخطورة تسلقه"
    },
    {
        id: 2,
        name: "جبل كليمنجارو",
        nameEn: "Mount Kilimanjaro",
        image: "images/dawoud.jpg",
        difficulty: "متوسط",
        difficultyEn: "intermediate",
        location: "تنزانيا",
        height: 5895,
        climate: "معتدل إلى بارد، ثلوج في القمة",
        bestTime: "يناير - فبراير، يوليو - سبتمبر",
        description: "أعلى جبل في أفريقيا، يتميز بقمته المغطاة بالثلوج على مدار السنة"
    },
    {
        id: 3,
        name: "جبل مون بلان",
        nameEn: "Mont Blanc",
        image: "images/dawoud.jpg",
        difficulty: "متوسط",
        difficultyEn: "intermediate",
        location: "فرنسا",
        height: 4808,
        description: "أعلى جبل في جبال الألب، يقع على الحدود بين فرنسا وإيطاليا"
    },
    {
        id: 4,
        name: "جبل توبقال",
        nameEn: "Mount Toubkal",
        image: "images/dawoud.jpg",
        difficulty: "متوسط",
        difficultyEn: "intermediate",
        location: "المغرب",
        height: 4165,
        description: "أعلى جبل في جبال الأطلس والعالم العربي، يقع في جنوب المغرب"
    },
    {
        id: 5,
        name: "جبل موسى",
        nameEn: "Mount Moses",
        image: "images/dawoud.jpg",
        difficulty: "مبتدئ",
        difficultyEn: "beginner",
        location: "مصر",
        height: 2285,
        description: "جبل مقدس في شبه جزيرة سيناء، معروف أيضاً بجبل سيناء"
    },
    {
        id: 6,
        name: "جبل كينيا",
        nameEn: "Mount Kenya",
        image: "images/dawoud.jpg",
        difficulty: "متقدم",
        difficultyEn: "advanced",
        location: "كينيا",
        height: 5199,
        description: "ثاني أعلى جبل في أفريقيا، يقع في وسط كينيا"
    },
    {
        id: 7,
        name: "جبل فوجي",
        nameEn: "Mount Fuji",
        image: "images/dawoud.jpg",
        difficulty: "مبتدئ",
        difficultyEn: "beginner",
        location: "اليابان",
        height: 3776,
        description: "أعلى جبل في اليابان، رمز ثقافي مهم في الحضارة اليابانية"
    },
    {
        id: 8,
        name: "جبل دينالي",
        nameEn: "Denali",
        image: "images/dawoud.jpg",
        difficulty: "متقدم",
        difficultyEn: "advanced",
        location: "الولايات المتحدة",
        height: 6190,
        description: "أعلى جبل في أمريكا الشمالية، يقع في ألاسكا"
    },
    {
        id: 9,
        name: "جبل أكونكاغوا",
        nameEn: "Aconcagua",
        image: "images/dawoud.jpg",
        difficulty: "متقدم",
        difficultyEn: "advanced",
        location: "الأرجنتين",
        height: 6961,
        description: "أعلى جبل في نصف الكرة الغربي، يقع في جبال الأنديز"
    },
    {
        id: 10,
        name: "جبل إلبروس",
        nameEn: "Mount Elbrus",
        image: "images/dawoud.jpg",
        difficulty: "متقدم",
        difficultyEn: "advanced",
        location: "روسيا",
        height: 5642,
        description: "أعلى جبل في قارة أوروبا، يقع في سلسلة جبال القوقاز"
    }
];

// Generate 540 additional mountains (IDs 11-550)
function generateMountains() {
    const regions = [
        { name: "أفريقيا", countries: ["مصر", "تنزانيا", "كينيا", "جنوب أفريقيا", "مدغشقر", "مراكش", "الجزائر"] },
        { name: "آسيا", countries: ["الصين", "الهند", "نيبال", "باكستان", "أفغانستان", "تايلاند", "إندونيسيا"] },
        { name: "أوروبا", countries: ["فرنسا", "سويسرا", "النمسا", "إيطاليا", "ألمانيا", "بولندا", "تشيك"] },
        { name: "أمريكا الشمالية", countries: ["كندا", "الولايات المتحدة", "المكسيك", "جواتيمالا", "كوستاريكا"] },
        { name: "أمريكا الجنوبية", countries: ["الأرجنتين", "تشيلي", "بيرو", "بوليفيا", "كولومبيا", "فنزويلا"] },
        { name: "أوقيانوسيا", countries: ["أستراليا", "نيوزيلندا", "فيجي", "بابوا غينيا الجديدة"] }
    ];

    const difficulties = ["مبتدئ", "متوسط", "متقدم", "خبير"];
    const difficultiesEn = ["beginner", "intermediate", "advanced", "expert"];

    let mountainId = 11;
    for (let i = 0; i < 540; i++) {
        const region = regions[Math.floor(Math.random() * regions.length)];
        const country = region.countries[Math.floor(Math.random() * region.countries.length)];
        const diffIndex = Math.floor(Math.random() * difficulties.length);
        const height = Math.floor(Math.random() * 7000) + 1000;

        mountainsData.push({
            id: mountainId,
            name: `جبل ${mountainId}`,
            nameEn: `Mountain ${mountainId}`,
            image: "images/dawoud.jpg",
            difficulty: difficulties[diffIndex],
            difficultyEn: difficultiesEn[diffIndex],
            location: country,
            height: height,
            description: `جبل جميل يقع في ${country}، الارتفاع: ${height} متر`
        });

        mountainId++;
    }
}

// Initialize mountains
generateMountains();

console.log(`تم تحميل ${mountainsData.length} جبل بنجاح`);
