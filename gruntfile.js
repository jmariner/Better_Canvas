module.exports = function(grunt) {

	grunt.initConfig({
		execute: {
			options: {
			},
			ts: {
				src: ["node_modules/typescript/lib/tsc.js"]
			},
			scss: {
				options: {
					args: ["scss-compile.ts"]
				},
				src: ["node_modules/ts-node/dist/bin.js"]
			}
		},
		concat: {
			options: { // TODO sourcemaps are broken for files after the first one
				separator: ";",
				sourceMap: true
			},
			content_script: {
				src: ["src/js/objects.js", "src/js/vars.js", "src/js/main.js"],
				dest: "src/js/dist/content_script.js",
			},
			popupPage: {
				src: ["src/js/objects.js", "src/js/vars.js", "src/js/popup.js"],
				dest: "src/js/dist/popup.js"
			},
			optionsPage: {
				src: ["src/js/objects.js", "src/js/vars.js", "src/js/options.js"],
				dest: "src/js/dist/options.js"
			}
		},
		watch: {
			options: {
				spawn: false,
				event: ["changed"]
			},
			vars: {
				files: "src/js/vars.ts",
				tasks: ["execute:ts", "concat", "execute:scss"],
				options: {
					atBegin: true
				}
			},
			ts: {
				files: ["src/js/*.ts", "!src/js/vars.ts"],
				tasks: ["execute:ts", "concat"]
			},
			scss: {
				files: "src/css/*.scss",
				tasks: ["execute:scss"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-execute");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-watch");
};