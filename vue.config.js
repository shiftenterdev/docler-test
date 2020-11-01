module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Dockler Test App',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
}
