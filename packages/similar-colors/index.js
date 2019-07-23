const fs = require('fs');
const {sync: glob} = require('glob');
const {flatMap} = require('lodash');
const {argv} = require('yargs');
const findColors = require('./lib/find-colors');
const findSimilarColor = require('./lib/find-similar');
const findSameColor = require('./lib/find-same');
const Output = require('./lib/Output');

const {
    _: paths, // 检查的目录
    write = false, // 是否直接修改文件
    same = false, // 仅操作相等的 color
    ext = 'less,css,js,jsx', // 文件类型
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
            let hit = null;
            if (same) {
                hit = findSameColor(color);
            } else {
                hit = findSimilarColor(color);
            }

            if (hit) {
                output.add(file, line, {...hit, source: color});
                // return line.replace(new RegExp(regex, 'ig'), hit.to.name);
            }
        }
    };

    lines.forEach(replaceInLine);
};

const main = () => {
    const fileExtension = ext.includes(',') ? `{${ext}}` : ext;
    const files = flatMap(paths, dir => glob(`${dir}/**/*.${fileExtension}`, {nodir: true}));
    const output = new Output();

    for (const file of files) {
        analyzeColorsInFile(file, output);
    }

    console.log(output.format());
    if (write) {
        output.write();
    }
};

main();
