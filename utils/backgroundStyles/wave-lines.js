class WaveLines {
    static generate(hue, complexity) {
        const layers = [];
        const numLayers = 50;
        
        for (let layer = 0; layer < numLayers; layer++) {
            const points = [];
            const amplitude = 15 + (Math.random() * 40) + (layer * 5);
            const frequency = 0.001 + (Math.random() * 0.003);
            const verticalOffset = 200 + (Math.random() * 600);
            const phaseShift = Math.random() * Math.PI * 2;
            
            for (let x = 0; x < 1000; x += 5) {
                const y = verticalOffset + 
                    Math.sin(x * frequency + phaseShift) * amplitude +
                    Math.sin(x * frequency * 2 + phaseShift) * (amplitude * 0.5) +
                    Math.sin(x * frequency * 0.5 + phaseShift) * (amplitude * 0.3);
                points.push(`${x},${y}`);
            }
            
            const layerHue = (hue + (layer * 7)) % 360;
            const opacity = 0.3 - (layer * 0.004);
            const strokeWidth = 1 + (Math.random() * 2);
            
            layers.push(`<path 
                d="M ${points.join(' L ')}" 
                stroke="hsl(${layerHue}, 70%, 60%)" 
                stroke-width="${strokeWidth}" 
                stroke-opacity="${opacity}" 
                fill="none" />`);
        }
        
        return {
            svg: layers.join(''),
            attributes: {
                style: "Wave Lines",
                complexity: complexity > 70 ? "High" : complexity > 40 ? "Medium" : "Low",
                density: numLayers + " lines"
            }
        };
    }
}

module.exports = WaveLines;