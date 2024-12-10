class StreetLines {
    static generateBlockPath(x, y, width, height, angle) {
        const rad = angle * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        
        // Calculate points for clipping against canvas bounds
        let points = [
            [x, y],
            [x + width * cos, y + width * sin],
            [x + width * cos - height * sin, y + width * sin + height * cos],
            [x - height * sin, y + height * cos]
        ];
        
        // Clip points to canvas bounds
        points = points.map(p => [
            Math.max(0, Math.min(1000, p[0])),
            Math.max(0, Math.min(1000, p[1]))
        ]);
        
        return `M ${points.map(p => p.join(',')).join(' L ')} Z`;
    }

    static generate(hue, complexity) {
        const blocks = [];
        const numBlocks = 20 + Math.floor(complexity * 0.3);
        const baseAngle = 45; // Fixed 45-degree angle for consistent direction
        
        // Define grid for overlap prevention
        const grid = [];
        const gridSize = 50;
        for(let i = 0; i < gridSize; i++) {
            grid[i] = [];
            for(let j = 0; j < gridSize; j++) {
                grid[i][j] = false;
            }
        }

        // Color palette for natural look
        const colors = [
            `hsl(${hue}, 70%, 60%)`,
            `hsl(${(hue + 30) % 360}, 70%, 60%)`,
            `hsl(${(hue + 60) % 360}, 70%, 40%)`,
            `hsl(${(hue + 90) % 360}, 50%, 70%)`,
            `hsl(${(hue + 120) % 360}, 60%, 50%)`
        ];

        // Create blocks in a more organized pattern
        for (let i = 0; i < numBlocks; i++) {
            let attempts = 0;
            let placed = false;
            
            while (!placed && attempts < 50) {
                const x = Math.random() * 800;
                const y = Math.random() * 800;
                const width = 50 + Math.random() * 200;
                const height = 20 + Math.random() * 30;
                const angle = baseAngle + (Math.random() * 20 - 10);
                
                // Check grid cells for overlap
                const gridX = Math.floor(x / (1000 / gridSize));
                const gridY = Math.floor(y / (1000 / gridSize));
                const cells = 2;
                
                let canPlace = true;
                for(let dx = -cells; dx <= cells; dx++) {
                    for(let dy = -cells; dy <= cells; dy++) {
                        const checkX = gridX + dx;
                        const checkY = gridY + dy;
                        if(checkX >= 0 && checkX < gridSize && 
                           checkY >= 0 && checkY < gridSize && 
                           grid[checkX][checkY]) {
                            canPlace = false;
                            break;
                        }
                    }
                }
                
                if(canPlace) {
                    // Mark grid cells as occupied
                    for(let dx = -cells; dx <= cells; dx++) {
                        for(let dy = -cells; dy <= cells; dy++) {
                            const markX = gridX + dx;
                            const markY = gridY + dy;
                            if(markX >= 0 && markX < gridSize && 
                               markY >= 0 && markY < gridSize) {
                                grid[markX][markY] = true;
                            }
                        }
                    }

                    const mainColor = colors[i % colors.length];
                    blocks.push(`
                        <path 
                            d="${this.generateBlockPath(x, y, width, height, angle)}" 
                            fill="${mainColor}" 
                            opacity="${0.7 + Math.random() * 0.3}"
                        />
                    `);

                    // Add small accent block at the end
                    if (Math.random() > 0.5) {
                        const accentWidth = width * 0.15;
                        const rad = angle * Math.PI / 180;
                        const accentX = x + width * 0.85 * Math.cos(rad);
                        const accentY = y + width * 0.85 * Math.sin(rad);
                        const accentColor = colors[(i + 1) % colors.length];
                        
                        blocks.push(`
                            <path 
                                d="${this.generateBlockPath(accentX, accentY, accentWidth, height, angle)}" 
                                fill="${accentColor}" 
                                opacity="0.9"
                            />
                        `);
                    }
                    
                    placed = true;
                }
                
                attempts++;
            }
        }

        return {
            svg: blocks.join('\n'),
            attributes: {
                style: "Street Lines",
                complexity: complexity > 70 ? "High" : complexity > 40 ? "Medium" : "Low",
                density: numBlocks + " blocks",
                technique: "Geometric Blocks"
            }
        };
    }
}

module.exports = StreetLines;