const distance = require('euclidean-distance');
const {isEqual, find} = require('lodash');
const Color = require('color');
const createPalette = require('./palette');

const palette = createPalette();

const sameColor = origin => find(palette, ({color}) => distance(origin, color.rgb().array()) === 0);

module.exports = input => {
    const color = new Color(input);
    const rgb = color.rgb().array().slice(0, 3);

    if (isEqual(rgb, [0, 0, 0]) || isEqual(rgb, [255, 255, 255])) {
        return null;
    }

    const replacement = sameColor(rgb);

    if (!replacement) {
        return null;
    }

    return {
        source: input,
        from: {color},
        to: replacement,
        alpha: color.alpha(),
        same: true,
    };
};
