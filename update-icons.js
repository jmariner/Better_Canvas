const download = require("download");
const fs = require("fs");

const filePath = "src/css/";
const fileName = "_canvas_icons.scss";
fs.rename(filePath+fileName, filePath+fileName+".old", ()=>{});

const blob = process.argv[2] || "gh-pages";
download(
	`https://raw.githubusercontent.com/instructure/instructure-icons/${blob}/fonts/Solid/InstructureIcons-Solid_icon-map.scss`,
	filePath,
	{filename: fileName}
);