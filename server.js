/**
 * Created by Hoang Phan on 7/14/2016.
 */

'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config');
const express = require('express');

const devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
    compress: true,
    proxy: {
        '/dev/': 'http://localhost:2222'
    },
    quiet: false,
    noInfo: false,
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
});

let router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// routing for server
devServer.use(router);

devServer.listen(2222, 'localhost', (err, result) => {
    console.log('Listening at localhost:2222');
});
