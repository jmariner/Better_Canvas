const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

function _path(pathString) {
	return path.join(__dirname, pathString);
}

const commonConfig = {
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
		new CleanWebpackPlugin(["dist/js/*", "dist/css/*"], { verbose: false }),
		new ExtractTextPlugin("css/[name].css")
	],
	stats: {
		modules: false,
		hash: false
	}
};

module.exports = function(setupMergeConfig) {
	return merge(commonConfig, setupMergeConfig(
		_path, { ExtractTextPlugin }
	));
};