const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');

function _path(pathString) {
	return path.join(__dirname, pathString);
}

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		popup: _path("src/js/popup.ts"),
		options: _path("src/js/options.ts"),
		content_script: _path("src/js/main.ts")
	},
	output: {
		path: _path("dist/js"),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [ "ts-loader" ],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	plugins: [
		new CleanWebpackPlugin(
			["dist/js"],
			{
				exclude: ["background.js"]
			}
		)
	]
}