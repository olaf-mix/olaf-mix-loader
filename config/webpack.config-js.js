const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        js: path.resolve(__dirname, '..', 'example', 'js', 'index.js'),
    },
    output: {
        library: 'main',
        libraryTarget: 'umd',
        filename: './[name]/index.output.js',
        path: path.resolve(__dirname, '..', 'example'),
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // presets: [[
                        //     '@babel/preset-env',
                        //     {
                        //         targets: "defaults",
                        //         useBuiltIns: "usage",
                        //         corejs: {
                        //             version: 3,
                        //             proposals: true
                        //         }
                        //     }
                        // ]]
                    }
                }],
            },
        ]
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                minify: (file, sourceMap) => {
                    const extractedComments = [];
                    const { error, map, code, warnings } = require('uglify-js')
                        .minify(file, {
                        });
                    return { error, map, code, warnings, extractedComments };
                },
            }),
        ],
    },
    plugins: [
        // new OlafMixPlugin()
    ]
};