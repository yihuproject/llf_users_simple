module.exports = {
    indexPath: "index.html",
    filenameHashing: true,
    pages: undefined,
    lintOnSave: true,
    runtimeCompiler: false,
    transpileDependencies: [],
    productionSourceMap: false,
    crossorigin: undefined,
    integrity: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.apiopen.top',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}