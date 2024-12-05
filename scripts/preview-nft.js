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
    const styles = [0, 1, 2, 3, 4];
    const hues = [0, 60, 120, 180, 240, 300];
    const complexities = [20, 50, 80];

    let previewCount = 1;

    // Generate one preview per text
    for (const text of texts) {
        const style = styles[Math.floor(Math.random() * styles.length)];
        const hue = hues[Math.floor(Math.random() * hues.length)];
        const complexity = complexities[Math.floor(Math.random() * complexities.length)];
        
        const svg = SVGGenerator.generateFullSVG(text, style, hue, complexity);
        const fileName = `preview_${previewCount}_${text.replace(/\s+/g, '_')}.svg`;
        fs.writeFileSync(path.join(outputDir, fileName), svg);
        console.log(`Generated: ${fileName}`);
        previewCount++;
    }
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');