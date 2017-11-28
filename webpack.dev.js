module.exports = require("./webpack.common.js")((_path, plugins) => ({
	devtool: "inline-source-map",
	module: {
		rules: [{
			test: /\.scss/,
			use: plugins.ExtractTextPlugin.extract({
				use: {
					loader: "scss-custom-loader",
					options: {
						destDir: _path("dist/css")
					}
				}
			})
		}]
	}
}));