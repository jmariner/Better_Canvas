const download = require("download");
const fs = require("fs");
const { resolve } = require("path");

const baseDir = resolve(__dirname, "..")
const filePath = resolve(baseDir, "src/scss/");
const fileName = "_canvas_icons.scss";

const blob = process.argv[2] || "gh-pages";
download(
	`https://raw.githubusercontent.com/instructure/instructure-icons/${blob}/fonts/Solid/InstructureIcons-Solid_icon-map.scss`,
	filePath,
	{filename: fileName}
);