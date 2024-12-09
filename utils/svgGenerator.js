class SVGGenerator {
    static generateFullSVG(text, style, hue, complexity) {
        const fontSize = 120;
        const x = 500;
        const y = 500;
        
        // Your base64 font will be here
        const customFontBase64 = 'YOUR_BASE64_FONT_DATA_HERE';
        
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <!-- Background rectangle -->
                <rect width="1000" height="1000" fill="#1a1a1a" />
                
                <!-- Simple background line for testing -->
                <line x1="0" y1="200" x2="1000" y2="800" 
                    stroke="#FF0000" 
                    stroke-width="5" 
                    opacity="0.5" />
                
                <!-- Text with direct color -->
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}px" 
                    font-family="Arial" 
                    fill="#00FF00" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>
        `;
    }
}

module.exports = SVGGenerator;