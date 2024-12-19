const WaveLines = require('./backgroundStyles/wave-lines');
const StreetLines = require('./backgroundStyles/street-lines');
const FlowArt = require('./backgroundStyles/flow-art');

class SVGGenerator {
    static getBackgroundStyle(style, hue, complexity) {
        // Style mapping: 0 = Wave Lines, 1 = Street Lines, 2 = Flow Art
        const styles = [
            WaveLines,
            StreetLines,
            FlowArt
        ];
        
        const selectedStyle = styles[style % styles.length];
        console.log('Generating style:', style % styles.length);
        return selectedStyle.generate(hue, complexity);
    }

    // Rest of the SVGGenerator class remains the same...
}

module.exports = SVGGenerator;