const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        js: path.resolve(__dirname, '..', 'example', 'js', 'index.js'),
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
                    'babel-loader'
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
                        loader: path.resolve(__dirname, '..', 'src'),
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
    ]
};