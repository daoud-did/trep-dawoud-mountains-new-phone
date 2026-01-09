const fs = require('fs');

// Generate 150 mountain entries
const generateMountains = () => {
    const mountains = [];
    const continents = ['أفريقيا', 'أوروبا', 'آسيا', 'أمريكا الشمالية', 'أمريكا الجنوبية', 'أستراليا'];
    const countries = ['باكستان', 'نيبال', 'الصين', 'الهند', 'فرنسا', 'إيطاليا', 'تنزانيا', 'روسيا', 'الأرجنتين', 'ألاسكا', 'كندا', 'اليابان', 'كوريا الجنوبية', 'تركيا', 'إيران', 'أفغانستان', 'قيرغيزستان', 'طاجيكستان', 'أوزبكستان', 'كازاخستان', 'منغوليا', 'ميانمار', 'فيتنام', 'لاوس', 'كمبوديا', 'تايلاند', 'ماليزيا', 'إندونيسيا', 'الفلبين', 'أستراليا', 'نيوزيلندا', 'بابوا غينيا الجديدة', 'تشيلي', 'بيرو', 'بوليفيا', 'الإكوادور', 'كولومبيا', 'فنزويلا', 'البرازيل', 'المكسيك', 'الولايات المتحدة', 'المغرب', 'جنوب أفريقيا', 'إثيوبيا', 'كينيا', 'أوغندا', 'مصر', 'الجزائر', 'تونس', 'ليبيا', 'السودان', 'تشاد', 'النيجر', 'مالي', 'بوركينا فاسو', 'غانا', 'ساحل العاج', 'السنغال', 'غامبيا', 'غينيا', 'غينيا بيساو', 'سيراليون', 'ليبيريا', 'الكاميرون', 'جمهورية أفريقيا الوسطى', 'الكونغو', 'جمهورية الكونغو الديمقراطية', 'أنغولا', 'زامبيا', 'زيمبابوي', 'موزمبيق', 'مدغشقر', 'موريشيوس', 'جزر القمر', 'جيبوتي', 'إريتريا', 'الصومال', 'الجابون', 'غينيا الاستوائية', 'رواندا', 'بوروندي', 'السوازيلاند', 'ليسوتو', 'ناميبيا', 'بوتسوانا', 'زامبيا', 'زيمبابوي', 'موزمبيق', 'مدغشقر', 'موريشيوس', 'جزر القمر', 'جيبوتي', 'إريتريا', 'الصومال', 'الجابون', 'غينيا الاستوائية', 'رواندا', 'بوروندي', 'السوازيلاند', 'ليسوتو', 'ناميبيا', 'بوتسوانا', 'زامبيا', 'زيمبابوي', 'موزمبيق', 'مدغشقر', 'موريشيوس', 'جزر القمر', 'جيبوتي', 'إريتريا', 'الصومال', 'الجابون', 'غينيا الاستوائية', 'رواندا', 'بوروندي', 'السوازيلاند', 'ليسوتو', 'ناميبيا', 'بوتسوانا', 'زامبيا', 'زيمبابوي', 'موزمبيق', 'مدغشقر', 'موريشيوس', 'جزر القمر', 'جيبوتي', 'إريتريا', 'الصومال', 'الجابون', 'غينيا الاستوائية', 'رواندا', 'بوروندي', 'السوازيلاند', 'ليسوتو', 'ناميبيا', 'بوتسوانا'];
    const difficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
    const weatherTypes = ['مناخ متنوع', 'مناخ استوائي', 'مناخ قاري', 'مناخ جاف', 'مناخ معتدل', 'مناخ متوسطي'];
    const bestTimes = ['أبريل-مايو', 'يونيو-سبتمبر', 'يناير-مارس', 'نوفمبر-فبراير', 'فبراير-أغسطس', 'سبتمبر-نوفمبر', 'ديسمبر-مارس', 'مايو-أكتوبر'];
    const hazards = ['ارتفاع عالي', 'ثلوج', 'رياح قوية', 'حرارة', 'أمطار', 'زلازل', 'براكين', 'أعاصير', 'حرائق', 'ضباب'];
    const equipment = ['معدات أساسية', 'معدات متقدمة', 'معدات احترافية'];
    const durations = ['1-3 أيام', '3-7 أيام', '5-10 أيام', '7-14 يوم', '10-20 يوم', '14-21 يوم'];
    const costs = ['200-500 دولار', '500-1500 دولار', '1000-3000 دولار', '2000-5000 دولار', '3000-7000 دولار', '5000-10000 دولار', '7000-15000 دولار'];
    const successRates = ['65%', '70%', '75%', '80%', '85%', '90%', '95%', '98%'];

    for (let i = 1; i <= 150; i++) {
        const continent = continents[Math.floor(Math.random() * continents.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
        const elevation = Math.floor(Math.random() * 8000) + 1000; // 1000-9000 meters
        const weather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        const bestTime = bestTimes[Math.floor(Math.random() * bestTimes.length)];
        const hazard = hazards[Math.floor(Math.random() * hazards.length)];
        const equip = equipment[Math.floor(Math.random() * equipment.length)];
        const duration = durations[Math.floor(Math.random() * durations.length)];
        const cost = costs[Math.floor(Math.random() * costs.length)];
        const successRate = successRates[Math.floor(Math.random() * successRates.length)];

        const mountain = {
            id: i,
            name: `جبل ${i}`,
            nameEn: `Mountain ${i}`,
            location: country,
            locationEn: country,
            elevation: elevation,
            difficulty: difficulty,
            continent: continent,
            country: country,
            firstAscent: `${Math.floor(Math.random() * 200) + 1800}`,
            firstAscentBy: `Explorer ${i}`,
            description: `وصف جبل ${i} في ${country}.`,
            weather: weather,
            bestTime: bestTime,
            routes: [`طريق ${i}`],
            hazards: [hazard],
            equipment: [equip],
            image: "./images/dawoud.jpg",
            coordinates: {
                lat: (Math.random() - 0.5) * 180,
                lng: (Math.random() - 0.5) * 360
            },
            tags: [`جبل ${i}`],
            duration: duration,
            cost: cost,
            successRate: successRate
        };

        mountains.push(mountain);
    }

    return mountains;
};

// Generate and save mountains
const mountains = generateMountains();
const content = `// TREP DAWOUD - Mountains Database
// Complete database of 150 mountains with detailed information

const mountainsDatabase = ${JSON.stringify(mountains, null, 4)};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mountainsDatabase;
}`;

fs.writeFileSync('mountains.js', content, 'utf8');
console.log('Generated 150 mountains in mountains.js');
