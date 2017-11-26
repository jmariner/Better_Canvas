const sass = require("node-sass");
const path = require("path");
const fs = require("fs");
const noop = ()=>{};

require("ts-node").register({
	disableWarnings: true,
	target: "es5"
});

const dir = __dirname + "/src/css/";
fs.readdir(dir, (e, files) => {
	if (e) return;
	files.map(f => {
		const fileMatch = f.match(/^([^_][^/\\]+)\.scss$/);
		return fileMatch ? fileMatch[1] : null;
	}).filter(f => f !== null).forEach(render);
});

function render(fileName: string) {

	const outFile = dir + fileName + ".min.css";
	sass.render({
		file: dir + fileName + ".scss",
		outFile,
		outputStyle: "compressed",
		sourceMap: true,
		importer: typeScriptImporter
	}, (error, result) => {
		if (error) {
			console.error(error.formatted);
		}
		else {
			fs.writeFile(outFile, result.css, noop);
			fs.writeFile(outFile + ".map", result.map, noop);
		}
	});

}

function typeScriptImporter(url, prev) {

	if (!/\.ts$/.test(url)) return null;

	const regMatch = url.match(/^([/\\])/);
	const prefixDir = regMatch ? __dirname : prev.slice(0, prev.lastIndexOf(regMatch[1]));
	const file = path.resolve(prefixDir + "/" + url);
	const name = path.basename(file, ".ts");

	if (!fs.existsSync(file))
		return new Error(`SASS Importer: File ${file} does not exist`);

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
		let contents = require(file); // .sassJson;
		contents = `$${name}: ${parseValue(JSON.parse(contents))}`;

		if (process.argv[2] === "-v")
			console.log(contents.replace(/,([^,]+):/g, ",\n$1"));

		return {contents};
	}
	catch (e) {
		return new Error(`SASS Importer: Problem when parsing typescript -> json -> sass.\nFile: ${file}\nError: ${e}`);
	}

}
