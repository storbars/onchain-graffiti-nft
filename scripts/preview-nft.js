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

    // Generate samples with both background styles
    const timestamp = Date.now();
    let previewCount = 1;

    // Generate both styles for each text
    texts.forEach((text, index) => {
        // Wave Lines version
        const waveStyle = 0; // Wave Lines
        const waveResult = SVGGenerator.generateFullSVG(text, waveStyle, 
            Math.random() * 360, // random hue
            20 + Math.random() * 80 // random complexity
        );
        
        const waveFileName = `preview_${String(previewCount).padStart(3, '0')}_${timestamp}_wave_${text.replace(/\s+/g, '_')}.svg`;
        fs.writeFileSync(path.join(outputDir, waveFileName), waveResult.svg);
        console.log(`Generated Wave Lines: ${waveFileName}`);
        console.log('Metadata:', JSON.stringify(waveResult.metadata, null, 2));
        previewCount++;

        // Street Lines version
        const streetStyle = 1; // Street Lines
        const streetResult = SVGGenerator.generateFullSVG(text, streetStyle, 
            Math.random() * 360, // random hue
            20 + Math.random() * 80 // random complexity
        );
        
        const streetFileName = `preview_${String(previewCount).padStart(3, '0')}_${timestamp}_street_${text.replace(/\s+/g, '_')}.svg`;
        fs.writeFileSync(path.join(outputDir, streetFileName), streetResult.svg);
        console.log(`Generated Street Lines: ${streetFileName}`);
        console.log('Metadata:', JSON.stringify(streetResult.metadata, null, 2));
        previewCount++;
    });
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');