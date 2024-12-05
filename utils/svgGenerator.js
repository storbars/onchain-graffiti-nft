class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const layers = [];
        const numLayers = 5 + (complexity % 8);
        const seed = Math.random() * 1000; // Random seed for variation
        
        for (let layer = 0; layer < numLayers; layer++) {
            const points = [];
            const baseAmplitude = 30 + (complexity % 50) + (layer * 20);
            const baseFrequency = 0.002 + (layer * 0.001) + (complexity % 10) * 0.0005;
            const verticalOffset = 300 + (layer * 100) + (Math.random() * 200 - 100);
            
            // Multiple wave components for each layer
            const waveComponents = [
                { freq: baseFrequency, amp: baseAmplitude, phase: Math.random() * Math.PI * 2 },
                { freq: baseFrequency * 2, amp: baseAmplitude * 0.5, phase: Math.random() * Math.PI * 2 },
                { freq: baseFrequency * 4, amp: baseAmplitude * 0.25, phase: Math.random() * Math.PI * 2 }
            ];
            
            // Generate points with varied wave patterns
            let stepSize = 3 + Math.random() * 4;
            for (let x = 0; x < 1000; x += stepSize) {
                let y = verticalOffset;
                
                // Combine multiple wave components
                waveComponents.forEach(wave => {
                    y += Math.sin((x + seed) * wave.freq + wave.phase) * wave.amp;
                });
                
                // Add noise
                y += (Math.random() - 0.5) * 20;
                
                points.push(`${x},${y}`);
            }
            
            // Randomize color variations
            const layerHue = (hue + (layer * 30) + Math.random() * 20 - 10) % 360;
            const saturation = 60 + Math.random() * 20;
            const lightness = 50 + Math.random() * 20;
            const opacity = 0.4 - (layer * 0.05) + (Math.random() * 0.2);
            const strokeWidth = 2 + (layer * 1.5) + (Math.random() * 2);
            
            // Add path with random curve tension
            const pathData = `M ${points.join(' L ')}` + 
                           (Math.random() > 0.5 ? ` L 1000,1000 L 0,1000 Z` : '');
            
            layers.push(`
                <path 
                    d="${pathData}" 
                    stroke="hsl(${layerHue}, ${saturation}%, ${lightness}%)" 
                    stroke-width="${strokeWidth}"
                    stroke-opacity="${opacity}"
                    fill="${Math.random() > 0.8 ? `hsl(${layerHue}, ${saturation}%, ${lightness}%)` : 'none'}"
                    fill-opacity="0.1"
                />
            `);
        }

        // Add varied noise patterns
        const noiseElements = [];
        const noiseTypes = ['circle', 'line', 'dot'];
        
        for (let i = 0; i < 300; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            const type = noiseTypes[Math.floor(Math.random() * noiseTypes.length)];
            const noiseHue = (hue + Math.random() * 60 - 30) % 360;
            
            switch(type) {
                case 'circle':
                    noiseElements.push(`
                        <circle 
                            cx="${x}" 
                            cy="${y}" 
                            r="${Math.random() * 3}"
                            fill="hsl(${noiseHue}, 70%, 80%)"
                            opacity="${0.1 + Math.random() * 0.3}"
                        />
                    `);
                    break;
                case 'line':
                    const length = Math.random() * 20;
                    const angle = Math.random() * Math.PI * 2;
                    noiseElements.push(`
                        <line 
                            x1="${x}" 
                            y1="${y}"
                            x2="${x + Math.cos(angle) * length}"
                            y2="${y + Math.sin(angle) * length}"
                            stroke="hsl(${noiseHue}, 70%, 80%)"
                            stroke-width="${Math.random()}"
                            opacity="${0.1 + Math.random() * 0.3}"
                        />
                    `);
                    break;
                case 'dot':
                    noiseElements.push(`
                        <circle 
                            cx="${x}" 
                            cy="${y}" 
                            r="1"
                            fill="hsl(${noiseHue}, 70%, 80%)"
                            opacity="${0.1 + Math.random() * 0.3}"
                        />
                    `);
                    break;
            }
        }
        
        return `
            <g class="background">
                ${layers.join('')}
                ${noiseElements.join('')}
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