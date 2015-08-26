'use strict';
var path = require('path');

var extend = require('xtend');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var pkg = require('./package.json');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);
var DEMO_DIR = 'demos';
var config = {
    paths: {
        dist: path.join(ROOT_PATH, 'dist'),
        src: path.join(ROOT_PATH, 'src'),
        demo: path.join(ROOT_PATH, DEMO_DIR),
        demoIndex: path.join(ROOT_PATH, DEMO_DIR, '/index'),
    },
    filename: 'boilerplate',
    library: 'Boilerplate',
    demoDirectory: DEMO_DIR,
};

var common = {
    exports: {
        entry: [
            './demos/index'
        ],
        resolve: {
            extensions: ['', '.js', '.jsx', '.md', '.css', '.png', '.jpg'],
        },
    },
};

var commonLoaders = [
    {
        test: /\.css$/,
        loaders: ['style', 'css'],
    },
    {
        test: /\.md$/,
        loader: 'html!../loaders/markdown',
    },
    {
        test: /\.png$/,
        loader: 'url-loader?limit=100000&mimetype=image/png',
        include: config.paths.demo,
    },
    {
        test: /\.jpg$/,
        loader: 'file-loader',
        include: config.paths.demo,
    },
];

if (TARGET === 'dev') {
    module.exports = extend(common, {
        devtool: 'eval',
        entry: [
            'webpack-dev-server/client?http://0.0.0.0:3000',
            'webpack/hot/only-dev-server',
            './demos/index',
        ],
        output: {
            path: __dirname,
            filename: 'bundle.js',
            publicPath: '/demos/'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development'),
                }
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
        ],
        module: {
            loaders: commonLoaders.concat([{
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel-loader'],
                include: [config.paths.demo, config.paths.src],
            }])
        }
    });
}

if (TARGET === 'gh-pages') {
    module.exports = extend(common, {
        entry: {
            app: './demos/index',
            vendors: ['react/addons', 'lodash'],
        },
        output: {
            path: './gh-pages',
            filename: 'bundle.[chunkhash].js',
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify('production'),
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
            }),
            new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[chunkhash].js'),
            new HtmlWebpackPlugin({
                title: pkg.name + ' - ' + pkg.description
            }),
        ],
        module: {
            loaders: commonLoaders.concat([{
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: [config.paths.demo, config.paths.src],
            }])
        }
    });
}

var commonDist = extend(common, {
    devtool: 'source-map',
    entry: './src/index',
    externals: {
        'lodash': {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: '_',
            root: '_'
        },
        'react/addons': {
            commonjs: 'react/addons',
            commonjs2: 'react/addons',
            amd: 'React',
            root: 'React'
        }
    },
    module: {
        loaders: commonLoaders.concat([{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            include: config.paths.src,
        }])
    }
});

if (TARGET === 'dist') {
    module.exports = extend(commonDist, {
        output: {
            path: './dist',
            filename: 'reactabular.js',
            libraryTarget: 'umd',
            library: 'Reactabular',
            sourceMapFilename: '[file].map'
        },
    });
}

if (TARGET === 'dist-min') {
    module.exports = extend(commonDist, {
        output: {
            path: './dist',
            filename: 'reactabular.min.js',
            libraryTarget: 'umd',
            library: 'Reactabular',
            sourceMapFilename: '[file].map'
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
            }),
        ],
    });
}
