module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    extends: '',
    plugins: ['html'],
    rules: {
        'space-before-function-paren': [
            2,
            {
                anonymous: 'ignore',
                named: 'ignore'
            }
        ]
    },
    globals: {}
}