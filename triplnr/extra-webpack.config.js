const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                AUTH_DOMAIN: `${process.env.AUTH_DOMAIN}`,
                AUTH_CLIENT_ID: `${process.env.AUTH_CLIENT_ID}`
            }
        })
    ]
}