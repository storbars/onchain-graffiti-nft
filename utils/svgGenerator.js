class SVGGenerator {
    static generateFullSVG(text, style, hue, complexity) {
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <rect x="0" y="0" width="1000" height="1000" fill="blue"/>
                <circle cx="500" cy="500" r="200" fill="red"/>
                <text x="500" y="500" font-family="Arial" font-size="120" fill="#00FF00" text-anchor="middle">${text}</text>
            </svg>`;

        return svg;
    }
}

module.exports = SVGGenerator;