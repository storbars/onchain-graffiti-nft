class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        // Previous background code remains the same
        // ... 
    }
    
    static generateGraffitiText(text, style) {
        const maxWidth = 800; // Maximum width for text
        const maxHeight = 400; // Maximum height for text
        const x = 500;
        const y = 500;
        
        // Calculate initial fontSize based on text length
        let fontSize = Math.min(
            900 / Math.sqrt(text.length), // Scale down for longer texts
            120 + (style * 10)
        );
        
        // Add text measurement function
        const getTextWidth = (text, fontSize) => {
            const averageCharWidth = fontSize * 0.6; // Approximate width per character
            return text.length * averageCharWidth;
        };
        
        // Adjust fontSize to fit maxWidth
        while (getTextWidth(text, fontSize) > maxWidth) {
            fontSize *= 0.9;
        }
        
        // For multi-word texts, add line breaks if needed
        const words = text.split(' ');
        let finalText = text;
        
        if (words.length > 2 && fontSize < 80) {
            const halfLength = Math.ceil(words.length / 2);
            const firstLine = words.slice(0, halfLength).join(' ');
            const secondLine = words.slice(halfLength).join(' ');
            finalText = `${firstLine}\n${secondLine}`;
            fontSize *= 1.2; // Increase font size since we're using two lines
        }
        
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
                ${finalText.split('\n').map((line, i) => 
                    `<tspan x="${x}" dy="${i === 0 ? -fontSize/2 : fontSize}">${line}</tspan>`
                ).join('')}
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
                <rect width="1000" height="1000" fill="#f5f5f5" />
                ${background}
                ${graffitiText}
            </svg>
        `;
    }
}

module.exports = SVGGenerator;