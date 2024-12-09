class SVGGenerator {
    static generateSquiggleBackground(hue, complexity) {
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
        return layers.join('');
    }

    static generateTextGradient(style) {
        const colors = [
            '#ff3333',  // Red
            '#33FF33',  // Green
            '#3333FF',  // Blue
            '#FFFF33',  // Yellow
            '#FF33FF'   // Magenta
        ];

        const color = colors[style % colors.length];
        return {
            id: `textGradient_${style}`,
            mainColor: color,
            darkColor: this.shadeColor(color, -30),
            lightColor: this.shadeColor(color, 30)
        };
    }

    static shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3), 16);
        let G = parseInt(color.substring(3,5), 16);
        let B = parseInt(color.substring(5,7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = Math.min(255, Math.max(0, R));
        G = Math.min(255, Math.max(0, G));
        B = Math.min(255, Math.max(0, B));

        return '#' + 
            (R < 16 ? '0' : '') + R.toString(16) +
            (G < 16 ? '0' : '') + G.toString(16) +
            (B < 16 ? '0' : '') + B.toString(16);
    }

    static generateFullSVG(text, style, hue, complexity) {
        const x = 500;
        const y = 500;
        const maxWidth = 900;

        const baseFontSize = 120;
        let fontSize = baseFontSize;
        
        const getTextWidth = (text, size) => text.length * size * 0.6;
        
        while (getTextWidth(text, fontSize) > maxWidth && fontSize > 20) {
            fontSize *= 0.9;
        }

        const background = this.generateSquiggleBackground(hue, complexity);
        const textColors = this.generateTextGradient(style);

        // Read the Urban.ttf file and convert to base64
        const fs = require('fs');
        const path = require('path');
        const fontPath = path.join(__dirname, '..', 'Urban.ttf');
        const fontBuffer = fs.readFileSync(fontPath);
        const fontBase64 = fontBuffer.toString('base64');

        return `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <defs>
                    <style>
                        @font-face {
                            font-family: 'Urban';
                            src: url(data:font/truetype;charset=utf-8;base64,${fontBase64}) format('truetype');
                        }
                    </style>
                    <filter id="textEffect" x="-50%" y="-50%" width="200%" height="200%">
                        <!-- Shadow -->
                        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.5"/>
                        
                        <!-- Emboss effect -->
                        <feSpecularLighting surfaceScale="5" specularConstant="1" specularExponent="20" lighting-color="#ffffff">
                            <fePointLight x="-5000" y="-10000" z="20000"/>
                        </feSpecularLighting>
                        <feComposite in2="SourceGraphic" operator="in" result="specular"/>
                        <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
                    </filter>
                </defs>
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background}
                <g filter="url(#textEffect)">
                    <!-- Outline/border -->
                    <text 
                        x="${x}" 
                        y="${y}" 
                        font-size="${fontSize}" 
                        font-family="Urban" 
                        fill="none"
                        stroke="${textColors.darkColor}"
                        stroke-width="3"
                        text-anchor="middle" 
                        dominant-baseline="middle">
                        ${text}
                    </text>
                    <!-- Main text -->
                    <text 
                        x="${x}" 
                        y="${y}" 
                        font-size="${fontSize}" 
                        font-family="Urban" 
                        fill="${textColors.mainColor}" 
                        text-anchor="middle" 
                        dominant-baseline="middle">
                        ${text}
                    </text>
                </g>
            </svg>`;
    }
}

module.exports = SVGGenerator;