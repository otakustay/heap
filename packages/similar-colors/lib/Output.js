const fs = require('fs');
const chalk = require('chalk');

const formatAsText = files => {
    const output = Object.entries(files).reduce(
        (output, [filename, entries]) => {
            output.push(filename);
            for (const {line, source, same, to, alpha} of entries) {
                const toColor = alpha === 1
                    ? to.name
                    : `fade(${to.name}, ${Math.round(alpha * 100)}%)`;
                const text = [
                    ' '.repeat(4),
                    `#${line}: `,
                    same ? chalk.gray(source) : chalk.red(source),
                    '  =>  ',
                    same ? chalk.bold(toColor) : chalk.green(toColor),
                ];
                output.push(text.join(''));
            }
            return output;
        },
        []
    );
    output.push('');
    output.push(chalk.bgRed(`affecting ${Object.entries(files).length} files`));
    output.push('');
    return output.join('\n');
};

const runTask = files => {
    Object.entries(files).forEach(([filename, entries]) => {
        const content = fs.readFileSync(filename, 'utf-8');
        let output = content;
        for (const {source, to} of entries) {
            output = output.replace(source, to.name);
        }
        fs.writeFileSync(filename, output, 'utf-8');
    });
};

module.exports = class Output {
    constructor() {
        this.files = {};
    }

    add(filename, line, info) {
        if (!this.files.hasOwnProperty(filename)) {
            this.files[filename] = [];
        }

        this.files[filename].push({line, ...info});
    }

    format() {
        return formatAsText(this.files);
    }

    write() {
        runTask(this.files);
    }
};
