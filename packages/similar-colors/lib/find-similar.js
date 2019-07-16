const distance = require('euclidean-distance');
const {isEqual, minBy} = require('lodash');
const Color = require('color');
const createPalette = require('./palette');

const palette = createPalette();

const mostSimilarColor = origin => minBy(palette, ({color}) => distance(origin, color.rgb().array()));

module.exports = input => {
    const color = new Color(input);
    const rgb = color.rgb().array().slice(0, 3);

    if (isEqual(rgb, [0, 0, 0]) || isEqual(rgb, [255, 255, 255])) {
        return null;
    }

    const replacement = mostSimilarColor(rgb);
    return {
        source: input,
        from: {color},
        to: replacement,
        alpha: color.alpha(),
        same: color.hex() === replacement.color.hex(),
    };
};
