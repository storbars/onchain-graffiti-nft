const WaveLines = require('./backgroundStyles/wave-lines');
const StreetLines = require('./backgroundStyles/street-lines');

class SVGGenerator {
    static getBackgroundStyle(style, hue, complexity) {
        const styles = [
            WaveLines,
            StreetLines
        ];
        
        // Use style parameter to select background, or random if not specified
        const backgroundStyle = styles[style % styles.length];
        return backgroundStyle.generate(hue, complexity);
    }

    // ... rest of the SVGGenerator class remains the same ...

    static generateFullSVG(text, style, hue, complexity) {
        // ... previous code ...

        // Generate background with metadata using new selection method
        const background = this.getBackgroundStyle(style, hue, complexity);
        const textColors = this.generateTextGradient(style);

        // ... rest of the generation code ...

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
                        "trait_type": "Background Complexity",
                        "value": background.attributes.complexity
                    },
                    {
                        "trait_type": "Background Density",
                        "value": background.attributes.density
                    },
                    {
                        "trait_type": "Background Technique",
                        "value": background.attributes.technique || "Standard"
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