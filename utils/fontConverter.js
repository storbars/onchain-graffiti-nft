const fs = require('fs');
const path = require('path');

function convertFontToBase64(fontPath) {
    try {
        // Read the font file
        const fontBuffer = fs.readFileSync(fontPath);
        // Convert to base64
        const base64Font = fontBuffer.toString('base64');
        
        // Update the SVGGenerator with the new font
        const svgGeneratorPath = path.join(__dirname, 'svgGenerator.js');
        let svgContent = fs.readFileSync(svgGeneratorPath, 'utf-8');
        
        // Replace the placeholder with actual font data
        svgContent = svgContent.replace(
            /const customFontBase64 = '.*?'/,
            `const customFontBase64 = '${base64Font}'`
        );
        
        // Write back to file
        fs.writeFileSync(svgGeneratorPath, svgContent);
        
        console.log('Font successfully converted and integrated!');
    } catch (error) {
        console.error('Error processing font:', error);
    }
}

// Check if font path is provided
if (process.argv.length < 3) {
    console.log('Usage: node fontConverter.js path/to/your/font.ttf');
    process.exit(1);
}

// Convert the font
convertFontToBase64(process.argv[2]);
