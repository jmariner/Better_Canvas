const download = require("download");
const { resolve } = require("path");
const fs = require("fs");

const filename = "_canvas_icons.scss";
const destination = resolve(__dirname, "../src/scss/", filename);

const version = process.argv[2] || "latest";
const package = "@instructure/ui-icons";
const filePath = "lib/font/Solid/InstructureIcons-Solid_icon-map.scss";
const url = `https://unpkg.com/${package}@${version}/${filePath}`;

// download the SCSS map file given the above URL.
// store the resulting version in a comment in the saved SCSS file.
download(url, {stream: true}).on("response", resp => {

	const [, respVersion] = resp.url.match(new RegExp(package + "@([\\d.]+)"));
	const preface = `/* VERSION: ${respVersion}${version === "latest" ? " (latest)" : ""} */\n`
	let scss = "";

	resp.on("data", data => { scss += data.toString(); });
	resp.on("end", () => { fs.writeFileSync(destination, preface + scss); });

});
