const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function _path(pathString) {
	return path.join(__dirname, pathString);
}

module.exports.common = {
	entry: {
		"popup": _path("src/ts/popup.ts"),
		"options": _path("src/ts/options.ts"),
		"content_script": _path("src/ts/main.ts"),
		"background": _path("src/js/background.js")
	},
	output: {
		path: _path("dist/"),
		filename: "js/[name].js"
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
	resolveLoader: {
		modules: [_path("scripts/"), "node_modules"]
	},
	plugins: [
		new CleanWebpackPlugin(["dist/js/*", "dist/css/*"]),
		new ExtractTextPlugin("css/[name].css")
	]
};

module.exports._path = _path;