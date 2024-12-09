class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const layers = [];
        const numLayers = 5 + (complexity % 8);
        const seed = Math.random() * 1000;
        
        for (let layer = 0; layer < numLayers; layer++) {
            const points = [];
            const baseAmplitude = 30 + (complexity % 50) + (layer * 20);
            const baseFrequency = 0.002 + (layer * 0.001) + (complexity % 10) * 0.0005;
            const verticalOffset = 300 + (layer * 100) + (Math.random() * 200 - 100);

            for (let x = 0; x < 1000; x += 5) {
                const noise = Math.sin(x * 0.1) * 20;
                const y = verticalOffset + 
                          Math.sin(x * baseFrequency + seed) * baseAmplitude +
                          noise;
                points.push(`${x},${y}`);
            }
            
            const layerHue = (hue + (layer * 30)) % 360;
            const opacity = 0.6 - (layer * 0.1);
            
            layers.push(`
                <path 
                    d="M ${points.join(' L ')}" 
                    stroke="hsl(${layerHue}, 70%, 60%)" 
                    stroke-width="${3 + (layer * 2)}"
                    stroke-opacity="${opacity}"
                    fill="none"
                />
            `);
        }
        
        return `
            <g class="background">
                ${layers.join('')}
            </g>
        `;
    }
    
    static generateGraffitiText(text, style) {
        const maxWidth = 800;
        const x = 500;
        const y = 500;
        
        // Your base64 font will be here
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

        const textLength = fontSize * text.length * 0.6;

        // Create gradient for text
        const gradientId = `textGradient${Math.random().toString(36).substr(2, 9)}`;
        
        return `
            <defs>
                <style>
                    @font-face {
                        font-family: 'CustomGraffiti';
                        src: url(data:font/truetype;charset=utf-8;base64,${customFontBase64}) format('truetype');
                    }
                </style>
                <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(255,50,50);stop-opacity:1" />
                    <stop offset="50%" style="stop-color:rgb(255,255,50);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(50,255,255);stop-opacity:1" />
                </linearGradient>
            </defs>
            <text 
                x="${x}" 
                y="${y}" 
                font-size="${fontSize}px" 
                font-family="'CustomGraffiti'" 
                textLength="${textLength}"
                lengthAdjust="spacing"
                fill="url(#${gradientId})" 
                text-anchor="middle" 
                dominant-baseline="middle">
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
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background}
                ${graffitiText}
            </svg>
        `;
    }
}

module.exports = SVGGenerator;