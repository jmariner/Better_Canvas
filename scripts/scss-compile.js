const path = require("path");
const fs = require("fs");
const { fork } = require("child_process");
const sass = require("node-sass");

const baseDir = path.resolve(__dirname, "..");
const inputDir = path.resolve(baseDir, "src/scss/");
const outDir = path.resolve(baseDir, "dist/css/");
const tsc = path.resolve(baseDir, "node_modules/typescript/lib/tsc.js");

// currently doesn't help as both imports start running at the same time
// TODO this is left as a reminder for future improvement
const tsImportCache = new Map(); // file path => data

(async function() {

	if (!fs.existsSync(outDir)) {
		const err = await new Promise(done => fs.mkdir(outDir, done));
		if (err) throw err;
	}

	const files = await new Promise((resolve, reject) => {
		fs.readdir(inputDir, (e, files) => {
			if (e) reject(e);
			else resolve(files);
		});
	});

	for (const file of files) {
		const fileMatch = file.match(/^([^_][^/\\]+)\.scss$/);
		if (fileMatch)
			render(fileMatch[1]);
	}

})().catch(err => {
	console.error(err);
});

function render(fileName) {

	const outFile = path.resolve(outDir, fileName + ".min.css");

	sass.render({
		file: path.resolve(inputDir, fileName + ".scss"),
		outFile,
		outputStyle: "compressed",
		sourceMap: true,
		importer: function(url, prev, done) {
			typeScriptImporter(url, prev).then(done);
		}
	}, (error, result) => {
		if (error) {
			console.error(error.formatted);
		}
		else {
			fs.writeFile(outFile, result.css, () => {});
			fs.writeFile(outFile + ".map", result.map, () => {});
		}
	});

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

	if (!fs.existsSync(file))
		return new Error(`SASS Importer: File ${file} does not exist`);

	if (tsImportCache.has(file))
		return tsImportCache.get(file);

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

		tsImportCache.set(file, { contents });

		if (process.argv[2] === "-v")
			console.log(contents.replace(/,([^,]+):/g, ",\n$1"));

		return {contents};
	}
	catch (e) {
		return new Error(`SASS Importer: Problem when parsing typescript -> json -> sass.\nFile: ${file}\nError: ${e}`);
	}

}