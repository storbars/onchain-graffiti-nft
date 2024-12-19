class FlowArt {
    static generateFlowField(width, height, scale, seed) {
        const field = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                const angle = Math.sin(x * scale + seed) * Math.cos(y * scale + seed) * Math.PI * 2;
                row.push(angle);
            }
            field.push(row);
        }
        return field;
    }
}

module.exports = FlowArt;