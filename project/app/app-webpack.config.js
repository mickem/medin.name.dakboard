const path = require('path');

module.exports = {
    devtool: false,
    entry: {
        app: './src/app.ts',
        "drivers/generic-block/driver": './src/drivers/generic-block/driver.ts',
        "drivers/generic-block/device": './src/drivers/generic-block/device.ts',
        "drivers/text-block/driver": './src/drivers/text-block/driver.ts',
        "drivers/text-block/device": './src/drivers/text-block/device.ts',
    },
    externals: [
        {
            'athom-api': "athom-api",
            homey: "homey",
            'axios': 'axios',
            'qs': 'qs'
        },
    ],
    target: 'node',
    plugins: [
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../..'),
        library: 'library',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {
        minimize: false
    }
};