const {flatMap, partial} = require('lodash');
const Color = require('color');

const colorSteps = [
    ['purple', new Color('hsl(250, 25%, 35%)'), 20, 25, 30, 35, 40, 50, 60, 70, 80, 90],
    ['dark-purple', new Color('hsl(230, 35%, 55%)'), 20, 25, 30, 35, 40, 50, 60, 70, 80, 90],
    ['light-purple', new Color('hsl(230, 75%, 65%)'), 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95],
    ['slate-gray', new Color('hsl(230, 10%, 35%)'), 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95],
    ['blue', new Color('hsl(210, 80%, 55%)'), 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95],
    ['green', new Color('hsl(85, 55%, 45%)'), 20, 25, 30, 35, 40, 45, 50, 45, 60, 70, 80, 90, 95],
    ['orange', new Color('hsl(35, 85%, 55%)'), 20, 25, 30, 35, 40, 50, 55, 60, 70, 80, 90, 95],
    ['red', new Color('hsl(355, 100%, 65%)'), 20, 25, 30, 35, 40, 50, 55, 60, 65, 70, 80, 90, 95],
    ['gray', new Color('hsl(0, 0%, 40%)'), 20, 30, 40, 60, 80, 82, 84, 88, 92, 95, 97],
];

const toColorDefinition = (name, base, lightness) => {
    const [h, s] = base.hsl().array();
    const newColor = new Color({h, s, l: lightness});
    return {
        name: `@ee-${name}-${lightness}`,
        color: newColor,
    };
};

module.exports = () => flatMap(
    colorSteps,
    ([name, base, ...steps]) => steps.map(partial(toColorDefinition, name, base))
);
