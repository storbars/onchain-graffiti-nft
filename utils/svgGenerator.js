const WaveLines = require('./backgroundStyles/wave-lines');

class SVGGenerator {
    static generateTextGradient(style) {
        const colors = [
            { name: 'Red', hex: '#ff3333' },
            { name: 'Green', hex: '#33FF33' },
            { name: 'Blue', hex: '#3333FF' },
            { name: 'Yellow', hex: '#FFFF33' },
            { name: 'Magenta', hex: '#FF33FF' }
        ];

        const colorScheme = colors[style % colors.length];
        return {
            name: colorScheme.name,
            mainColor: colorScheme.hex,
            darkColor: this.shadeColor(colorScheme.hex, -50),
            lightColor: this.shadeColor(colorScheme.hex, 30),
            outlineColor: '#000000'
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

        // Generate background with metadata
        const background = WaveLines.generate(hue, complexity);
        const textColors = this.generateTextGradient(style);

        // Read the Urban.ttf file and convert to base64
        const fs = require('fs');
        const path = require('path');
        const fontPath = path.join(__dirname, '..', 'Urban.ttf');
        const fontBuffer = fs.readFileSync(fontPath);
        const fontBase64 = fontBuffer.toString('base64');

        // Generate SVG
        const svg = `<?xml version="1.0" encoding="UTF-8"?>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <defs>
                    <style>
                        @font-face {
                            font-family: 'Urban';
                            src: url(data:font/truetype;charset=utf-8;base64,${fontBase64}) format('truetype');
                        }
                    </style>
                </defs>
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background.svg}
                
                <!-- Shadow layer -->
                <text 
                    x="${x + 4}" 
                    y="${y + 4}" 
                    font-size="${fontSize}" 
                    font-family="Urban" 
                    fill="${textColors.darkColor}" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
                
                <!-- Outline layer -->
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    font-family="Urban" 
                    fill="none"
                    stroke="${textColors.outlineColor}"
                    stroke-width="2"
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
                
                <!-- Main color layer -->
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
                
                <!-- Highlight layer -->
                <text 
                    x="${x - 2}" 
                    y="${y - 2}" 
                    font-size="${fontSize}" 
                    font-family="Urban" 
                    fill="${textColors.lightColor}" 
                    text-anchor="middle" 
                    dominant-baseline="middle"
                    opacity="0.3">
                    ${text}
                </text>
            </svg>`;

        // Return both SVG and metadata
        return {
            svg: svg,
            metadata: {
                name: `GenStreetArt #${Math.floor(Math.random() * 420) + 1}`,
                description: "GenStreetArt is a collection of 420 unique generative art pieces combining graffiti text and dynamic backgrounds",
                attributes: [
                    {
                        "trait_type": "Background Style",
                        "value": background.attributes.style
                    },
                    {
                        "trait_type": "Wave Complexity",
                        "value": background.attributes.complexity
                    },
                    {
                        "trait_type": "Wave Density",
                        "value": background.attributes.density
                    },
                    {
                        "trait_type": "Color Scheme",
                        "value": textColors.name
                    },
                    {
                        "trait_type": "Text Content",
                        "value": text
                    },
                    {
                        "trait_type": "Text Style",
                        "value": "Embossed"
                    }
                ]
            }
        };
    }
}

module.exports = SVGGenerator;