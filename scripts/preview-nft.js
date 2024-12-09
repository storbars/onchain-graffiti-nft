const SVGGenerator = require('../utils/svgGenerator');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../preview');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function generatePreviews() {
    const texts = [
        'APECHAIN',
        'APE',
        'BULLISH',
        'APE STRONG',
        'TOGETHER',
        'MISSED THE BOAT',
        'APE IN',
        'APE FOLLOW APE',
        'YACHT CLUB',
        'CULT',
        'NOT A CULT',
        'GEN ART LOVER',
        'FUCK IT',
        'PFP LOVER',
        'JUST APED',
        'BORED RUN CLUB',
        'TEAM ORANGE',
        'TEAM AQUA',
        'MONKEE FTW',
        'DIAMOND HANDS',
        'NFT HOARDER',
        'MBA CERTIFIED',
        'MONKEE BUSINESS'
    ];

    // Create timestamp for unique filenames
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    for (const text of texts) {
        const style = Math.floor(Math.random() * 5);
        const hue = Math.floor(Math.random() * 360);
        const complexity = 20 + Math.floor(Math.random() * 60);
        
        const svg = SVGGenerator.generateFullSVG(text, style, hue, complexity);
        
        // Create unique filename with timestamp
        const fileName = `preview_${timestamp}_${text.replace(/\s+/g, '_')}.svg`;
        const filePath = path.join(outputDir, fileName);
        
        fs.writeFileSync(filePath, svg, 'utf8');
        console.log(`Generated: ${fileName}`);
    }
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');