const path = require("path");
const fs = require("fs");
const _eval = require("eval");
const sass = require("node-sass");
const ts = require("typescript");

const baseDir = path.resolve(__dirname, "..");

const tsFileCache = new Map(); // file => file data

function exportWrap(exp) {
	return "module.exports = `" + exp + "`;";
}

module.exports = function (contents) {

	const callback = this.async();
	const { compress } = this.query;

	const sourceFolder = this.context;
//	const targetFolder = this.query.destDir;
//	const filename = path.basename(this.resourcePath, ".scss");
//	const outFile = path.resolve(targetFolder, filename + ".css");

	// TODO fix source maps here

	sass.render({
		data: contents,
		includePaths: [sourceFolder],
	//	outFile,
		outputStyle: compress ? "compressed" : "nested",
	//	sourceMap: true,
		importer: function(url, prev, done){ typeScriptImporter(url, prev).then(done); }
	}, (error, result) => {
		if (error) {
			console.error(error.formatted);
			callback(new Error("An error occurred rendering the SCSS."));
		}
		else {
			callback(null, exportWrap(result.css), result.map);
		}
	});

	return;

}

async function typeScriptImporter(url, prev) {

	if (path.extname(url) !== ".ts") return null;

	const regMatch = url.match(/^([/\\])/);
	const prefixDir = regMatch ? baseDir : prev.slice(0, prev.lastIndexOf(regMatch[1]));
	const file = path.resolve(prefixDir, regMatch ? url.slice(1) : url);
	const name = path.basename(file, ".ts");

	// curly braces are not allowed in values. they are okay to use in the typescript vars, so
	// make sure they get removed here.
	const disallowedValueRegex = /[{}]/;

	const parseValue = value => {
		if (Array.isArray(value)) {

			return "(" +
				value
					.map(item => parseValue(item))
					.filter(item => item !== null)
					.join(",")
				+ ")";
		}
		else if (typeof value === "object") {

			return "(" +
				Object.entries(value)
					.map(([key, val]) => [key, parseValue(val)])
					.filter(([, val]) => val !== null)
					.map(pair => pair.join(": "))
					.join(",")
				+ ")";
		}
		else { // value is string
			// return 'null' if this value is not allowed.
			if (disallowedValueRegex.test(value))
				return null;
			else
				return value;
		}
	};

	try {
		let contents = await loadTypeScriptFile(file);
		contents = `$${name}: ${parseValue(contents)}`;

		return {contents};
	}
	catch (e) {
		return new Error(`SASS Importer: Problem when parsing typescript sass vars.\nFile: ${file}\nError: ${e}`);
	}

}

async function loadTypeScriptFile(file) {

	if (tsFileCache.has(file))
		return tsFileCache.get(file);

	const tsSource = fs.readFileSync(file, { encoding: "utf8" });

	// this is sorta unstable. keep track of changes:
	// https://github.com/Microsoft/TypeScript/wiki/API-Breaking-Changes
	const result = ts.transpileModule(tsSource, {
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			lib: ["es2016", "dom"],
			target: ts.ScriptTarget.ES2015
		}
	});

	const exportedContent = _eval(result.outputText)["default"];

	tsFileCache.set(file, exportedContent);

	return exportedContent;

}