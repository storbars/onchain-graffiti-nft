const SVGGenerator = require('../utils/svgGenerator');
const fs = require('fs');
const path = require('path');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, '../preview');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Generate multiple preview NFTs with different parameters
function generatePreviews() {
    const texts = ['GRAFT', 'CRYPTO', 'NFT', 'ART'];
    const styles = [0, 1, 2, 3, 4];
    const hues = [0, 60, 120, 180, 240, 300]; // Different colors
    const complexities = [20, 50, 80]; // Different complexity levels

    let previewCount = 1;

    // Generate combinations
    for (const text of texts) {
        for (const style of styles) {
            for (const hue of hues) {
                for (const complexity of complexities) {
                    const svg = SVGGenerator.generateFullSVG(text, style, hue, complexity);
                    const fileName = `preview_${previewCount}_${text}_style${style}_hue${hue}_complex${complexity}.svg`;
                    fs.writeFileSync(path.join(outputDir, fileName), svg);
                    console.log(`Generated: ${fileName}`);
                    previewCount++;
                }
            }
        }
    }
}

// Run the preview generation
console.log('Starting NFT preview generation...');
generatePreviews();
console.log('Preview generation complete! Check the /preview directory.');
