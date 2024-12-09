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
        const gradients = [
            // Gold gradient
            {
                id: 'goldGradient',
                stops: [
                    { offset: '0%', color: '#ffd700', opacity: '1' },
                    { offset: '50%', color: '#ffcc00', opacity: '1' },
                    { offset: '100%', color: '#ffd700', opacity: '1' }
                ],
                extraFilter: `
                    <filter id="goldEffect">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                        <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" 
                                           specularExponent="20" lighting-color="#ffd700" result="spec">
                            <fePointLight x="-5000" y="-10000" z="20000"/>
                        </feSpecularLighting>
                        <feComposite in="SourceGraphic" in2="spec" operator="arithmetic" 
                                    k1="0" k2="1" k3="1" k4="0"/>
                    </filter>
                `
            },
            // Rainbow gradient
            {
                id: 'rainbowGradient',
                stops: [
                    { offset: '0%', color: '#ff0000', opacity: '1' },
                    { offset: '16%', color: '#ff8000', opacity: '1' },
                    { offset: '32%', color: '#ffff00', opacity: '1' },
                    { offset: '48%', color: '#00ff00', opacity: '1' },
                    { offset: '64%', color: '#0000ff', opacity: '1' },
                    { offset: '80%', color: '#4b0082', opacity: '1' },
                    { offset: '100%', color: '#8f00ff', opacity: '1' }
                ]
            },
            // Chrome gradient
            {
                id: 'chromeGradient',
                stops: [
                    { offset: '0%', color: '#ffffff', opacity: '1' },
                    { offset: '50%', color: '#808080', opacity: '1' },
                    { offset: '100%', color: '#ffffff', opacity: '1' }
                ]
            }
        ];

        const gradientIndex = style % gradients.length;
        return gradients[gradientIndex];
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
        const gradient = this.generateTextGradient(style);

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
                    <linearGradient id="${gradient.id}" x1="0%" y1="0%" x2="100%" y2="0%">
                        ${gradient.stops.map(stop => 
                            `<stop offset="${stop.offset}" stop-color="${stop.color}" stop-opacity="${stop.opacity}"/>`
                        ).join('')}
                    </linearGradient>
                    ${gradient.extraFilter || ''}
                </defs>
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background}
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}" 
                    font-family="Urban" 
                    fill="url(#${gradient.id})" 
                    ${gradient.id === 'goldGradient' ? 'filter="url(#goldEffect)"' : ''}
                    text-anchor="middle" 
                    dominant-baseline="middle">
                    ${text}
                </text>
            </svg>`;
    }
}

module.exports = SVGGenerator;