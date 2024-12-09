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
            
            const waveComponents = [
                { freq: baseFrequency, amp: baseAmplitude, phase: Math.random() * Math.PI * 2 },
                { freq: baseFrequency * 2, amp: baseAmplitude * 0.5, phase: Math.random() * Math.PI * 2 },
                { freq: baseFrequency * 4, amp: baseAmplitude * 0.25, phase: Math.random() * Math.PI * 2 }
            ];
            
            let stepSize = 3 + Math.random() * 4;
            for (let x = 0; x < 1000; x += stepSize) {
                let y = verticalOffset;
                
                waveComponents.forEach(wave => {
                    y += Math.sin((x + seed) * wave.freq + wave.phase) * wave.amp;
                });
                
                y += (Math.random() - 0.5) * 20;
                
                points.push(`${x},${y}`);
            }
            
            const layerHue = (hue + (layer * 30) + Math.random() * 20 - 10) % 360;
            const saturation = 60 + Math.random() * 20;
            const lightness = 50 + Math.random() * 20;
            const opacity = 0.4 - (layer * 0.05) + (Math.random() * 0.2);
            const strokeWidth = 2 + (layer * 1.5) + (Math.random() * 2);
            
            const pathData = `M ${points.join(' L ')}` + 
                           (Math.random() > 0.5 ? ` L 1000,1000 L 0,1000 Z` : '');
            
            layers.push(`
                <path 
                    d="${pathData}" 
                    stroke="hsl(${layerHue}, ${saturation}%, ${lightness}%)" 
                    stroke-width="${strokeWidth}"
                    stroke-opacity="${opacity}"
                    fill="${Math.random() > 0.8 ? `hsl(${layerHue}, ${saturation}%, ${lightness}%)` : 'none'}"
                    fill-opacity="0.1"
                />
            `);
        }

        const noiseElements = [];
        const noiseTypes = ['circle', 'line', 'dot'];
        
        for (let i = 0; i < 300; i++) {
            const x = Math.random() * 1000;
            const y = Math.random() * 1000;
            const type = noiseTypes[Math.floor(Math.random() * noiseTypes.length)];
            const noiseHue = (hue + Math.random() * 60 - 30) % 360;
            
            switch(type) {
                case 'circle':
                    noiseElements.push(`
                        <circle 
                            cx="${x}" 
                            cy="${y}" 
                            r="${Math.random() * 3}"
                            fill="hsl(${noiseHue}, 70%, 80%)"
                            opacity="${0.1 + Math.random() * 0.3}"
                        />
                    `);
                    break;
                case 'line':
                    const length = Math.random() * 20;
                    const angle = Math.random() * Math.PI * 2;
                    noiseElements.push(`
                        <line 
                            x1="${x}" 
                            y1="${y}"
                            x2="${x + Math.cos(angle) * length}"
                            y2="${y + Math.sin(angle) * length}"
                            stroke="hsl(${noiseHue}, 70%, 80%)"
                            stroke-width="${Math.random()}"
                            opacity="${0.1 + Math.random() * 0.3}"
                        />
                    `);
                    break;
                case 'dot':
                    noiseElements.push(`
                        <circle 
                            cx="${x}" 
                            cy="${y}" 
                            r="1"
                            fill="hsl(${noiseHue}, 70%, 80%)"
                            opacity="${0.1 + Math.random() * 0.3}"
                        />
                    `);
                    break;
            }
        }
        
        return `
            <g class="background">
                ${layers.join('')}
                ${noiseElements.join('')}
            </g>
        `;
    }
    
    static generateGraffitiText(text, style) {
        const maxWidth = 800;
        const maxHeight = 400;
        const x = 500;
        const y = 500;
        
        // Your base64 font will be here
        const customFontBase64 = 'YOUR_BASE64_FONT_DATA_HERE';
        
        let fontSize = Math.min(
            900 / Math.sqrt(text.length),
            120 + (style * 10)
        );
        
        const getTextWidth = (text, fontSize) => {
            const averageCharWidth = fontSize * 0.6;
            return text.length * averageCharWidth;
        };
        
        while (getTextWidth(text, fontSize) > maxWidth) {
            fontSize *= 0.9;
        }
        
        const words = text.split(' ');
        let finalText = text;
        
        if (words.length > 2 && fontSize < 80) {
            const halfLength = Math.ceil(words.length / 2);
            const firstLine = words.slice(0, halfLength).join(' ');
            const secondLine = words.slice(halfLength).join(' ');
            finalText = `${firstLine}\n${secondLine}`;
            fontSize *= 1.2;
        }

        const textLength = fontSize * text.length * 0.6;

        // Create main gradient with random colors
        const gradientId = `textGradient_${Math.random().toString(36).substr(2, 9)}`;
        const gradientAngle = Math.random() * 360;
        
        // Generate random vibrant colors
        const color1 = `hsl(${Math.random() * 360}, 80%, 60%)`;
        const color2 = `hsl(${(Math.random() * 360 + 180) % 360}, 80%, 60%)`;
        
        return `
            <defs>
                <style>
                    @font-face {
                        font-family: 'CustomGraffiti';
                        src: url(data:font/truetype;charset=utf-8;base64,${customFontBase64}) format('truetype');
                    }
                </style>
                <linearGradient id="${gradientId}" gradientTransform="rotate(${gradientAngle}, 0.5, 0.5)">
                    <stop offset="0%" stop-color="${color1}" />
                    <stop offset="100%" stop-color="${color2}" />
                </linearGradient>
                <filter id="graffiti-outline">
                    <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
                    <feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
                    <feFlood flood-color="white" result="glowColor" />
                    <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow" />
                    <feMerge>
                        <feMergeNode in="softGlow"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <g>
                <!-- Shadow/Glow effect -->
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}px" 
                    font-family="'CustomGraffiti'" 
                    textLength="${textLength}"
                    lengthAdjust="spacing"
                    fill="rgba(0,0,0,0.3)" 
                    text-anchor="middle" 
                    dominant-baseline="middle"
                    transform="translate(3,3)">
                    ${finalText.split('\n').map((line, i) => 
                        `<tspan x="${x}" dy="${i === 0 ? -fontSize/2 : fontSize}">${line}</tspan>`
                    ).join('')}
                </text>
                <!-- Main text with gradient -->
                <text 
                    x="${x}" 
                    y="${y}" 
                    font-size="${fontSize}px" 
                    font-family="'CustomGraffiti'" 
                    textLength="${textLength}"
                    lengthAdjust="spacing"
                    fill="url(#${gradientId})" 
                    text-anchor="middle" 
                    dominant-baseline="middle"
                    filter="url(#graffiti-outline)">
                    ${finalText.split('\n').map((line, i) => 
                        `<tspan x="${x}" dy="${i === 0 ? -fontSize/2 : fontSize}">${line}</tspan>`
                    ).join('')}
                </text>
            </g>
        `;
    }
    
    static generateFullSVG(text, style, hue, complexity) {
        const background = this.generateSquiggleBackground(hue, complexity);
        const graffitiText = this.generateGraffitiText(text, style);
        
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <rect width="1000" height="1000" fill="#1a1a1a" />
                ${background}
                ${graffitiText}
            </svg>
        `;
    }
}

module.exports = SVGGenerator;