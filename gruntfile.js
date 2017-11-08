module.exports = function(grunt) {

	grunt.initConfig({
		run: {
			options: {
			},
			ts: {
				exec: "/run/node node_modules/typescript/lib/tsc.js"
			},
			scss: {
				exec: "/run/node node_modules/ts-node/dist/bin.js scss-compile.ts"
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
				tasks: ["run:ts", "concat", "run:scss"],
				options: {
					atBegin: true
				}
			},
			ts: {
				files: ["src/js/*.ts", "!src/js/vars.ts"],
				tasks: ["run:ts", "concat"]
			},
			scss: {
				files: "src/css/*.scss",
				tasks: ["run:scss"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-run");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-watch");
};