class StreetLines {
    static generateBlockPath(x, y, width, height, angle) {
        const rad = angle * Math.PI / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        
        // Calculate rotated corners
        const points = [
            [x, y],
            [x + width * cos, y + width * sin],
            [x + width * cos - height * sin, y + width * sin + height * cos],
            [x - height * sin, y + height * cos]
        ];
        
        return `M ${points.map(p => p.join(',')).join(' L ')} Z`;
    }

    static generate(hue, complexity) {
        const blocks = [];
        const numBlocks = 20 + Math.floor(complexity * 0.3);
        const baseAngle = Math.random() * 360;
        
        // Color palette
        const colors = [
            `hsl(${hue}, 70%, 60%)`,
            `hsl(${(hue + 30) % 360}, 70%, 60%)`,
            `hsl(${(hue + 60) % 360}, 70%, 40%)`,
            `hsl(${(hue + 90) % 360}, 50%, 70%)`,
            `hsl(${(hue + 120) % 360}, 60%, 50%)`
        ];

        for (let i = 0; i < numBlocks; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            const width = 100 + Math.random() * 400;
            const height = 20 + Math.random() * 40;
            const angle = baseAngle + (Math.random() * 30 - 15);
            
            // Add small decorative blocks
            const mainColor = colors[i % colors.length];
            blocks.push(`
                <path 
                    d="${this.generateBlockPath(x, y, width, height, angle)}" 
                    fill="${mainColor}" 
                    opacity="${0.6 + Math.random() * 0.4}"
                />
            `);

            // Add small accent blocks
            if (Math.random() > 0.5) {
                const accentWidth = width * 0.2;
                const accentColor = colors[(i + 1) % colors.length];
                blocks.push(`
                    <path 
                        d="${this.generateBlockPath(x + width * 0.8 * cos(angle), y, accentWidth, height, angle)}" 
                        fill="${accentColor}" 
                        opacity="0.8"
                    />
                `);
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

    static cos(angle) {
        return Math.cos(angle * Math.PI / 180);
    }

    static sin(angle) {
        return Math.sin(angle * Math.PI / 180);
    }
}

module.exports = StreetLines;