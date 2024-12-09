class SVGGenerator {
    static generateFullSVG(text, style, hue, complexity) {
        const fontSize = 120;
        const x = 500;
        const y = 500;
        
        // Create simple colors based on style
        const colors = [
            '#FF3333',  // Red
            '#33FF33',  // Green
            '#3333FF',  // Blue
            '#FFFF33',  // Yellow
            '#FF33FF'   // Magenta
        ];
        const textColor = colors[style % colors.length];
        
        return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <!-- Background -->
                <rect width="1000" height="1000" fill="#1a1a1a" />
                
                <!-- Simple colored wave in background -->
                <path 
                    d="M 0 400 Q 250 200 500 400 T 1000 400" 
                    stroke="${colors[(style + 1) % colors.length]}" 
                    stroke-width="5" 
                    fill="none" 
                />
                
                <!-- Text with solid color -->
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    font-family="Arial" 
                    fill="${textColor}" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>`;
    }
}

module.exports = SVGGenerator;