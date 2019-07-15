const fs = require('fs');
const {sync: glob} = require('glob');
const {flatMap, without} = require('lodash');
const {argv} = require('yargs');
const findColors = require('./lib/find-colors');
const findSimilarColor = require('./lib/find-similar');
const Output = require('./lib/Output');

const {
    _: paths, // 检查的目录
    // write = false, // 是否直接修改文件
    // output = 'text' // 输出格式，text、json、html
} = argv;

const analyzeColorsInFile = (file, output) => {
    if (file.endsWith('.var.less')) {
        return;
    }

    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    const replaceInLine = (text, i) => {
        const line = i + 1;
        const colors = findColors(text);
        for (const color of colors) {
            // const regex = escapeRegExp(color);
            const hit = findSimilarColor(color);

            if (hit) {
                output.add(file, line, {...hit, source: color});
                // return line.replace(new RegExp(regex, 'ig'), hit.to.name);
            }
        }
    };

    lines.forEach(replaceInLine);
};

const main = () => {
    const files = flatMap(paths, dir => glob(`${dir}/**/*.{less,css,js,jsx}`, {nodir: true}));
    const output = new Output();

    for (const file of files) {
        analyzeColorsInFile(file, output);
    }

    console.log(output.format());
};

main();
