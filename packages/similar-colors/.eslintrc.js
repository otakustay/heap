module.exports = {
    extends: require.resolve('reskript/config/eslint'),
    rules: {
        'import/unambiguous': 'off',
        'import/no-commonjs': 'off',
        'no-console': 'off',
    },
};
