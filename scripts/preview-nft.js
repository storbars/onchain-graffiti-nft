const SVGGenerator = require('../utils/svgGenerator');
const fs = require('fs');
const path = require('path');

// Create preview directory if it doesn't exist
const outputDir = path.join(__dirname, '../preview');
console.log('Output directory:', outputDir);

if (!fs.existsSync(outputDir)) {
    console.log('Creating output directory...');
    fs.mkdirSync(outputDir, { recursive: true });
}

function getFormattedDate() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
}

function generatePreviews() {
    const texts = [
        'APECHAIN',
        'APE',
        'BULLISH',
        'APE STRONG'
    ];

    // Get current formatted date-time
    const dateTime = getFormattedDate();
    console.log('Using datetime stamp:', dateTime);

    // List existing files
    console.log('Existing files in directory:');
    fs.readdirSync(outputDir).forEach(file => {
        console.log('  -', file);
    });

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        const style = Math.floor(Math.random() * 5);
        const hue = Math.floor(Math.random() * 360);
        const complexity = 20 + Math.floor(Math.random() * 60);
        
        const svg = SVGGenerator.generateFullSVG(text, style, hue, complexity);
        
        // Create filename with number and formatted date-time
        const fileName = `preview_${String(i + 1).padStart(3, '0')}_${dateTime}_${text.replace(/\s+/g, '_')}.svg`;
        const filePath = path.join(outputDir, fileName);
        
        console.log('Writing file:', filePath);
        fs.writeFileSync(filePath, svg, 'utf8');
        console.log(`Generated: ${fileName}`);
        
        // Verify file was created
        if (fs.existsSync(filePath)) {
            console.log('File successfully created');
            const stats = fs.statSync(filePath);
            console.log('File size:', stats.size, 'bytes');
        } else {
            console.log('WARNING: File was not created!');
        }
    }

    // List files after generation
    console.log('\nFiles in directory after generation:');
    fs.readdirSync(outputDir).forEach(file => {
        console.log('  -', file);
    });
}

console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');