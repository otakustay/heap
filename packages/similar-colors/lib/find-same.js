const {find} = require('lodash');
const Color = require('color');
const createPalette = require('./palette');

const palette = createPalette();

const sameColor = origin => find(palette, ({color}) => origin.hex() === color.hex());

module.exports = input => {
    const color = new Color(input);

    const replacement = sameColor(color);

    if (!replacement) {
        return null;
    }

    return {
        source: input,
        from: {color},
        to: replacement,
        alpha: color.alpha(),
        same: color.hex() === replacement.color.hex(),
    };
};
