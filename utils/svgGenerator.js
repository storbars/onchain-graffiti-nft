const { createCanvas } = require('canvas');

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
    
    static generateGraffitiPath(text, style) {
        const canvas = createCanvas(1000, 1000);
        const ctx = canvas.getContext('2d');
        
        const fonts = [
            'bold 120px Arial',
            'bold 140px Impact',
            'bold 130px Helvetica',
            'bold 150px "Arial Black"',
            'bold 160px Verdana'
        ];
        
        ctx.font = fonts[style % fonts.length];
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        
        const distortionAmount = 10 + (style * 5);
        const points = [];
        
        // Create distorted path points for text
        for (let i = 0; i < textWidth; i += 10) {
            const distX = (Math.random() - 0.5) * distortionAmount;
            const distY = (Math.random() - 0.5) * distortionAmount;
            points.push(`${500 - textWidth/2 + i + distX},${500 + distY}`);
        }
        
        // Generate the SVG path
        const pathData = `M ${points[0]} L ${points.join(' ')} Z`;
        
        return `
            <path d="${pathData}" 
                fill="none" 
                stroke="white" 
                stroke-width="8"
                filter="url(#graffiti-filter)" />
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
        const graffitiText = this.generateGraffitiPath(text, style);
        
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