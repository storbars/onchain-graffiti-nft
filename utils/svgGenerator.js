class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const layers = [];
        const numLayers = 5 + (complexity % 8);
        
        for (let layer = 0; layer < numLayers; layer++) {
            const points = [];
            const amplitude = 30 + (complexity % 50) + (layer * 20);
            const frequency = 0.002 + (layer * 0.001) + (complexity % 10) * 0.0005;
            const verticalOffset = 300 + (layer * 100);
            
            // Generate points with varied density
            for (let x = 0; x < 1000; x += 5) {
                const noise = Math.sin(x * 0.1) * 20;
                const y = verticalOffset + 
                          Math.sin(x * frequency) * amplitude +
                          Math.cos(x * frequency * 2) * (amplitude / 2) +
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

        // Add noise pattern
        const noisePoints = [];
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            noisePoints.push(`
                <circle 
                    cx="${x}" 
                    cy="${y}" 
                    r="${Math.random() * 2}"
                    fill="hsl(${hue}, 70%, 80%)"
                    opacity="0.3"
                />
            `);
        }
        
        return `
            <g class="background">
                ${layers.join('')}
                ${noisePoints.join('')}
            </g>
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
                <rect width="1000" height="1000" fill="#f5f5f5" />
                ${background}
                ${graffitiText}
            </svg>
        `;
    }
}

module.exports = SVGGenerator;