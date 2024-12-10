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

    // Generate examples of each style variation
    ['wave-lines', 'street-lines'].forEach((backgroundType, typeIndex) => {
        texts.forEach((text, index) => {
            // For street-lines, generate all style variations
            const stylesToGenerate = backgroundType === 'street-lines' ? [0, 1, 2, 3] : [0];
            
            stylesToGenerate.forEach(styleVariation => {
                const style = typeIndex + styleVariation; // Combine background type and style variation
                const result = SVGGenerator.generateFullSVG(text, style, 
                    Math.random() * 360, // random hue
                    20 + Math.random() * 80 // random complexity
                );
                
                const styleLabel = backgroundType === 'street-lines' 
                    ? `_street_${result.metadata.attributes.find(a => a.trait_type === 'variation').value.toLowerCase().replace(/\s+/g, '_')}` 
                    : '_wave';
                
                const fileName = `preview_${String(previewCount).padStart(3, '0')}_${timestamp}${styleLabel}_${text.replace(/\s+/g, '_')}.svg`;
                fs.writeFileSync(path.join(outputDir, fileName), result.svg);
                console.log(`Generated: ${fileName}`);
                console.log('Metadata:', JSON.stringify(result.metadata, null, 2));
                
                previewCount++;
            });
        });
    });
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');