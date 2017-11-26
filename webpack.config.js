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
		loaders: [{
			exclude: /node_modules/,
			test: /\.tsx?$/,
			loader: "ts-loader"
		}]
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
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