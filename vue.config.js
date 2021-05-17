const path = require( "path" );

const VuetifyLoaderPlugin = require( 'vuetify-loader/lib/plugin' );

module.exports = {
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ],
        resolve: {
            alias: {
                "@": path.join( __dirname, 'src/' ),
            }
        },
    },
    css: { extract: false }
}