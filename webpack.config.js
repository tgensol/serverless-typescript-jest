const os = require('os');
const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	entry: slsw.lib.entries,
	target: 'node',
	mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devtool: 'source-map',
	plugins: [
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true
		}),
	],
	externals: [nodeExternals()],
	module: {
		rules: [{
			test: /\.ts$/,
			use: [{
				loader: 'cache-loader',
			}, {
				loader: 'thread-loader',
				options: {
					// There should be 1 cpu for the
					// fork-ts-checker-webpack-plugin
					workers: os.cpus().length - 1,
				},
			}, {
				loader: 'ts-loader',
				options: {
					// IMPORTANT! use happyPackMode mode to speed-up
					// compilation and reduce errors reported to webpack
					happyPackMode: true,
				},
			}],
		}],
	},
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, '.webpack'),
		filename: '[name].js',
		sourceMapFilename: '[file].map',
	},
};
