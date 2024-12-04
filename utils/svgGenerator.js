class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const points = [];
        const amplitude = 50 + (complexity % 30);
        const frequency = 0.01 + (complexity % 10) * 0.002;
        
        for (let x = 0; x < 1000; x += 10) {
            const y = 500 + Math.sin(x * frequency) * amplitude;
            points.push(`${x},${y}`);
        }
        
        return `
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:hsl(${hue},70%,60%);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:hsl(${(hue + 30) % 360},70%,60%);stop-opacity:1" />
                </linearGradient>
            </defs>
            <path d="M ${points.join(' L ')}" stroke="url(#grad)" stroke-width="5" fill="none" />
        `;
    }
    
    static generateGraffitiText(text, style) {
        const fontSize = 120 + (style * 10);
        const x = 500;
        const y = 500;
        
        return `
            <text 
                x="${x}" 
                y="${y}" 
                font-size="${fontSize}px" 
                font-family="Arial Black" 
                fill="white" 
                text-anchor="middle" 
                dominant-baseline="middle"
                filter="url(#graffiti-filter)">
                ${text}
            </text>
            <defs>
                <filter id="graffiti-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    <feOffset dx="2" dy="2" />
                </filter>
            </defs>
        `;
    }
    
    static generateFullSVG(text, style, hue, complexity) {
        const background = this.generateSquiggleBackground(hue, complexity);
        const graffitiText = this.generateGraffitiText(text, style);
        
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <rect width="1000" height="1000" fill="black" />
                ${background}
                ${graffitiText}
            </svg>
        `;
    }
}

module.exports = SVGGenerator;