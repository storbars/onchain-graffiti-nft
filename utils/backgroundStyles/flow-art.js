class FlowArt {
    static generateFlowField(width, height, scale, seed) {
        const field = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const angle = Math.sin(x * scale + seed) * Math.cos(y * scale + seed) * Math.PI * 2;
                row.push(angle);
            }
            field.push(row);
        }
        return field;
    }

    static generate(hue, complexity) {
        const paths = [];
        const numPaths = 50 + Math.floor(complexity * 0.5);
        const gridSize = 20;
        const scale = 0.05;
        const seed = Math.random() * 1000;
        
        // Generate flow field
        const flowField = this.generateFlowField(gridSize, gridSize, scale, seed);
        
        // Create paths following the flow field
        for (let i = 0; i < numPaths; i++) {
            const points = [];
            let x = Math.random() * 1000;
            let y = Math.random() * 1000;
            const pathLength = 100 + Math.floor(Math.random() * 100);
            const pathWidth = 2 + Math.random() * 4;
            
            // Follow flow field
            for (let j = 0; j < pathLength; j++) {
                points.push([x, y]);
                
                // Get grid position
                const gridX = Math.floor((x / 1000) * gridSize);
                const gridY = Math.floor((y / 1000) * gridSize);
                
                // Get angle from flow field
                const angle = flowField[gridY][gridX];
                
                // Move in direction of angle
                x += Math.cos(angle) * 5;
                y += Math.sin(angle) * 5;
                
                // Wrap around edges
                x = (x + 1000) % 1000;
                y = (y + 1000) % 1000;
            }
            
            // Create path with color variation
            const pathHue = (hue + i * 2) % 360;
            const opacity = 0.3 + Math.random() * 0.4;
            
            if (points.length > 1) {
                paths.push(`
                    <path 
                        d="M ${points.map(p => p.join(',')).join(' L ')}"
                        stroke="hsl(${pathHue}, 70%, 60%)"
                        stroke-width="${pathWidth}"
                        stroke-opacity="${opacity}"
                        fill="none"
                        stroke-linecap="round"
                    />
                `);
            }
        }

        return {
            svg: paths.join('\n'),
            attributes: {
                style: "Flow Art",
                complexity: complexity > 70 ? "High" : complexity > 40 ? "Medium" : "Low",
                density: numPaths + " paths"
            }
        };
    }
}

module.exports = FlowArt;