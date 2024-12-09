class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
        const layers = [];
        const numLayers = 5 + (complexity % 8);
        const seed = Math.random() * 1000;
        
        for (let layer = 0; layer < numLayers; layer++) {
            const points = [];
            const baseAmplitude = 30 + (complexity % 50) + (layer * 20);
            const baseFrequency = 0.002 + (layer * 0.001) + (complexity % 10) * 0.0005;
            const verticalOffset = 300 + (layer * 100) + (Math.random() * 200 - 100);

            for (let x = 0; x < 1000; x += 5) {
                const noise = Math.sin(x * 0.1) * 20;
                const y = verticalOffset + 
                          Math.sin(x * baseFrequency + seed) * baseAmplitude +
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
        
        return layers.join('');
    }

    static generateFullSVG(text, style, hue, complexity) {
        const fontSize = 120;
        const x = 500;
        const y = 500;

        // Your base64 font will be here
        const customFontBase64 = 'T1RUTwAKIAAAAAAAAB@RQZGINE...'; // Replace with your actual base64 font data

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
                <defs>
                    <style>
                        @font-face {
                            font-family: 'CustomGraffiti';
                            src: url(data:font/truetype;charset=utf-8;base64,${customFontBase64}) format('truetype');
                        }
                    </style>
                </defs>
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background}
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    font-family="'CustomGraffiti'" 
                    fill="${textColor}" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>`;
    }
}

module.exports = SVGGenerator;