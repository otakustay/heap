const {hex, rgb, rgba, hsl, hsla} = require('colors-regex');
const {clone, uniq} = require('lodash');

module.exports = content => {
    const matchFor = (content, regex) => content.match(clone(regex)) || [];

    const colors = [
        ...matchFor(content, hex.global),
        ...matchFor(content, rgb.global),
        ...matchFor(content, rgba.global),
        ...matchFor(content, hsl.global),
        ...matchFor(content, hsla.global),
    ];

    return uniq(colors);
};
