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

    // Generate one sample SVG and log it to console to check content
    const sampleSvg = SVGGenerator.generateFullSVG('TEST', 0, 180, 50);
    console.log('Sample SVG content:');
    console.log(sampleSvg);

    let previewCount = 1;

    for (const text of texts) {
        const style = Math.floor(Math.random() * 5);
        const hue = Math.floor(Math.random() * 360);
        const complexity = 20 + Math.floor(Math.random() * 60);
        
        const svg = SVGGenerator.generateFullSVG(text, style, hue, complexity);
        const fileName = `preview_${previewCount}_${text.replace(/\s+/g, '_')}.svg`;
        const filePath = path.join(outputDir, fileName);
        
        // Write file and log its contents
        fs.writeFileSync(filePath, svg, 'utf8');
        console.log(`Generated ${fileName}`);
        if (previewCount === 1) {
            console.log('First file content:', fs.readFileSync(filePath, 'utf8'));
        }
        
        previewCount++;
    }
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');