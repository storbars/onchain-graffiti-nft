const WaveLines = require('./backgroundStyles/wave-lines');
const StreetLines = require('./backgroundStyles/street-lines');

class SVGGenerator {
    static getBackgroundStyle(style, hue, complexity) {
        console.log('Style parameter:', style); // Debug log
        
        if (style % 2 === 0) {
            console.log('Generating Wave Lines');
            return WaveLines.generate(hue, complexity);
        } else {
            console.log('Generating Street Lines');
            try {
                return StreetLines.generate(hue, complexity);
            } catch (error) {
                console.error('Error generating Street Lines:', error);
                // Fallback to Wave Lines if Street Lines fails
                return WaveLines.generate(hue, complexity);
            }
        }
    }

    // Rest of the SVGGenerator class remains the same
}

module.exports = SVGGenerator;