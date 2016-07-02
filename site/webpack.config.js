var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, './app');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
		path: __dirname,
        filename: '/public/reactcomponents.js'
    },
	module : {
		loaders : [
			{
				test : /\.jsx/,
				include : APP_DIR,
				loader : 'babel'
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
				compress: { 
					dead_code: true,
					unused: true,
					warnings: false
				}
			}),
		//new webpack.optimize.DedupePlugin()
	]
}

module.exports = config;