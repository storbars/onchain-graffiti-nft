class SVGGenerator {
    static generateFullSVG(text, style, hue, complexity) {
        const fontSize = 120;
        const x = 500;
        const y = 500;

        // Use solid colors based on style
        const colors = [
            '#ff3333',  // Red
            '#33FF33',  // Green
            '#3333FF',  // Blue
            '#FFFF33',  // Yellow
            '#FF33FF'   // Magenta
        ];
        const textColor = colors[style % colors.length];

        return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <rect width="1000" height="1000" fill="#1a1a1a" />
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    fill="${textColor}" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>`;
    }
}

module.exports = SVGGenerator;