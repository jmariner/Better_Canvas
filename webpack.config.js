const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function _path(pathString) {
	return path.join(__dirname, pathString);
}

const PROD = process.env.NODE_ENV === "production";

module.exports = {
	devtool: PROD ? 'inline-source-map' : false,
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
			},
			{
				test: /\.scss/,
				use: ExtractTextPlugin.extract({
					use: {
						loader: "scss-custom-loader",
						options: {
							destDir: _path("dist/css")
						}
					}
				})
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
		new CleanWebpackPlugin(
			["dist/js/*", "dist/css/*"]
		),
		new ExtractTextPlugin("css/[name].min.css")
	]
}