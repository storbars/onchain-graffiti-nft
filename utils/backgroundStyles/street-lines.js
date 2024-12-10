class StreetLines {
    static createNoiseGrid(width, height, scale) {
        const grid = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                // Simplified 2D noise function
                const value = Math.sin(x * scale) * Math.cos(y * scale) * Math.PI * 2;
                row.push(value);
            }
            grid.push(row);
        }
        return grid;
    }

    static generate(hue, complexity) {
        const width = 100;
        const height = 100;
        const scale = 0.05;
        const numLines = 30 + Math.floor(complexity * 0.5);
        const noiseGrid = this.createNoiseGrid(width, height, scale);
        
        const paths = [];
        const lineLength = 200;
        
        for (let i = 0; i < numLines; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            const points = [];
            const lineHue = (hue + (i * 30)) % 360;
            
            for (let step = 0; step < lineLength; step++) {
                // Scale coordinates to SVG space
                const svgX = (x / width) * 1000;
                const svgY = (y / height) * 1000;
                points.push(`${svgX},${svgY}`);

                // Get flow direction from noise grid
                const gridX = Math.floor(x);
                const gridY = Math.floor(y);
                if (gridX >= 0 && gridX < width && gridY >= 0 && gridY < height) {
                    const angle = noiseGrid[gridY][gridX];
                    // Move in direction of flow
                    x += Math.cos(angle) * 2;
                    y += Math.sin(angle) * 2;
                }

                // Wrap around edges
                x = (x + width) % width;
                y = (y + height) % height;
            }

            // Create SVG path with varying opacity and width
            const opacity = 0.3 + (Math.random() * 0.4);
            const strokeWidth = 1 + (Math.random() * 3);
            paths.push(`<path 
                d="M ${points.join(' L ')}" 
                stroke="hsl(${lineHue}, 70%, 60%)" 
                stroke-width="${strokeWidth}" 
                stroke-opacity="${opacity}" 
                fill="none" 
                stroke-linecap="round"
            />`);
        }

        return {
            svg: paths.join('\n'),
            attributes: {
                style: "Street Lines",
                complexity: complexity > 70 ? "High" : complexity > 40 ? "Medium" : "Low",
                density: numLines + " flows",
                technique: "Flow Field"
            }
        };
    }
}

module.exports = StreetLines;