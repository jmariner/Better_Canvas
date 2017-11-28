const path = require("path");
const fs = require("fs");
const { fork } = require("child_process");
const sass = require("node-sass");

const baseDir = path.resolve(__dirname, "..");
const tsc = path.resolve(baseDir, "node_modules/typescript/lib/tsc.js");

function exportWrap(exp) {
	return "module.exports = `" + exp + "`;";
}

module.exports = function (contents) {

	const callback = this.async();

	const sourceFolder = this.context;
//	const targetFolder = this.query.destDir;
//	const filename = path.basename(this.resourcePath, ".scss");
//	const outFile = path.resolve(targetFolder, filename + ".css");

	sass.render({
		data: contents,
		includePaths: [sourceFolder],
	//	outFile,
		outputStyle: "compressed",
	//	sourceMap: true,
		importer: function(url, prev, done){ typeScriptImporter(url, prev).then(done); }
	}, (error, result) => {
		if (error) {
			callback(error.formatted);
		}
		else {
			callback(null, exportWrap(result.css), result.map);
		}
	});

	return;

}

async function loadTypeScriptFile(file) {

	const outDir = path.resolve(__dirname);

	const tscProcess = fork(tsc, [
		"--lib", "es2016,dom",
		"--module", "commonjs",
		"--target", "es2015",
		"--outDir", outDir,
		file
	]);

	const exitCode = await new Promise(done => tscProcess.on("exit", done));

	const baseName = path.basename(file, ".ts");
	const resultFile = path.resolve(outDir, baseName + ".js");

	if (exitCode !== 0)
		throw `Nonzero exit code ${exitCode} when compiling typescript`;

	const data = require(resultFile)["default"];

	if (fs.existsSync(resultFile)) {
		const deleteError = await new Promise(done => fs.unlink(resultFile, done));
		if (deleteError !== null)
			console.warn(`Error when trying to delete temp file: ${deleteError}`);
	}

	return data;

}

async function typeScriptImporter(url, prev) {

	if (path.extname(url) !== ".ts") return null;

	const regMatch = url.match(/^([/\\])/);
	const prefixDir = regMatch ? baseDir : prev.slice(0, prev.lastIndexOf(regMatch[1]));
	const file = path.resolve(prefixDir, regMatch ? url.slice(1) : url);
	const name = path.basename(file, ".ts");

	const parseValue = value => {
		if (Array.isArray(value)) {
			return `(${value.map(v => parseValue(v)).join(",")})`;
		}
		else if (typeof value === "object") {
			return `(${Object.keys(value)
				.map(key => `${key}: ${parseValue(value[key])}`)
				.join(",")})`;
		}
		else {
			return value;
		}
	};

	try {
		let contents = await loadTypeScriptFile(file);
		contents = `$${name}: ${parseValue(contents)}`;

		return {contents};
	}
	catch (e) {
		return new Error(`SASS Importer: Problem when parsing typescript -> json -> sass.\nFile: ${file}\nError: ${e}`);
	}

}