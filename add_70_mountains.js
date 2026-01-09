const fs = require('fs');

// Generate 70 new mountains
const newMountains = [];
for (let i = 0; i < 70; i++) {
    const id = 551 + i;
    newMountains.push({
        id: id,
        name: `قمة ${id}`,
        nameEn: `Mountain ${id}`,
        slug: `mountain-${id}`,
        elevation: Math.floor(Math.random() * 8000) + 1000,
        description: `وصف عربي من 8 أسطر لقمة ${id}. هذه القمة تقدم تجربة فريدة مع مناظر طبيعية خلابة. مناسبة للمتسلقين من جميع المستويات. يمكن الوصول إليها عبر طرق متعددة. تتطلب معدات أساسية للتسلق. توفر فرصة للاكتشاف والمغامرة. الطقس يتغير بسرعة لذا كن مستعداً. نصيحة: ابدأ مبكراً في الصباح.`,
        image: "./images/dawoud.jpg",
        continent: "آسيا",
        country: "غير معروف",
        difficulty: "متوسط",
        coordinates: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180 },
        tags: ["generated"],
        cost: "مجاني",
        successRate: "80%"
    });
}

// Read existing mountains_data.js
const filePath = 'client/public/mountains_data.js';
const existingContent = fs.readFileSync(filePath, 'utf8');

// Find the end of the array
const match = existingContent.match(/(\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not find mountainsDatabase array');
    process.exit(1);
}

const existingArray = match[1];
const updatedArray = existingArray.slice(0, -1) + ',' + newMountains.map(m => JSON.stringify(m, null, 4)).join(',\n') + '\n]';

const updatedContent = existingContent.replace(match[0], updatedArray);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Added 70 new mountains to mountains_data.js');
