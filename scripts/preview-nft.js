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

    const timestamp = Date.now();
    let previewCount = 1;

    // First, generate some Wave Lines examples
    console.log('\nGenerating Wave Lines examples...');
    for (let i = 0; i < 3; i++) {
        const text = texts[Math.floor(Math.random() * texts.length)];
        const result = SVGGenerator.generateFullSVG(
            text,
            0, // Wave Lines style
            Math.random() * 360,
            20 + Math.random() * 80
        );

        const fileName = `preview_${String(previewCount).padStart(3, '0')}_wave_${text.replace(/\s+/g, '_')}.svg`;
        fs.writeFileSync(path.join(outputDir, fileName), result.svg);
        console.log(`Generated Wave Lines: ${fileName}`);
        previewCount++;
    }

    // Then, generate Street Lines examples
    console.log('\nGenerating Street Lines examples...');
    for (let i = 0; i < 3; i++) {
        const text = texts[Math.floor(Math.random() * texts.length)];
        const result = SVGGenerator.generateFullSVG(
            text,
            1, // Street Lines style
            Math.random() * 360,
            20 + Math.random() * 80
        );

        const fileName = `preview_${String(previewCount).padStart(3, '0')}_street_${text.replace(/\s+/g, '_')}.svg`;
        fs.writeFileSync(path.join(outputDir, fileName), result.svg);
        console.log(`Generated Street Lines: ${fileName}`);
        previewCount++;
    }
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');