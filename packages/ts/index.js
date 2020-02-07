const childProcess = require('child_process');
const fs = require('fs');
const {sync: glob} = require('glob');
const {flatMap} = require('lodash');
const {argv} = require('yargs');

const {
    _: paths, // 检查的目录
} = argv;


const main = () => {
    const files = flatMap(paths, dir => glob(`${dir}/**/*.{js,jsx}`, {nodir: true}));

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        let targetExtension = 'ts';
        if (content.includes('/>') || content.includes('</')) {
            targetExtension = 'tsx';
        }
        const targetFileFragment = file.split('.');
        targetFileFragment.pop();
        targetFileFragment.push(targetExtension);
        const targetFile = targetFileFragment.join('.');
        childProcess.execSync(`git mv ${file} ${targetFile}`);
        fs.writeFileSync(targetFile, `// @ts-nocheck\n${content}`, 'utf-8');
    }
    childProcess.execSync('git commit');
};

main();
