class StreetLines {
    static generateBlockPath(x, y, width, height, angle, curved = false) {
        if (!curved) {
            // Straight blocks
            const rad = angle * Math.PI / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            
            const points = [
                [x, y],
                [x + width * cos, y + width * sin],
                [x + width * cos - height * sin, y + width * sin + height * cos],
                [x - height * sin, y + height * cos]
            ];
            
            points.forEach(p => {
                p[0] = Math.max(0, Math.min(1000, p[0]));
                p[1] = Math.max(0, Math.min(1000, p[1]));
            });
            
            return `M ${points.map(p => p.join(',')).join(' L ')} Z`;
        } else {
            // Curved blocks
            const controlPoint1X = x + width * 0.5;
            const controlPoint1Y = y - height;
            const controlPoint2X = x + width * 0.5;
            const controlPoint2Y = y + height;
            const endX = x + width;
            const endY = y;
            
            return `M ${x},${y} C ${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${endX},${endY}`;
        }
    }

    static generate(hue, complexity) {
        // Choose a style variation
        const styleVariation = Math.floor(Math.random() * 4); // 0-3 for different styles
        const bgColor = this.getBackgroundColor(styleVariation);
        
        const blocks = [];
        const numBlocks = 30 + Math.floor(complexity * 0.4);
        
        // Style-specific parameters
        const params = this.getStyleParams(styleVariation);
        
        // Generate color palette based on style
        const colors = this.generateColorPalette(hue, styleVariation);

        // Grid for overlap prevention
        const grid = Array(50).fill().map(() => Array(50).fill(false));

        for (let i = 0; i < numBlocks; i++) {
            let attempts = 0;
            let placed = false;
            
            while (!attempts < 50 && !placed) {
                const x = Math.random() * 900;
                const y = Math.random() * 900;
                const width = params.minWidth + Math.random() * params.widthVar;
                const height = params.minHeight + Math.random() * params.heightVar;
                const angle = params.baseAngle + (Math.random() * params.angleVar - params.angleVar/2);
                
                const gridX = Math.floor(x / 20);
                const gridY = Math.floor(y / 20);
                
                if (this.checkGridSpace(grid, gridX, gridY, 2)) {
                    this.markGridSpace(grid, gridX, gridY, 2);
                    
                    const mainColor = colors[i % colors.length];
                    blocks.push(`
                        <path 
                            d="${this.generateBlockPath(x, y, width, height, angle, params.curved)}" 
                            fill="${mainColor}" 
                            opacity="${0.7 + Math.random() * 0.3}"
                            stroke="${params.stroke ? mainColor : 'none'}"
                            stroke-width="${params.stroke ? 1 : 0}"
                        />
                    `);

                    // Add decorative elements based on style
                    if (Math.random() < params.accentProb) {
                        const accentWidth = width * 0.15;
                        const rad = angle * Math.PI / 180;
                        const accentX = x + width * 0.85 * Math.cos(rad);
                        const accentY = y + width * 0.85 * Math.sin(rad);
                        const accentColor = colors[(i + 1) % colors.length];
                        
                        blocks.push(`
                            <path 
                                d="${this.generateBlockPath(accentX, accentY, accentWidth, height, angle, params.curved)}" 
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
            svg: `<rect width="1000" height="1000" fill="${bgColor}" />${blocks.join('\n')}`,
            attributes: {
                style: "Street Lines",
                variation: this.getStyleName(styleVariation),
                complexity: complexity > 70 ? "High" : complexity > 40 ? "Medium" : "Low",
                density: numBlocks + " blocks"
            }
        };
    }

    static getStyleParams(variation) {
        const styles = [
            { // Straight modern
                baseAngle: 45,
                angleVar: 20,
                minWidth: 50,
                widthVar: 200,
                minHeight: 20,
                heightVar: 30,
                curved: false,
                stroke: false,
                accentProb: 0.5
            },
            { // Curved flowing
                baseAngle: 0,
                angleVar: 360,
                minWidth: 100,
                widthVar: 300,
                minHeight: 10,
                heightVar: 20,
                curved: true,
                stroke: true,
                accentProb: 0.3
            },
            { // Dense geometric
                baseAngle: 90,
                angleVar: 90,
                minWidth: 20,
                widthVar: 100,
                minHeight: 10,
                heightVar: 15,
                curved: false,
                stroke: true,
                accentProb: 0.7
            },
            { // Spiral blocks
                baseAngle: 0,
                angleVar: 360,
                minWidth: 80,
                widthVar: 250,
                minHeight: 15,
                heightVar: 25,
                curved: false,
                stroke: false,
                accentProb: 0.4
            }
        ];
        return styles[variation];
    }

    static getBackgroundColor(variation) {
        const backgrounds = [
            '#1a1a1a',    // Dark
            '#f5f5f5',    // Light
            '#2a4434',    // Forest green
            '#1a237e'     // Deep blue
        ];
        return backgrounds[variation];
    }

    static getStyleName(variation) {
        const names = [
            'Modern Straight',
            'Flowing Curves',
            'Dense Geometric',
            'Spiral Blocks'
        ];
        return names[variation];
    }

    static generateColorPalette(baseHue, variation) {
        switch(variation) {
            case 0: // Modern - vibrant colors
                return [
                    `hsl(${baseHue}, 70%, 60%)`,
                    `hsl(${(baseHue + 30) % 360}, 70%, 60%)`,
                    `hsl(${(baseHue + 60) % 360}, 70%, 40%)`,
                    `hsl(${(baseHue + 90) % 360}, 50%, 70%)`,
                ];
            case 1: // Flowing - pastel colors
                return [
                    `hsl(${baseHue}, 50%, 80%)`,
                    `hsl(${(baseHue + 40) % 360}, 40%, 75%)`,
                    `hsl(${(baseHue + 80) % 360}, 45%, 85%)`,
                ];
            case 2: // Dense - monochromatic
                return [
                    `hsl(${baseHue}, 60%, 40%)`,
                    `hsl(${baseHue}, 50%, 60%)`,
                    `hsl(${baseHue}, 40%, 80%)`,
                ];
            case 3: // Spiral - contrasting colors
                return [
                    `hsl(${baseHue}, 80%, 50%)`,
                    `hsl(${(baseHue + 180) % 360}, 70%, 60%)`,
                    `hsl(${(baseHue + 90) % 360}, 60%, 70%)`,
                ];
        }
    }

    static checkGridSpace(grid, x, y, size) {
        for(let i = -size; i <= size; i++) {
            for(let j = -size; j <= size; j++) {
                if(x + i >= 0 && x + i < grid.length && 
                   y + j >= 0 && y + j < grid[0].length && 
                   grid[x + i][y + j]) {
                    return false;
                }
            }
        }
        return true;
    }

    static markGridSpace(grid, x, y, size) {
        for(let i = -size; i <= size; i++) {
            for(let j = -size; j <= size; j++) {
                if(x + i >= 0 && x + i < grid.length && 
                   y + j >= 0 && y + j < grid[0].length) {
                    grid[x + i][y + j] = true;
                }
            }
        }
    }
}

module.exports = StreetLines;