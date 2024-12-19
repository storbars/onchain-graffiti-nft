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

    // Generate examples of each style
    const styles = ['wave', 'street', 'flow'];
    styles.forEach((styleName, styleIndex) => {
        console.log(`\nGenerating ${styleName} examples...`);
        
        // Generate 3 examples of each style
        for (let i = 0; i < 3; i++) {
            const text = texts[Math.floor(Math.random() * texts.length)];
            const result = SVGGenerator.generateFullSVG(
                text,
                styleIndex,
                Math.random() * 360,
                20 + Math.random() * 80
            );

            const fileName = `preview_${String(previewCount).padStart(3, '0')}_${styleName}_${text.replace(/\s+/g, '_')}.svg`;
            fs.writeFileSync(path.join(outputDir, fileName), result.svg);
            console.log(`Generated ${styleName}: ${fileName}`);
            console.log('Metadata:', JSON.stringify(result.metadata, null, 2));
            previewCount++;
        }
    });
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');