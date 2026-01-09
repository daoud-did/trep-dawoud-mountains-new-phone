// Consolidated Mountains Data Loader
// Merges data from: mountains.js, mountains_data.js, add_70_mountains.js, add_moroccan_mountains_fixed.js

function loadConsolidatedMountainsData() {
    let allMountains = [];
    
    // 1. Try to load from mountains_data.js (550 mountains)
    if (typeof mountainsData !== 'undefined' && Array.isArray(mountainsData)) {
        allMountains = allMountains.concat(mountainsData);
    }
    
    // 2. Try to load from mountains.js database
    if (typeof mountainsDatabase !== 'undefined' && Array.isArray(mountainsDatabase)) {
        allMountains = allMountains.concat(mountainsDatabase);
    }
    
    // 3. Try to load from add_70_mountains.js
    if (typeof newMountains !== 'undefined' && Array.isArray(newMountains)) {
        allMountains = allMountains.concat(newMountains);
    }
    
    // 4. Try to load from add_moroccan_mountains_fixed.js
    if (typeof moroccanMountains !== 'undefined' && Array.isArray(moroccanMountains)) {
        // Add default values for moroccan mountains if not complete
        allMountains = allMountains.concat(moroccanMountains.map((m, idx) => ({
            id: 1000 + idx,
            name: m.name || `Mountain ${1000 + idx}`,
            nameEn: m.nameEn || `Mountain ${1000 + idx}`,
            location: m.location || "Unknown",
            country: "Morocco",
            continent: "Africa",
            elevation: m.elevation || 3000,
            difficulty: "intermediate",
            coordinates: m.coordinates || { lat: 31.0596, lng: -7.9157 },
            image: "./images/dawoud.jpg",
            weather: "Moderate to cold, mountainous weather. Seasonal variations.",
            bestTime: "May to September",
            routes: ["Main Route"],
            hazards: ["Rocky terrain", "Weather changes"],
            equipment: ["Hiking boots", "Warm clothes", "Map"],
            firstAscent: "Unknown",
            firstAscentBy: "Local climbers",
            duration: "2-3 days",
            successRate: "75%"
        })));
    }
    
    // Remove duplicates by ID
    const uniqueMap = new Map();
    allMountains.forEach(m => {
        if (m && m.id) {
            if (!uniqueMap.has(m.id)) {
                uniqueMap.set(m.id, m);
            }
        }
    });
    
    // Convert back to array
    const consolidatedData = Array.from(uniqueMap.values());
    
    // Sort by ID for consistent ordering
    consolidatedData.sort((a, b) => a.id - b.id);
    
    return consolidatedData;
}

// Ensure all mountains have required fields
function normalizeMount (mountain) {
    return {
        id: mountain.id || Math.random(),
        name: mountain.name || "Unknown Mountain",
        nameEn: mountain.nameEn || "Unknown",
        location: mountain.location || "Unknown",
        country: mountain.country || "Unknown",
        continent: mountain.continent || "Unknown",
        elevation: mountain.elevation || 0,
        difficulty: mountain.difficulty || "intermediate",
        coordinates: mountain.coordinates || { lat: 0, lng: 0 },
        image: mountain.image || "./images/dawoud.jpg",
        weather: mountain.weather || "Varying weather conditions",
        bestTime: mountain.bestTime || "Year-round",
        routes: Array.isArray(mountain.routes) ? mountain.routes : ["Main Route"],
        hazards: Array.isArray(mountain.hazards) ? mountain.hazards : ["General hazards"],
        equipment: Array.isArray(mountain.equipment) ? mountain.equipment : ["Standard gear"],
        firstAscent: mountain.firstAscent || "Unknown",
        firstAscentBy: mountain.firstAscentBy || "Unknown",
        duration: mountain.duration || "Variable",
        successRate: mountain.successRate || "70%"
    };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadConsolidatedMountainsData, normalizeMount };
}
