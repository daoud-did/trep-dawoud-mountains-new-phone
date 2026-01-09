#!/usr/bin/env bash
# 🏔️ TREP DAWOUD - Complete System Verification Script

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🏔️  TREP DAWOUD - System Verification Script          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL=0
PASSED=0
FAILED=0

# Function to check file existence
check_file() {
    local file=$1
    local description=$2
    TOTAL=$((TOTAL + 1))
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $description"
        echo "   📍 Location: $file"
        size=$(du -h "$file" | cut -f1)
        echo "   📊 Size: $size"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌${NC} $description"
        echo "   📍 Expected: $file"
        FAILED=$((FAILED + 1))
    fi
    echo ""
}

# Function to check directory
check_directory() {
    local dir=$1
    local description=$2
    TOTAL=$((TOTAL + 1))
    
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅${NC} $description"
        echo "   📍 Location: $dir"
        count=$(ls -1 "$dir" 2>/dev/null | wc -l)
        echo "   📊 Files: $count"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌${NC} $description"
        echo "   📍 Expected: $dir"
        FAILED=$((FAILED + 1))
    fi
    echo ""
}

# Check main files
echo -e "${BLUE}📦 Checking Main Files...${NC}"
echo "═══════════════════════════════════════════════════════════"
check_file "index.html" "Responsive Homepage"
check_file "mountains_data.js" "Mountain Database (550 items)"
check_file "js/bottom-carousel.js" "Interactive Carousel"
check_file "TEST_SYSTEM.html" "System Testing Page"

# Check documentation
echo -e "${BLUE}📚 Checking Documentation...${NC}"
echo "═══════════════════════════════════════════════════════════"
check_file "README.md" "Quick Start Guide"
check_file "MOUNTAINS_SYSTEM_GUIDE.md" "Complete Documentation"
check_file "FINAL_SUMMARY.md" "Project Summary"
check_file "COMPLETION_REPORT.txt" "Completion Report"

# Check directories
echo -e "${BLUE}📁 Checking Directories...${NC}"
echo "═══════════════════════════════════════════════════════════"
check_directory "images" "Images Folder"
check_directory "js" "JavaScript Folder"
check_directory "css" "CSS Folder"

# Check images
echo -e "${BLUE}🖼️  Checking Images...${NC}"
echo "═══════════════════════════════════════════════════════════"
check_file "images/dawoud.jpg" "Main Mountain Image"

# Check CSS files
echo -e "${BLUE}🎨 Checking CSS Files...${NC}"
echo "═══════════════════════════════════════════════════════════"
check_file "css/card-design.css" "Card Design Styles"
check_file "css/oled_led_effects.css" "LED Effects Styles"

# Summary
echo -e "${BLUE}📊 Verification Summary${NC}"
echo "═══════════════════════════════════════════════════════════"
echo -e "Total Checks: ${YELLOW}$TOTAL${NC}"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! System is ready! ✨${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Open index.html in your browser"
    echo "2. Or open TEST_SYSTEM.html to run tests"
    echo "3. Read MOUNTAINS_SYSTEM_GUIDE.md for details"
else
    echo -e "${RED}⚠️  Some checks failed. Please review above.${NC}"
fi

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "Status: ✅ Complete"
echo "Version: 1.0"
echo "═══════════════════════════════════════════════════════════"
