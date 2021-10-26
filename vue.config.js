module.exports = {
    configureWebpack: {
        devServer: {
            historyApiFallback: true
        }
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "@/assets/css/base.scss";
                `,
            },
        },
    },
};