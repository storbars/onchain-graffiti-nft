const SVGGenerator = require('../utils/svgGenerator');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Create preview directory if it doesn't exist
const outputDir = path.join(__dirname, '../preview');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function generateRandomString() {
    return crypto.randomBytes(4).toString('hex');
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

    const batchId = `${Date.now()}_${generateRandomString()}`;
    console.log(`Generating batch: ${batchId}`);

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const style = Math.floor(Math.random() * 5);
        const hue = Math.floor(Math.random() * 360);
        const complexity = 20 + Math.floor(Math.random() * 60);
        
        const svg = SVGGenerator.generateFullSVG(text, style, hue, complexity);
        
        const uniqueId = generateRandomString();
        const fileName = `${batchId}_${String(i + 1).padStart(3, '0')}_${text.replace(/\s+/g, '_')}_${uniqueId}.svg`;
        const filePath = path.join(outputDir, fileName);
        
        fs.writeFileSync(filePath, svg, 'utf8');
        console.log(`Generated: ${fileName}`);
    }
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');