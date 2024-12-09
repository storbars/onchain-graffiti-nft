class SVGGenerator {
    static generateFullSVG(text, style, hue, complexity) {
        const timestamp = Date.now();
        const fileName = `preview_${timestamp}_${text}`;
        
        return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <rect width="1000" height="1000" fill="#1a1a1a" />
                <text 
                    x="500" 
                    y="500" 
                    font-size="120" 
                    fill="#FF0000" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>`;
    }
}

module.exports = SVGGenerator;