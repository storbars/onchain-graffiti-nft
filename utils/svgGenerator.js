class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const layers = [];
        for (let layer = 0; layer < 5; layer++) {
            const points = [];
            const amplitude = 30 + (complexity % 50) + (layer * 20);
            const frequency = 0.002 + (layer * 0.001);
            const verticalOffset = Math.random() * 200 + 400;
            const phaseShift = Math.random() * Math.PI * 2;
            
            for (let x = 0; x < 1000; x += 5) {
                const y = verticalOffset + 
                    Math.sin(x * frequency + phaseShift) * amplitude +
                    Math.sin(x * frequency * 2 + phaseShift) * (amplitude * 0.5);
                points.push(`${x},${y}`);
            }
            
            const layerHue = (hue + (layer * 30)) % 360;
            const opacity = (0.6 - (layer * 0.08));
            
            layers.push(`<path 
                d="M ${points.join(' L ')}" 
                stroke="hsl(${layerHue}, 70%, 60%)" 
                stroke-width="${3 + layer}" 
                stroke-opacity="${opacity}" 
                fill="none" />`);
        }
        return layers.join('');
    }

    static generateFullSVG(text, style, hue, complexity) {
        const x = 500;
        const y = 500;
        const maxWidth = 900; // Maximum width for text

        // Calculate font size based on text length
        const baseFontSize = 120;
        let fontSize = baseFontSize;
        
        // Estimate text width (approximate)
        const getTextWidth = (text, size) => text.length * size * 0.6;
        
        // Reduce font size until text fits
        while (getTextWidth(text, fontSize) > maxWidth && fontSize > 20) {
            fontSize *= 0.9;
        }

        const colors = [
            '#ff3333',  // Red
            '#33FF33',  // Green
            '#3333FF',  // Blue
            '#FFFF33',  // Yellow
            '#FF33FF'   // Magenta
        ];
        const textColor = colors[style % colors.length];
        const background = this.generateSquiggleBackground(hue, complexity);

        return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background}
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    font-family="Arial Black" 
                    fill="${textColor}" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>`;
    }
}

module.exports = SVGGenerator;