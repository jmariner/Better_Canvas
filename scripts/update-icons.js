const download = require("download");
const { resolve } = require("path");

const destination = resolve(__dirname, "../src/scss/")

const blob = process.argv[2] || "gh-pages";
const url = "https://raw.githubusercontent.com/instructure/instructure-icons/" +
			blob + "/fonts/Solid/InstructureIcons-Solid_icon-map.scss"

download(url, destination, { filename: "_canvas_icons.scss" });