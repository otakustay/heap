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
    return output.join('\n');
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
};
