class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const layers = [];
        // Increase number of layers significantly
        const numLayers = 50; // Increased from 5 to 50
        
        for (let layer = 0; layer < numLayers; layer++) {
            const points = [];
            // Vary the amplitude and frequency more for each layer
            const amplitude = 15 + (Math.random() * 40) + (layer * 5);
            const frequency = 0.001 + (Math.random() * 0.003);
            const verticalOffset = 200 + (Math.random() * 600); // Spread across canvas
            const phaseShift = Math.random() * Math.PI * 2;
            
            for (let x = 0; x < 1000; x += 5) {
                const y = verticalOffset + 
                    Math.sin(x * frequency + phaseShift) * amplitude +
                    Math.sin(x * frequency * 2 + phaseShift) * (amplitude * 0.5) +
                    Math.sin(x * frequency * 0.5 + phaseShift) * (amplitude * 0.3);
                points.push(`${x},${y}`);
            }
            
            // Calculate colors with more variation
            const layerHue = (hue + (layer * 7)) % 360; // Smaller increment for more color variety
            const opacity = 0.3 - (layer * 0.004); // Reduced opacity per layer
            const strokeWidth = 1 + (Math.random() * 2); // Thinner lines
            
            layers.push(`<path 
                d="M ${points.join(' L ')}" 
                stroke="hsl(${layerHue}, 70%, 60%)" 
                stroke-width="${strokeWidth}" 
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