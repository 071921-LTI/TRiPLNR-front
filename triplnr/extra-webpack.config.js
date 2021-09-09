const webpack = require('webpack');
require('dotenv').config();

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                AUTH_CLIENT_ID: JSON.stringify(process.env.AUTH_CLIENT_ID),
                MAPS_KEY: JSON.stringify(process.env.MAPS_KEY)
            }
        })
    ]
}