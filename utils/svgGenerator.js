class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        // Previous background code remains the same...
    }
    
    static generateGraffitiText(text, style) {
        const maxWidth = 800;
        const maxHeight = 400;
        const x = 500;
        const y = 500;
        
        // Replace this with your base64 encoded font
        const customFontBase64 = 'YOUR_BASE64_FONT_DATA_HERE';
        
        let fontSize = Math.min(
            900 / Math.sqrt(text.length),
            120 + (style * 10)
        );
        
        const getTextWidth = (text, fontSize) => {
            const averageCharWidth = fontSize * 0.6;
            return text.length * averageCharWidth;
        };
        
        while (getTextWidth(text, fontSize) > maxWidth) {
            fontSize *= 0.9;
        }
        
        const words = text.split(' ');
        let finalText = text;
        
        if (words.length > 2 && fontSize < 80) {
            const halfLength = Math.ceil(words.length / 2);
            const firstLine = words.slice(0, halfLength).join(' ');
            const secondLine = words.slice(halfLength).join(' ');
            finalText = `${firstLine}\n${secondLine}`;
            fontSize *= 1.2;
        }
        
        return `
            <defs>
                <style>
                    @font-face {
                        font-family: 'CustomGraffiti';
                        src: url(data:font/truetype;charset=utf-8;base64,${customFontBase64}) format('truetype');
                    }
                </style>
                <filter id="graffiti-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    <feOffset dx="2" dy="2" />
                    <feMorphology operator="dilate" radius="1" />
                </filter>
            </defs>
            <text 
                x="${x}" 
                y="${y}" 
                font-size="${fontSize}px" 
                font-family="'CustomGraffiti'" 
                fill="white" 
                text-anchor="middle" 
                dominant-baseline="middle"
                filter="url(#graffiti-filter)">
                ${finalText.split('\n').map((line, i) => 
                    `<tspan x="${x}" dy="${i === 0 ? -fontSize/2 : fontSize}">${line}</tspan>`
                ).join('')}
            </text>
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