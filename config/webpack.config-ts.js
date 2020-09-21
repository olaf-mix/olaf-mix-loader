const path = require('path');
const OlafMixLoader = require('../src');

module.exports = {
    mode: 'production',
    entry: {
        ts: path.resolve(__dirname, '..', 'example', 'ts', 'index.ts'),
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
                use: [
                    'babel-loader',
                    {
                        loader: OlafMixLoader,
                        options: {
                        }
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, 'tsconfig.json')
                        }
                    },
                    {
                        loader: OlafMixLoader,
                        options: {
                            parser: 'ts'
                        }
                    },
                ]
            },
        ]
    },
    optimization: {
        minimize: false,
    },
};