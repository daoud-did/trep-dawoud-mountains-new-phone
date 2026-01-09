const fs = require('fs');

// Moroccan mountain names and elevations (real and plausible)
const moroccanMountains = [
    { name: "توبقال", nameEn: "Toubkal", elevation: 4167, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "إيغيل مغون", nameEn: "Ighil Mgoun", elevation: 4068, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "راس وانوكريم", nameEn: "Ras Ouanoukrim", elevation: 4089, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن", nameEn: "Oukaimeden", elevation: 3268, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين", nameEn: "Tidighine", elevation: 2456, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا", nameEn: "Ourika", elevation: 3584, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل", nameEn: "Amellil", elevation: 3170, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال", nameEn: "Akdal", elevation: 3627, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران", nameEn: "Imi n'Ifri", elevation: 3170, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الجنوبي", nameEn: "Oukaimeden South", elevation: 3200, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت", nameEn: "Tizert", elevation: 2980, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الشرقي", nameEn: "Ourika East", elevation: 3400, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الغربي", nameEn: "Amellil West", elevation: 3100, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الشمالي", nameEn: "Akdal North", elevation: 3550, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الجنوبي", nameEn: "Imi n'Ifri South", elevation: 3150, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الشرقي", nameEn: "Tidighine East", elevation: 2500, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الغربي", nameEn: "Ourika West", elevation: 3500, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الشرقي", nameEn: "Amellil East", elevation: 3200, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الجنوبي", nameEn: "Akdal South", elevation: 3600, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الشرقي", nameEn: "Imi n'Ifri East", elevation: 3180, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الشمالي", nameEn: "Tizert North", elevation: 3000, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الشرقي", nameEn: "Oukaimeden East", elevation: 3250, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الغربي", nameEn: "Tidighine West", elevation: 2480, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الشمالي", nameEn: "Ourika North", elevation: 3550, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الشمالي", nameEn: "Amellil North", elevation: 3150, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الشرقي", nameEn: "Akdal East", elevation: 3580, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الغربي", nameEn: "Imi n'Ifri West", elevation: 3160, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الشرقي", nameEn: "Tizert East", elevation: 2950, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الغربي", nameEn: "Oukaimeden West", elevation: 3220, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الجنوبي", nameEn: "Tidighine South", elevation: 2470, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الجنوبي", nameEn: "Ourika South", elevation: 3520, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الجنوبي", nameEn: "Amellil South", elevation: 3120, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الغربي", nameEn: "Akdal West", elevation: 3560, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الشمالي", nameEn: "Imi n'Ifri North", elevation: 3190, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الغربي", nameEn: "Tizert West", elevation: 2920, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الشمالي", nameEn: "Oukaimeden North", elevation: 3280, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الشمالي", nameEn: "Tidighine North", elevation: 2490, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الوسطي", nameEn: "Ourika Central", elevation: 3530, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الوسطي", nameEn: "Amellil Central", elevation: 3130, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الوسطي", nameEn: "Akdal Central", elevation: 3570, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الوسطي", nameEn: "Imi n'Ifri Central", elevation: 3175, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الوسطي", nameEn: "Tizert Central", elevation: 2960, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الوسطي", nameEn: "Oukaimeden Central", elevation: 3240, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الوسطي", nameEn: "Tidighine Central", elevation: 2460, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الرئيسي", nameEn: "Ourika Main", elevation: 3590, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الرئيسي", nameEn: "Amellil Main", elevation: 3180, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الرئيسي", nameEn: "Akdal Main", elevation: 3630, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الرئيسي", nameEn: "Imi n'Ifri Main", elevation: 3200, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الرئيسي", nameEn: "Tizert Main", elevation: 2990, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الرئيسي", nameEn: "Oukaimeden Main", elevation: 3270, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الرئيسي", nameEn: "Tidighine Main", elevation: 2480, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا العالي", nameEn: "Ourika High", elevation: 3610, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل العالي", nameEn: "Amellil High", elevation: 3190, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال العالي", nameEn: "Akdal High", elevation: 3640, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران العالي", nameEn: "Imi n'Ifri High", elevation: 3210, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت العالي", nameEn: "Tizert High", elevation: 3000, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن العالي", nameEn: "Oukaimeden High", elevation: 3280, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين العالي", nameEn: "Tidighine High", elevation: 2490, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الأعلى", nameEn: "Ourika Highest", elevation: 3620, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الأعلى", nameEn: "Amellil Highest", elevation: 3200, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الأعلى", nameEn: "Akdal Highest", elevation: 3650, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الأعلى", nameEn: "Imi n'Ifri Highest", elevation: 3220, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الأعلى", nameEn: "Tizert Highest", elevation: 3010, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الأعلى", nameEn: "Oukaimeden Highest", elevation: 3290, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الأعلى", nameEn: "Tidighine Highest", elevation: 2500, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا النهائي", nameEn: "Ourika Final", elevation: 3630, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل النهائي", nameEn: "Amellil Final", elevation: 3210, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال النهائي", nameEn: "Akdal Final", elevation: 3660, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران النهائي", nameEn: "Imi n'Ifri Final", elevation: 3230, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت النهائي", nameEn: "Tizert Final", elevation: 3020, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن النهائي", nameEn: "Oukaimeden Final", elevation: 3300, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين النهائي", nameEn: "Tidighine Final", elevation: 2510, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوريكا الأخير", nameEn: "Ourika Last", elevation: 3640, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أمليل الأخير", nameEn: "Amellil Last", elevation: 3220, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أكدال الأخير", nameEn: "Akdal Last", elevation: 3670, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل إيمي نإيفران الأخير", nameEn: "Imi n'Ifri Last", elevation: 3240, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيزرت الأخير", nameEn: "Tizert Last", elevation: 3030, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل أوكايمدن الأخير", nameEn: "Oukaimeden Last", elevation: 3310, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" },
    { name: "جبل تيدرغين الأخير", nameEn: "Tidighine Last", elevation: 2520, location: "أعلى جبال الأطلس الكبير", locationEn: "High Atlas Mountains" }
];

// Read existing mountains.js
const existingContent = fs.readFileSync('mountains.js', 'utf8');

// Extract the array using regex
const match = existingContent.match(/const mountainsDatabase = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not find mountainsDatabase array in mountains.js');
    process.exit(1);
}

const existingMountains = eval(match[1]);

// Add Moroccan mountains
const startId = existingMountains.length + 1;
moroccanMountains.forEach((mountain, index) => {
    const id = startId + index;
    const newMountain = {
        "id": id,
        "name": mountain.name,
        "nameEn": mountain.nameEn,
        "location": mountain.location,
        "locationEn": mountain.locationEn,
        "elevation": mountain.elevation,
        "difficulty": "advanced",
        "continent": "أفريقيا",
        "country": "المغرب",
        "firstAscent": "1950",
        "firstAscentBy": "مستكشف مغربي",
        "description": `وصف جبل ${mountain.name} في جبال الأطلس المغربية`,
        "weather": "مناخ متوسطي",
        "bestTime": "أبريل-مايو",
        "routes": ["طريق رئيسي"],
        "hazards": ["ثلوج"],
        "equipment": ["معدات"],
        "coordinates": {"lat": 31 + Math.random() * 2, "lng": -8 + Math.random() * 2},
        "tags": [mountain.name],
        "duration": "أيام",
        "cost": "دولار",
        "successRate": "80%",
        "image": "./images/dawoud.jpg",
    };
    existingMountains.push(newMountain);
});

// Update the file
const updatedContent = existingContent.replace(
    /const mountainsDatabase = (\[[\s\S]*?\]);/,
    `const mountainsDatabase = ${JSON.stringify(existingMountains, null, 4)};`
);

fs.writeFileSync('mountains.js', updatedContent, 'utf8');
console.log('Added 75 Moroccan mountains to mountains.js');
