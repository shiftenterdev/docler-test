module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Docler App',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
}
