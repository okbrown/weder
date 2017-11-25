const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {

	entry: [
		'babel-polyfill',
		'./src/index.js'
	],

	output: {
		filename: 'index.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/'
	},

	module: {
		rules: [
			{
				test: /\.(js)?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [ "env","stage-0" ],
						plugins: [
							[
								"module-resolver", {
								"root": ["./src"],
								"alias": {
									"dao": "/dao",
									"services": "/controllers/services",
									"controllers": "/controllers",
									"config": "/config",
									"bbc-helpers": "/controllers/v1/weather/dao/bbc/helpers"
								}
							}
							]
						]
					}
				}
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: 'src/swagger.json' },
			{ from: 'package.json' },
			{ from: 'yarn.lock' },
			{ from: 'Dockerfile' },
			{ from: 'run.sh' }
		],
			{
				copyUnmodified: true
			})
	],

	target: 'node',
	node:{
		__dirname: false,
	},
	externals: [nodeExternals()]
};