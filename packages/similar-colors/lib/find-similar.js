const distance = require('euclidean-distance');
const {isEqual, minBy} = require('lodash');
const Color = require('color');
const createPalette = require('./palette');

const palette = createPalette();

// 单纯的用三维空间的距离找颜色会存在问题，就一个颜色来说，色调对人的感知要大于亮度和饱合度。
// 因此这个算法使用HSL模型，并且在距离一定误差（1.1倍）范围内，以H轴距离最短为优先。
const mostSimilarColor = origin => {
    const minDistance = palette.reduce(
        (min, {color}) => {
            const current = distance(origin, color.hsl().array());
            return Math.min(current, min);
        },
        Infinity
    );
    const allowedColors = palette.filter(({color}) => distance(origin, color.hsl().array()) <= minDistance * 1.1);
    return minBy(allowedColors, ({color}) => Math.abs(color.hsl().object().h - origin[0]));
};

module.exports = input => {
    const color = new Color(input);
    const hsl = color.hsl().array().slice(0, 3);

    // 纯白和纯黑不管
    if (isEqual(hsl, [0, 0, 0]) || isEqual(hsl, [0, 0, 100])) {
        return null;
    }

    const replacement = mostSimilarColor(hsl);
    return {
        source: input,
        from: {color},
        to: replacement,
        alpha: color.alpha(),
        same: color.hex() === replacement.color.hex(),
    };
};
