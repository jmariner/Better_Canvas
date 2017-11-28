const merge = require("webpack-merge");
const { common, _path } = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
	module: {
		rules: [{
			test: /\.scss/,
			use: ExtractTextPlugin.extract({
				use: {
					loader: "scss-custom-loader",
					options: {
						destDir: _path("dist/css"),
						compress: true
					}
				}
			})
		}]
	}
});